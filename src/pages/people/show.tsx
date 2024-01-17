import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import Stack from "@mui/material/Stack";

import { FeatureRow } from "../../components/featureRow";
import { Skeleton } from "../../components/skeleton";
import { Title } from "../../components/title";

import { ShowButtons } from "../../components/showButtons";

export const PeopleShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();

  const { data, isLoading } = queryResult;

  const {
    id,
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    homeworld,
    films,
    species,
    vehicles,
    starships,
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
            <FeatureRow title="Height" titleInfo="cm" value={height} />

            <FeatureRow title="Mass" titleInfo="kg" value={mass} />

            <FeatureRow title="Hair color" value={hair_color} />

            <FeatureRow title="Skin color" value={skin_color} />

            <FeatureRow title="Eye color" value={eye_color} />

            <FeatureRow title="Birth year" value={birth_year} />

            <FeatureRow title="Gender" value={gender} />

            <FeatureRow
              type="list"
              title="Homeworld"
              links={{
                links: homeworld ? [homeworld] : [],
                resources: "planets",
                label: "Planet",
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

            <FeatureRow
              type="list"
              title="Species"
              links={{
                links: species,
                resources: "species",
                label: "Species",
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
              title="Starships"
              links={{
                links: starships,
                resources: "starships",
                label: "Starship",
              }}
            />
          </>
        )}
      </Stack>
    </Show>
  );
};
