import { SegmentedControl } from "@mantine/core";

export const DisplayMode = {
  list: "list",
  grid_sm: "grid_sm",
  grid_lg: "grid_lg"
} as const;

type Props = {
  value: string;
  setValue: (value: keyof typeof DisplayMode) => void;
}; // & ComponentProps<typeof SegmentedControl>;

const DisplayModeToggle = (props: Props) => {
  return (
    <SegmentedControl
      {...props}
      value={props.value}
      onChange={(value) => props.setValue(value as any)}
      data={[
        { label: "List", value: DisplayMode.list },
        { label: "Small Grid", value: DisplayMode.grid_sm },
        { label: "Large Grid", value: DisplayMode.grid_lg }
      ]}
    />
  );
};

export default DisplayModeToggle;
