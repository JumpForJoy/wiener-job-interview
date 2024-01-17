import { CrudFilters, getDefaultFilter } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import Close from "@mui/icons-material/Close";

type ISearch = {
  filters: CrudFilters;
  search: (value: { q: string }) => Promise<void>;
};

export const Search: React.FC<ISearch> = ({ filters, search }) => {
  const { register, resetField, handleSubmit } = useForm({
    defaultValues: {
      q: getDefaultFilter("q", filters, "eq"),
    },
  });

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        mb: 3,
      }}
      autoComplete="off"
      onSubmit={handleSubmit(search)}
    >
      <TextField
        {...register("q")}
        id="q"
        label="Search"
        placeholder="Name, Title, Model."
        margin="normal"
        fullWidth
        autoFocus
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          ),
          endAdornment: (
            <IconButton
              onClick={() => {
                resetField("q");
                handleSubmit(search)();
              }}
            >
              <Close />
            </IconButton>
          ),
        }}
      />

      <Button type="submit" variant="contained">
        Go
      </Button>
    </Box>
  );
};
