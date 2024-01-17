import { useGo } from "@refinedev/core";
import { ThemedSiderV2 } from "@refinedev/mui";

export const Sider = () => {
  const go = useGo();

  return (
    <ThemedSiderV2
      Title={() => (
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();

            go({ to: "/" });
          }}
        >
          <img src="/logo.png" width={30} height="auto" />
        </a>
      )}
    />
  );
};
