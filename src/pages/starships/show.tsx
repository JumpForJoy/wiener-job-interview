import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import Stack from "@mui/material/Stack";

import { FeatureRow } from "../../components/featureRow";
import { Skeleton } from "../../components/skeleton";
import { Title } from "../../components/title";

import { ShowButtons } from "../../components/showButtons";

export const StarshipsShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();

  const { data, isLoading } = queryResult;

  const {
    id,
    name,
    model,
    manufacturer,
    cost_in_credits,
    length,
    max_atmosphering_speed,
    crew,
    passengers,
    cargo_capacity,
    consumables,
    hyperdrive_rating,
    MGLT,
    starship_class,
    pilots,
    films,
  } = data?.data || {};

  return (
    <Show
      isLoading={isLoading}
      title={<Title label={name} />}
      recordItemId={id}
      headerButtons={({ refreshButtonProps }) => (
        <ShowButtons refreshButtonProps={refreshButtonProps} />
      )}
    >
      <Stack gap={2}>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <FeatureRow title="Model" value={model} />

            <FeatureRow title="Manufacturer" value={manufacturer} />

            <FeatureRow
              title="Cost"
              titleInfo="in credits"
              value={cost_in_credits}
            />

            <FeatureRow title="Length" titleInfo="m" value={length} />

            <FeatureRow
              title="Max atmosphering speed"
              titleInfo="m/s"
              value={max_atmosphering_speed}
            />

            <FeatureRow title="Crew" titleInfo="units" value={crew} />

            <FeatureRow
              title="Passengers"
              titleInfo="units"
              value={passengers}
            />

            <FeatureRow
              title="Cargo capacity"
              titleInfo="cubic meters"
              value={cargo_capacity}
            />

            <FeatureRow title="Consumables" value={consumables} />

            <FeatureRow title="Hyperdrive rating" value={hyperdrive_rating} />

            <FeatureRow title="MGLT" value={MGLT} />

            <FeatureRow title="Starship class" value={starship_class} />

            <FeatureRow
              type="list"
              title="Pilots"
              links={{
                links: pilots,
                resources: "people",
                label: "Person",
              }}
            />

            <FeatureRow
              type="list"
              title="Films"
              links={{
                links: films,
                resources: "films",
                label: "Film",
              }}
            />
          </>
        )}
      </Stack>
    </Show>
  );
};
