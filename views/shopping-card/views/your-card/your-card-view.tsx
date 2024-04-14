import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { AddProduct } from "./add-product/add-product";
import { ProductItemYourCard } from "./item/item";
import { Button } from "@/components/ui/button";

import { useShoppingCardState } from "../../hooks/use-shopping-card-state";

export const YourCardShoppingCardView = () => {
  const {
    dispatch,
    state: { products },
    totalPrice
  } = useShoppingCardState();

  return (
    <>
      <CardHeader>
        <div className="flex gap-2 sm:items-center justify-between sm:flex-row flex-col items-stretch">
          <div>
            <h1 className="text-2xl font-bold">Your card</h1>
            {products.length > 0 && (
              <CardDescription>
                Total price:{" "}
                <span className="text-primary font-bold">
                  {totalPrice > 0 ? `$${totalPrice}` : "Free"}
                </span>
              </CardDescription>
            )}
          </div>

          <AddProduct />
        </div>
      </CardHeader>

      <CardContent>
        <ul className="flex flex-col gap-2">
          {products.length > 0 ? (
            products.map(item => (
              <ProductItemYourCard key={item.id} {...item} />
            ))
          ) : (
            <li className="text-muted-foreground italic">Your card is empty</li>
          )}
        </ul>
      </CardContent>

      {products.length > 0 && (
        <CardFooter>
          <Button
            onClick={() =>
              dispatch({
                type: "NEXT_STEP"
              })
            }
          >
            Next Step
          </Button>
        </CardFooter>
      )}
    </>
  );
};
