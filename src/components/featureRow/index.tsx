import Stack from "@mui/material/Stack";

import { Text, TText } from "../text";

type TFeatureRow = TText & {
  title?: string;
  titleInfo?: string;
};

export const FeatureRow: React.FC<TFeatureRow> = ({
  title,
  titleInfo,
  ...rest
}) => (
  <Stack spacing={1}>
    <Text type="title">
      {title}{" "}
      {titleInfo && (
        <small>
          <i>({titleInfo})</i>
        </small>
      )}
    </Text>

    <Text {...rest} />
  </Stack>
);
