import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import Stack from "@mui/material/Stack";

import { FeatureRow } from "../../components/featureRow";
import { Skeleton } from "../../components/skeleton";
import { Title } from "../../components/title";

import { ShowButtons } from "../../components/showButtons";

export const FilmsShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();

  const { data, isLoading } = queryResult;

  const {
    id,
    name,
    episode_id,
    opening_crawl,
    director,
    producer,
    release_date,
    characters,
    planets,
    starships,
    vehicles,
    species,
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
            <FeatureRow title="Number of episode" value={episode_id} />

            <FeatureRow title="Opening crawl" value={opening_crawl} />

            <FeatureRow title="Director" value={director} />

            <FeatureRow title="Producer" value={producer} />

            <FeatureRow title="Release date" value={release_date} />

            <FeatureRow
              type="list"
              title="Characters"
              links={{
                links: characters,
                resources: "people",
                label: "Character",
              }}
            />

            <FeatureRow
              type="list"
              title="Planets"
              links={{
                links: planets,
                resources: "planets",
                label: "Planet",
              }}
            />

            <FeatureRow
              type="list"
              title="Starships"
              links={{
                links: starships,
                resources: "starships",
                label: "Starship",
              }}
            />

            <FeatureRow
              type="list"
              title="Vehicles"
              links={{
                links: vehicles,
                resources: "vehicles",
                label: "Vehicle",
              }}
            />

            <FeatureRow
              type="list"
              title="Species"
              links={{
                links: species,
                resources: "species",
                label: "Species",
              }}
            />
          </>
        )}
      </Stack>
    </Show>
  );
};
