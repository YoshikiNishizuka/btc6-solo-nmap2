import { Button } from "@mantine/core";

export function AllArea(props) {
  const { setMapzoom, setCenter, setMapKey } = props;

  // 全域
  const getAllList = () => {
    console.log("Allクリック")
    setMapzoom("13");
    console.log("中心セット前ズーム設定後")
    setCenter({
      lat: 35.175,
      lng: 137.06,
    });
    setMapKey(new Date().getTime());
  };

  return (
    <Button
      variant="filled"
      color="cyan"
      size="compact-xs"
      radius="xl"
      onClick={() => getAllList()}
    >
      全域
    </Button>
  );
}
