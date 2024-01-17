import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import Stack from "@mui/material/Stack";

import { FeatureRow } from "../../components/featureRow";
import { Skeleton } from "../../components/skeleton";
import { Title } from "../../components/title";

import { ShowButtons } from "../../components/showButtons";

export const SpeciesShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();

  const { data, isLoading } = queryResult;

  const {
    id,
    name,
    classification,
    designation,
    skin_colors,
    hair_colors,
    eye_colors,
    average_height,
    average_lifespan,
    homeworld,
    language,
    people,
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
            <FeatureRow title="Classification" value={classification} />

            <FeatureRow title="Designation" value={designation} />

            <FeatureRow title="Skin colors" value={skin_colors} />

            <FeatureRow title="Hair colors" value={hair_colors} />

            <FeatureRow title="Eye colors" value={eye_colors} />

            <FeatureRow
              title="Average height"
              titleInfo="cm"
              value={average_height}
            />

            <FeatureRow
              title="Average lifespan"
              titleInfo="years"
              value={average_lifespan}
            />

            <FeatureRow
              type="list"
              title="Homeworld"
              links={{
                links: homeworld ? [homeworld] : [],
                resources: "planets",
                label: "Planet",
              }}
            />

            <FeatureRow title="Language" value={language} />

            <FeatureRow
              type="list"
              title="People"
              links={{
                links: people,
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
