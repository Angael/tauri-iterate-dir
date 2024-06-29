import { SegmentedControl } from "@mantine/core";
import { DisplayMode } from "../../stores/displayMode.store";

type Props = {
  value: string;
  setValue: (value: keyof typeof DisplayMode) => void;
}; // & ComponentProps<typeof SegmentedControl>;

const DisplayModeToggle = ({ value, setValue, ...props }: Props) => {
  return (
    <SegmentedControl
      {...props}
      value={value}
      onChange={(value) => setValue(value as any)}
      data={[
        { label: "List", value: DisplayMode.list },
        { label: "Small Grid", value: DisplayMode.grid_sm },
        { label: "Large Grid", value: DisplayMode.grid_lg },
        { label: "Virtualized Grid", value: DisplayMode.virtualized_grid },
      ]}
    />
  );
};

export default DisplayModeToggle;
