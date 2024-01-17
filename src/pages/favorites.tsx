import { useMemo } from "react";
import { List, ShowButton } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useFavorites } from "../hooks/useFavorites";
import { FavButton } from "../components/favButton";
import { Title } from "../components/title";

export const Favorites = () => {
  const { favorites, updateFavorites } = useFavorites();

  const columns: GridColDef[] = [
    {
      field: "resource",
      headerName: "Type",
      minWidth: 80,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: ({ row: { realId, resource, name } }) => (
        <>
          <FavButton
            id={realId}
            resource={resource}
            name={name}
            onCallback={updateFavorites}
          />

          <ShowButton resource={resource} recordItemId={realId} hideText />
        </>
      ),
    },
  ];

  const rows = useMemo(() => {
    return favorites
      ? Object.values(favorites).map(({ id, name, resource }) => ({
          id: `${resource}${id}`,
          realId: id,
          name,
          resource,
        }))
      : [];
  }, [favorites]);

  return (
    <List title={<Title label="Favorites" />} breadcrumb={false}>
      <DataGrid
        rows={rows}
        autoHeight
        columns={columns}
        disableColumnMenu
        disableRowSelectionOnClick
        sx={{
          border: "none",
          "& .MuiDataGrid-columnHeaders": {
            background: "rgb(17, 17, 17)",
            borderBottom: "1px solid rgb(16, 16, 16)",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid rgb(17, 17, 17)",
          },
        }}
      />
    </List>
  );
};
