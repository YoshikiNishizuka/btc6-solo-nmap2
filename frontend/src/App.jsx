import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { Map } from "./components/Map";
import "@mantine/core/styles.css";

// 現在地取得
const getCurrentPosition = () =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );

const App = () => {
  const [mapKey, setMapKey] = useState(0); //Map再描画用
  const [currentPosition, setCurrentPosition] = useState({
    lat: 35.175,
    lng: 137.06,
  });
  const [placeData, setPlaceData] = useState([]);
  const [allPlace,setAllPlace] = useState([])
  const [mapzoom, setMapzoom] = useState("16");
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  useEffect(() => {
    moveCurrentPosition();
    fetch("/api/toilet")
      .then((res) => res.json())
      .then((data) => {
        setPlaceData(data)
        setAllPlace(data)
      });
  }, []);

  const moveCurrentPosition = async () => {
    // setMapKey(new Date().getTime());
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
    <>
      <h1>N-map2 </h1>
      <h2>~長久手市 公共トイレ検索~</h2>
      <Map
        center={center}
        mapKey={mapKey}
        placeData={placeData}
        currentPosition={currentPosition}
        mapzoom={mapzoom}
        setCurrentPosition={setCurrentPosition}
        setCenter={setCenter}
        setMapKey={setMapKey}
        setMapzoom={setMapzoom}
        setPlaceData={setPlaceData}
        setAllPlace={setAllPlace}
        allPlace={allPlace}
      ></Map>
    </>
  );
};

export default App;
