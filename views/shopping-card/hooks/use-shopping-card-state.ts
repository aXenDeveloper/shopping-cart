import { createContext, useContext } from "react";
import { createMachine, assign } from "xstate";

import { generateRandomString } from "@/lib/generate-random-string";

export interface Product {
  id: string;
  name: string;
  price: number;
  shipment: boolean;
}

export enum CountryEnum {
  POLAND = "Poland",
  USA = "USA"
}

export enum ShipmentEnum {
  COURIER = "Courier",
  INPOST = "Inpost"
}

export enum PaymentEnum {
  BANK_TRANSFER = "Bank Transfer",
  PAYPAL = "PayPal",
  BLIK = "Blik"
}

export const availableShipments: {
  country: CountryEnum[] | "*";
  type: ShipmentEnum;
}[] = [
  {
    type: ShipmentEnum.COURIER,
    country: "*"
  },
  {
    type: ShipmentEnum.INPOST,
    country: [CountryEnum.POLAND]
  }
];

interface Address {
  city: string;
  country: CountryEnum;
  street: string;
}

export interface ContextType {
  address: Address;
  payment: PaymentEnum;
  products: Product[];
  shipment: ShipmentEnum;
}

const context: ContextType = {
  products: [] as Product[],
  address: {
    street: "",
    city: "",
    country: CountryEnum.POLAND
  } as Address,
  shipment: ShipmentEnum.COURIER,
  payment: PaymentEnum.BANK_TRANSFER
};

type Events =
  | {
      context: Omit<Product, "id">;
      type: "ADD_PRODUCT";
    }
  | { context: { id: string }; type: "DELETE_PRODUCT" }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { context: typeof context.address; type: "ADD_ADDRESS" }
  | { context: { shipment: ShipmentEnum }; type: "ADD_SHIPMENT" }
  | { context: { payment: PaymentEnum }; type: "ADD_PAYMENT" }
  | { type: "FINISH" }
  | { type: "RESET" };

export const shoppingMachine = createMachine({
  id: "shopping",
  initial: "products",
  types: {} as {
    events: Events;
  },
  context,
  states: {
    products: {
      on: {
        ADD_PRODUCT: {
          actions: assign({
            products: ({ context, event }) => [
              ...context.products,
              {
                id: generateRandomString(10),
                ...event.context
              }
            ]
          })
        },
        DELETE_PRODUCT: {
          actions: assign({
            products: ({ context, event }) =>
              context.products.filter(
                product => product.id !== event.context.id
              )
          })
        },
        NEXT_STEP: {
          target: "address",
          guard: ({ context }) => context.products.length > 0
        }
      }
    },
    address: {
      on: {
        ADD_ADDRESS: [
          {
            target: "shipment",
            actions: assign({
              address: ({ event }) => event.context
            }),
            guard: ({ context }) => context.products.some(item => item.shipment)
          },
          {
            target: "payment",
            actions: assign({
              address: ({ event }) => event.context
            }),
            guard: ({ context }) =>
              context.products.reduce((acc, item) => acc + item.price, 0) > 0
          },
          {
            target: "summary",
            actions: assign({
              address: ({ event }) => event.context
            })
          }
        ],
        PREV_STEP: "products"
      }
    },
    shipment: {
      on: {
        ADD_SHIPMENT: {
          target: "payment",
          actions: assign({
            shipment: ({ event }) => event.context.shipment
          })
        },
        PREV_STEP: "address"
      }
    },
    payment: {
      on: {
        ADD_PAYMENT: {
          target: "summary",
          actions: assign({
            payment: ({ event }) => event.context.payment
          })
        },
        PREV_STEP: [
          {
            target: "shipment",
            guard: ({ context }) => context.products.some(item => item.shipment)
          },
          {
            target: "address",
            guard: ({ context }) =>
              !context.products.some(item => item.shipment)
          }
        ]
      }
    },
    summary: {
      on: {
        PREV_STEP: [
          {
            target: "payment",
            guard: ({ context }) =>
              context.products.reduce((acc, item) => acc + item.price, 0) > 0
          },
          {
            target: "shipment",
            guard: ({ context }) => context.products.some(item => item.shipment)
          },
          {
            target: "address"
          }
        ],
        FINISH: "finished"
      }
    },
    finished: {
      on: {
        RESET: {
          target: "products",
          actions: assign({
            products: [],
            shipment: ShipmentEnum.COURIER,
            payment: PaymentEnum.BANK_TRANSFER
          })
        }
      }
    }
  }
});

interface Args {
  dispatch: (event: Events) => void;
  isShipmentAvailable: boolean;
  state: typeof context;
  totalPrice: number;
}

export const ShoppingCardStateContext = createContext<Args>({
  state: context,
  dispatch: () => {},
  totalPrice: 0,
  isShipmentAvailable: false
});

export const useShoppingCardState = () => useContext(ShoppingCardStateContext);
