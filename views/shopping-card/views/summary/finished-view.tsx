import { ClipboardCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { useShoppingCardState } from "../../hooks/use-shopping-card-state";

export const FinishedShoppingCardView = () => {
  const { dispatch } = useShoppingCardState();

  return (
    <>
      <CardHeader className="flex items-center">
        <CardTitle>Thank you for your purchase!</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center flex-col gap-5">
        <ClipboardCheck className="size-20 text-primary" />

        <p>Your order has been successfully processed.</p>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button
          onClick={() =>
            dispatch({
              type: "RESET"
            })
          }
        >
          Buy more
        </Button>
      </CardFooter>
    </>
  );
};
