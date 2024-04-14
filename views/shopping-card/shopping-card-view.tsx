"use client";

import { useMachine } from "@xstate/react";

import { YourCardShoppingCardView } from "./views/your-card/your-card-view";
import {
  ShoppingCardStateContext,
  shoppingMachine
} from "./hooks/use-shopping-card-state";
import { AddressShoppingCardView } from "./views/address-view";
import { Card } from "@/components/ui/card";
import { ShipmentShoppingCardView } from "./views/shipment-view";
import { PaymentShoppingCardView } from "./views/payment-view";
import { SummaryShoppingCardView } from "./views/summary/summary-view";
import { FinishedShoppingCardView } from "./views/summary/finished-view";

export const ShoppingCardView = () => {
  const [state, dispatch] = useMachine(shoppingMachine);

  return (
    <ShoppingCardStateContext.Provider
      value={{
        state: state.context,
        dispatch,
        totalPrice: state.context.products.reduce(
          (acc, item) => acc + item.price,
          0
        ),
        isShipmentAvailable: state.context.products.some(item => item.shipment)
      }}
    >
      <Card>
        {state.value === "products" && <YourCardShoppingCardView />}
        {state.value === "address" && <AddressShoppingCardView />}
        {state.value === "shipment" && <ShipmentShoppingCardView />}
        {state.value === "payment" && <PaymentShoppingCardView />}
        {state.value === "summary" && <SummaryShoppingCardView />}
        {state.value === "finished" && <FinishedShoppingCardView />}
      </Card>
    </ShoppingCardStateContext.Provider>
  );
};
