import { useEffect, useState } from "react";

import { getFavourites } from "../utils";
import { TFavorites } from "../types";

export function useFavorites() {
  const [favorites, setFavorites] = useState<{
    [key: string]: TFavorites;
  } | null>(null);

  const updateFavorites = () => {
    const favs = getFavourites();

    setFavorites(favs);
  };

  useEffect(() => {
    updateFavorites();
  }, []);

  return { favorites, updateFavorites };
}
