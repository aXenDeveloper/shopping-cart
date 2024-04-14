import { cn } from "@/lib/utils";
import { DeleteButtonProductItemYourCard } from "./delete-button";

import { Product } from "../../../hooks/use-shopping-card-state";

interface Props extends Product {
  preview?: boolean;
}

export const ProductItemYourCard = ({
  id,
  name,
  preview,
  price,
  shipment
}: Props) => {
  return (
    <li className="border px-5 py-3 rounded-md flex gap-2 items-center">
      <div className="flex-1">
        <span className="font-medium text-lg break-all">
          {name}{" "}
          <span className="font-normal text-sm text-muted-foreground">
            #{id}
          </span>
        </span>

        <div className="text-muted-foreground text-sm">
          <div className="space-x-1">
            <span>Price:</span>
            <span className="font-medium text-primary">
              {price ? `$${price}` : "Free"}
            </span>
          </div>

          {!preview && (
            <div className="space-x-1">
              <span>Shipment:</span>
              <span
                className={cn({
                  "text-primary": shipment
                })}
              >
                {shipment ? "Yes" : "No"}
              </span>
            </div>
          )}
        </div>
      </div>

      {!preview && <DeleteButtonProductItemYourCard id={id} />}
    </li>
  );
};
