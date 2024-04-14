import { Plus } from "lucide-react";
import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Content = lazy(() =>
  import("./content").then(module => ({
    default: module.ContentAddProduct
  }))
);

export const AddProduct = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add Product
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <Suspense fallback={<Loader />}>
          <Content />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
