import IconButton from "@mui/material/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

import { useFavorites } from "../../hooks/useFavorites";
import { getFavourites, setFavourite, deleteFavourite } from "../../utils";
import { TFavorites } from "../../types";

type TFavButton = Partial<TFavorites> & {
  onCallback?: () => void;
};

export const FavButton: React.FC<TFavButton> = ({
  id,
  resource,
  name,
  onCallback,
}) => {
  const { updateFavorites } = useFavorites();
  const favorites = getFavourites();

  if (!(id && resource && name)) {
    return null;
  }

  const isFav = Boolean(favorites && favorites[`${resource}${id}`]);

  return (
    <IconButton
      onClick={() => {
        isFav
          ? deleteFavourite({ id, resource })
          : setFavourite({ id, name, resource });

        updateFavorites && updateFavorites();
        onCallback && onCallback();
      }}
    >
      {isFav ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
};
