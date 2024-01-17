import { useState } from "react";

import { CrudFilters } from "@refinedev/core";
import { List as ListComponent, ShowButton, useDataGrid } from "@refinedev/mui";
import { DataGrid, GridColDef, GridFilterModel } from "@mui/x-data-grid";

import { Search } from "../components/search";
import { FavButton } from "../components/favButton";

export const List = () => {
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
    quickFilterValues: [],
  });
  const { dataGridProps, filters, search } = useDataGrid({
    pagination: { pageSize: 10, current: 1, mode: "server" },
    onSearch: (params: { q: string }) => {
      const filters: CrudFilters = [];

      filters.push({ field: "q", operator: "eq", value: params?.q });

      return filters;
    },
  });

  /**
   * The 'onResize' event is not triggered on page shrink
   * and only on grow. This happens when a column has
   * 'flex' and the DataGrid component is properly resized
   * on component mount.
   */
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      sortable: false,
      type: "number",
    },
    {
      field: "name",
      headerName: "Name",
      sortable: false,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: ({ id, row: { type, name } }) => {
        return (
          <>
            <FavButton id={id} resource={type} name={name} />

            <ShowButton recordItemId={id} hideText />
          </>
        );
      },
    },
  ];

  return (
    <ListComponent>
      <Search filters={filters} search={search} />

      <DataGrid
        {...dataGridProps}
        autoHeight={true}
        columns={columns}
        disableColumnMenu
        filterMode="server"
        filterModel={filterModel}
        onFilterModelChange={setFilterModel}
      />
    </ListComponent>
  );
};
