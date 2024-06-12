import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { Map } from "./components/Map";
import { AddPoint } from "./components/AddPoint";
import { Delete } from "./components/Delete";
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
  const [mapzoom, setMapzoom] = useState("16");
  const [center, setCenter] = useState({ lat: 35.175, lng: 137.06 });

  useEffect(() => {
    moveCurrentPosition();
    fetch("/api/toilet")
      .then((res) => res.json())
      .then((data) => setPlaceData(data));
  }, []);

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

  const deleteMark = async (ele) =>{
    await fetch(`/api/toilet/${ele}`, {
      method: "DELETE",
    });
    await fetch("/api/toilet")
      .then((res) => res.json())
      .then((data) => setPlaceData(data));
  }

  return (
    <>
      <h1>N-map2 </h1>
      <h2>~長久手市 公共トイレ検索 非公式ツール~</h2>
      <div>
      </div>
      <AddPoint mapKey={mapKey} setPlaceData={setPlaceData}></AddPoint>
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
      ></Map>
      <p className="read-the-docs">↓↓ALL トイレリスト↓↓</p>

      {placeData.map((ele) => (
        <div className="list-button" key={ele.id}>
          <span style={{ color: "Royalblue" }}>{ele.name}</span> |{" "}
          <span style={{ color: "Seagreen" }}>{ele.address}</span> |{" "}
          <span style={{ color: "Darkred" }}>{ele.distance}</span>
          <Delete onClick={() => deleteMark(ele.id)}></Delete>
        </div>
      ))}
    </>
  );
};

export default App;
