import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  useDialog
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { useShoppingCardState } from "../../../hooks/use-shopping-card-state";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: "Name is required"
    })
    .max(20, {
      message: "Name is too long. Max 20 characters"
    }),
  price: z.coerce.number().min(0),
  shipment: z.boolean()
});

export const ContentAddProduct = () => {
  const { dispatch } = useShoppingCardState();
  const { setOpen } = useDialog();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      shipment: false
    },
    mode: "onBlur"
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch({
      type: "ADD_PRODUCT",
      context: values
    });

    setOpen?.(false);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add Product</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" min={0} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shipment"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Shipment?</FormLabel>
                  <FormDescription>
                    This option will add shipment to the product.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <DialogFooter>
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          loading={form.formState.isSubmitting}
          disabled={!form.formState.isValid}
        >
          Add Product
        </Button>
      </DialogFooter>
    </>
  );
};
