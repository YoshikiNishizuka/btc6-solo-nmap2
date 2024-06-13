import { Button } from "@mantine/core";

export function Current(props) {
  const { setCurrentPosition, setCenter, setMapKey, setMapzoom } = props;

  // 現在地取得
  const getCurrentPosition = () =>
    new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
  const moveCurrentPosition = async () => {
    setMapKey(new Date().getTime());
    const location = await getCurrentPosition();
    setCurrentPosition({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
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
      onClick={moveCurrentPosition}
    >
      現在地
    </Button>
  );
}
