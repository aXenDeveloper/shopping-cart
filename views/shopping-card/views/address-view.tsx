import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  CountryEnum,
  useShoppingCardState
} from "../hooks/use-shopping-card-state";

const formSchema = z.object({
  street: z.string().trim().min(1, {
    message: "Street is required"
  }),
  city: z.string().trim().min(1, {
    message: "City is required"
  }),
  country: z.nativeEnum(CountryEnum)
});

export const AddressShoppingCardView = () => {
  const { dispatch, state } = useShoppingCardState();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      street: state.address.street,
      city: state.address.city,
      country: state.address.country
    },
    mode: "onBlur"
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch({
      type: "ADD_ADDRESS",
      context: values
    });
  };

  return (
    <>
      <CardHeader>
        <h1 className="text-2xl font-bold">Address</h1>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="max-w-96 space-y-4">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(CountryEnum).map(country => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex flex-col gap-2 sm:flex-row items-stretch">
            <Button
              variant="outline"
              onClick={() =>
                dispatch({
                  type: "PREV_STEP"
                })
              }
            >
              Prev Step
            </Button>
            <Button
              type="submit"
              loading={form.formState.isSubmitting}
              disabled={!form.formState.isValid}
            >
              Next Step
            </Button>
          </CardFooter>
        </form>
      </Form>
    </>
  );
};
