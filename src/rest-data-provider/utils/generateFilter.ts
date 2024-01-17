import { CrudFilters } from "@refinedev/core";

export const generateFilter = (filters?: CrudFilters) => {
  if (!filters?.length) {
    return;
  }

  // @ts-expect-error TODO Should be checked why 'field' is not accepted
  const value = filters.find(({ field }) => field === "q")?.value;

  if (value && value.length > 0) {
    return `search=${value.replace(/[^\w\s-]/g, "")}`;
  }

  return;
};
