import { memo } from "react";
import { Text } from "@mantine/core";
import css from "./DefaultTileItemView.module.css";

type Props = {
  Icon: React.FC<any>;
  label: string;
};

const DefaultTileItemView = (props: Props) => {
  const { Icon, label } = props;
  return (
    <>
      <Icon className={css.fileIcon} />
      <Text size="xl" className={css.label}>
        {label}
      </Text>
    </>
  );
};

export default memo(DefaultTileItemView);
