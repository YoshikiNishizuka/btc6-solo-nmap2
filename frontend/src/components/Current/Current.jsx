import { Button } from "@mantine/core";

export function Current(props) {
  const { setCurrentPosition, setCenter, setMapKey, setMapzoom } = props;

  // 現在地取得
  const getCurrentPosition = () =>
    new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
  const moveCurrentPosition = async () => {
    console.log("クリック直後")
    // setMapKey(new Date().getTime());
    console.log("再描画一回め")
    const location = await getCurrentPosition();
    console.log("現在地ゲット")
    setCurrentPosition({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    console.log("setCurrentPosition")
    setCenter({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    setMapzoom("16");
    setMapKey(new Date().getTime());
  };

  return (
    <Button
      variant="filled"
      color="cyan"
      size="compact-xs"
      radius="xl"
      onClick={()=>moveCurrentPosition()}
    >
      現在地
    </Button>
  );
}
