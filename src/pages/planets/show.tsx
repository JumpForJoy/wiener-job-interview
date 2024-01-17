import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import Stack from "@mui/material/Stack";

import { FeatureRow } from "../../components/featureRow";
import { Skeleton } from "../../components/skeleton";
import { Title } from "../../components/title";

import { ShowButtons } from "../../components/showButtons";

export const PlanetsShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();

  const { data, isLoading } = queryResult;

  const {
    id,
    name,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water,
    population,
    residents,
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
            <FeatureRow
              title="Rotation period"
              titleInfo="hours"
              value={rotation_period}
            />

            <FeatureRow
              title="Orbital period"
              titleInfo="days"
              value={orbital_period}
            />

            <FeatureRow title="Diameter" titleInfo="km" value={diameter} />

            <FeatureRow title="Climate" value={climate} />

            <FeatureRow title="Gravity" value={gravity} />

            <FeatureRow title="Terrain" value={terrain} />

            <FeatureRow
              title="Surface water"
              titleInfo="%"
              value={surface_water}
            />

            <FeatureRow title="Population" value={population} />

            <FeatureRow
              type="list"
              title="Residents"
              links={{
                links: residents,
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
                label: "Movie",
              }}
            />
          </>
        )}
      </Stack>
    </Show>
  );
};
