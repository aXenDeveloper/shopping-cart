import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
  PaymentEnum,
  useShoppingCardState
} from "../hooks/use-shopping-card-state";

const formSchema = z.object({
  payment: z.nativeEnum(PaymentEnum)
});

export const PaymentShoppingCardView = () => {
  const { dispatch, state } = useShoppingCardState();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payment: state.payment
    },
    mode: "onBlur"
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch({
      type: "ADD_PAYMENT",
      context: values
    });
  };

  return (
    <>
      <CardHeader>
        <h1 className="text-2xl font-bold">Payment</h1>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="max-w-96 space-y-4">
            <FormField
              control={form.control}
              name="payment"
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
                      {Object.values(PaymentEnum).map(payment => (
                        <SelectItem key={payment} value={payment}>
                          {payment}
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
