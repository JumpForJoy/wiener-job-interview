import { ReactNode } from "react";
import { useGo } from "@refinedev/core";
import Chip from "@mui/material/Chip";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import GroupsIcon from "@mui/icons-material/Groups";
import AdbIcon from "@mui/icons-material/Adb";
import SnowmobileIcon from "@mui/icons-material/Snowmobile";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LiveTvIcon from "@mui/icons-material/LiveTv";

import { ResourcesType } from "../../types";
import { getId } from "../../utils";

import { Text } from "../text";

const iconMap: { [Key in ResourcesType as string]: ReactNode } = {
  planets: <TravelExploreIcon />,
  people: <GroupsIcon />,
  species: <AdbIcon />,
  vehicles: <SnowmobileIcon />,
  starships: <RocketLaunchIcon />,
  films: <LiveTvIcon />,
};

export type TListLinks = {
  links: string[];
  resources: ResourcesType;
  label?: string;
};

export const ListLinks: React.FC<TListLinks> = ({
  links,
  resources,
  label = "Item",
}) => {
  const go = useGo();
  const Icon = iconMap[resources];

  return Array.isArray(links) && links.length ? (
    links?.map((link: string, index: number) => {
      const id = getId(link);

      return (
        <Chip
          key={index}
          clickable
          icon={Icon}
          label={`${label} ${id}`}
          onClick={() => go({ to: `/${resources}/${id}` })}
        />
      );
    })
  ) : (
    <Text value="-" />
  );
};
