import { Button } from "@mantine/core";

export function Delete(props) {
  const { onClick } = props;

  return (
    <Button
      variant="filled"
      color="red"
      size="compact-xs"
      radius="xl"
      onClick={onClick}
    >
      削除
    </Button>
  );
}
