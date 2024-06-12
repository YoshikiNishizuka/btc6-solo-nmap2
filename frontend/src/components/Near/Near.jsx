import { Button } from "@mantine/core";

export function Near(props) {
  const { currentPosition, placeData, setMapKey } = props;

  //経度緯度から２点間の距離を返す
  const R = Math.PI / 180;
  function distance(lat1, lng1, lat2, lng2) {
    lat1 *= R;
    lng1 *= R;
    lat2 *= R;
    lng2 *= R;
    return (
      6371 *
      Math.acos(
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) +
          Math.sin(lat1) * Math.sin(lat2)
      )
    );
  }

  const getNearestList = async () => {
    placeData.forEach(
      (obj) =>
        (obj.distance =
          distance(
            currentPosition.lat,
            currentPosition.lng,
            obj.lat,
            obj.lng
          ).toFixed(3) + "km")
    );
    placeData.sort((a, b) => {
      if (a.distance < b.distance) return -1;
      if (a.distance > b.distance) return 1;
      return 0;
    });
    setMapKey(new Date().getTime());
  };

  return (
    <Button
      variant="filled"
      color="cyan"
      size="xs"
      radius="xl"
      onClick={() => getNearestList()}
    >
      近
    </Button>
  );
}
