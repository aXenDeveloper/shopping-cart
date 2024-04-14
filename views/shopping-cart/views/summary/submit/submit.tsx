import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

export const SubmitSummaryShoppingCart = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" loading={pending}>
      Pay & Send
    </Button>
  );
};
