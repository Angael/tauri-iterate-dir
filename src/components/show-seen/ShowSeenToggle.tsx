import { SegmentedControl } from "@mantine/core";
import { useStore } from "@tanstack/react-store";
import showSeenStore from "../../stores/showSeen";

const ShowSeenToggle = () => {
  const showSeen = useStore(showSeenStore);

  return (
    <SegmentedControl
      value={showSeen.showSeen}
      onChange={(value) =>
        showSeenStore.setState((p) => ({ ...p, showSeen: value as any }))
      }
      data={[
        { label: "Unseen", value: "showUnseen" },
        { label: "Seen", value: "showSeen" },
        { label: "All", value: "showAll" }
      ]}
    />
  );
};

export default ShowSeenToggle;
