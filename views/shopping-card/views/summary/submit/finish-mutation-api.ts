"use server";

import { ContextType } from "@/views/shopping-card/hooks/use-shopping-card-state";

export const finishMutationApi = async (state: ContextType) => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error("API URL is not defined in your .env file");
    }

    const data = await fetch(process.env.NEXT_PUBLIC_API_URL, {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json"
      }
    });

    return { data: await data.json() };
  } catch (error) {
    return { error };
  }
};
