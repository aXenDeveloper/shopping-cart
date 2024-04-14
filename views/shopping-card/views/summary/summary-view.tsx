import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { ProductItemYourCard } from "../your-card/item/item";
import { cn } from "@/lib/utils";
import { SubmitSummaryShoppingCard } from "./submit/submit";
import { finishMutationApi } from "./submit/finish-mutation-api";

import { useShoppingCardState } from "../../hooks/use-shopping-card-state";

export const SummaryShoppingCardView = () => {
  const { dispatch, isShipmentAvailable, state, totalPrice } =
    useShoppingCardState();

  const onSubmit = async () => {
    const mutation = await finishMutationApi(state);

    if (mutation.error) {
      toast.error("Oops! Something went wrong", {
        description: "Internal server error."
      });

      return;
    }

    dispatch({
      type: "FINISH"
    });
  };

  return (
    <>
      <CardHeader>
        <h1 className="text-2xl font-bold">Summary</h1>

        <CardDescription>
          Total price:{" "}
          <span className="text-primary font-bold">
            {totalPrice > 0 ? `$${totalPrice}` : "Free"}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Products</h2>

          <ul className="flex flex-col gap-2">
            {state.products.map(item => (
              <ProductItemYourCard key={item.id} {...item} preview />
            ))}
          </ul>
        </div>

        <div className="sm:min-w-80 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Address</h2>

            <ul className="text-muted-foreground">
              <li>
                Street:{" "}
                <span className="font-bold text-primary">
                  {state.address.street}
                </span>
              </li>
              <li>
                City:{" "}
                <span className="font-bold text-primary">
                  {state.address.city}
                </span>
              </li>
              <li>
                Country:{" "}
                <span className="font-bold text-primary">
                  {state.address.country}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Shipment</h2>

            <span
              className={cn({
                "text-muted-foreground italic": !isShipmentAvailable,
                "text-primary": isShipmentAvailable
              })}
            >
              {isShipmentAvailable ? state.shipment : "No required"}
            </span>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Payment</h2>

            <span
              className={cn({
                "text-muted-foreground italic": !totalPrice,
                "text-primary": totalPrice
              })}
            >
              {totalPrice ? state.payment : "No required"}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <form
          action={onSubmit}
          className="flex flex-col gap-2 sm:flex-row items-stretch"
        >
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
          <SubmitSummaryShoppingCard />
        </form>
      </CardFooter>
    </>
  );
};
