"use client";

import { useMachine } from "@xstate/react";

import { YourCardShoppingCartView } from "./views/your-card/your-card-view";
import { AddressShoppingCartView } from "./views/address-view";
import { Card } from "@/components/ui/card";
import { ShipmentShoppingCartView } from "./views/shipment-view";
import { PaymentShoppingCartView } from "./views/payment-view";
import { SummaryShoppingCartView } from "./views/summary/summary-view";
import { FinishedShoppingCartView } from "./views/summary/finished-view";
import {
  ShoppingCartStateContext,
  shoppingMachine
} from "./hooks/use-shopping-card-state";

export const ShoppingCartView = () => {
  const [state, dispatch] = useMachine(shoppingMachine);

  return (
    <ShoppingCartStateContext.Provider
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
        {state.value === "products" && <YourCardShoppingCartView />}
        {state.value === "address" && <AddressShoppingCartView />}
        {state.value === "shipment" && <ShipmentShoppingCartView />}
        {state.value === "payment" && <PaymentShoppingCartView />}
        {state.value === "summary" && <SummaryShoppingCartView />}
        {state.value === "finished" && <FinishedShoppingCartView />}
      </Card>
    </ShoppingCartStateContext.Provider>
  );
};
