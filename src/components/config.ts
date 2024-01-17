import { CrudFilters, BaseRecord, HttpError } from "@refinedev/core";
import { UseDataGridProps } from "@refinedev/mui";

export const config: UseDataGridProps<
  BaseRecord,
  HttpError,
  unknown,
  BaseRecord
> = {
  pagination: { pageSize: 10, current: 1, mode: "server" },
  onSearch: (params: { q: string }) => {
    const filters: CrudFilters = [];

    filters.push({ field: "q", operator: "eq", value: params?.q });

    return filters;
  },
};
