import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  ShipmentEnum,
  availableShipments,
  useShoppingCartState
} from "../hooks/use-shopping-card-state";

const formSchema = z.object({
  shipment: z.nativeEnum(ShipmentEnum)
});

export const ShipmentShoppingCartView = () => {
  const { dispatch, state } = useShoppingCartState();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shipment: state.shipment
    },
    mode: "onBlur"
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch({
      type: "ADD_SHIPMENT",
      context: values
    });
  };

  return (
    <>
      <CardHeader>
        <h1 className="text-2xl font-bold">Shipment</h1>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="max-w-96 space-y-4">
            <FormField
              control={form.control}
              name="shipment"
              render={({ field }) => (
                <FormItem>
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
                      {availableShipments
                        .filter(
                          item =>
                            item.country.includes(state.address.country) ||
                            item.country === "*"
                        )
                        .map(shipment => (
                          <SelectItem key={shipment.type} value={shipment.type}>
                            {shipment.type}
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
