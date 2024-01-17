import { CrudFilters } from "@refinedev/core";

export const generateFilter = (filters?: CrudFilters) => {
  if (!filters?.length) {
    return;
  }

  const value = filters.find(({ field }) => field === "q")?.value;

  if (value && value.length > 0) {
    return `search=${value.replace(/[^\w\s-]/g, "")}`;
  }

  return;
};
