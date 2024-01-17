import Typography from "@mui/material/Typography";

type ITitle = {
  label: string;
};

export const Title: React.FC<ITitle> = ({ label }) => (
  <Typography variant="h5">{label}</Typography>
);
