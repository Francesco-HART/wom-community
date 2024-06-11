import { Loyalty } from "@/lib/loyalty/models/loyalty.model";
import { useState } from "react";

export const useSearchCardsBar = () => {
  const [byName, setByName] = useState<string>("");

  const filterCardsByName = (
    cardName: string,
    cards: {
      id: string;
      companyName: string;
      createAt: string;
      companyLogo: string;
    }[]
  ) =>
    cards.filter((card) =>
      card.companyName.toLowerCase().includes(cardName.toLowerCase())
    );

  return {
    byName,
    setByName,
    filterCardsByName,
  };
};
