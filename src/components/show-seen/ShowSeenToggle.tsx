import { SegmentedControl } from "@mantine/core";
import { useStore } from "@tanstack/react-store";
import showSeenStore, { SeenMode } from "../../stores/showSeen";

const ShowSeenToggle = () => {
  const showSeen = useStore(showSeenStore);

  return (
    <SegmentedControl
      value={showSeen}
      onChange={(value) => showSeenStore.setState((p) => value as SeenMode)}
      data={[
        { label: "Unseen", value: "showUnseen" },
        { label: "Seen", value: "showSeen" },
        { label: "All", value: "showAll" }
      ]}
    />
  );
};

export default ShowSeenToggle;
