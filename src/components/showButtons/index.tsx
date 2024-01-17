import { useShow } from "@refinedev/core";
import { RefreshButton, RefreshButtonProps } from "@refinedev/mui";

import { useFavorites } from "../../hooks/useFavorites";
import { FavButton } from "../../components/favButton";

type TShowButtons = {
  refreshButtonProps?: RefreshButtonProps;
};

export const ShowButtons: React.FC<TShowButtons> = ({ refreshButtonProps }) => {
  const { queryResult } = useShow();
  const { updateFavorites } = useFavorites();

  const { data } = queryResult;

  const { id, type, name } = data?.data || {};

  return (
    <>
      <RefreshButton {...refreshButtonProps} onClick={updateFavorites} />

      <FavButton id={id} resource={type} name={name} />
    </>
  );
};
