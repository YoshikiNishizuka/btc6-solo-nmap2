import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
import CurrentPostion from "./components/CurrentPosition";
import Nall from "./components/Nall";
import Nearest from "./components/Nearest";
import Submit from "./components/Submit";
import L from "leaflet"
L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/'

// 現在地取得
const getCurrentPosition = () =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );

// // 現在地アイコン=>未実装
// const currentIcon = Leaflet.icon({
//   // iconUrl: './mapIcon/icon1.png',
//   iconSize: [40, 40],
// });
// // 検索値アイコン=>未実装
// const placeIcon = Leaflet.icon({
//   // iconUrl: "./mapIcon/icon2.png",
//   iconSize: [40, 40],
//   className: "placeIcon",
// });

const App = () => {
  const [mapKey, setMapKey] = useState(0); //Map再描画用
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [placeData, setPlaceData] = useState([]);
  const [mapzoom, setMapzoom] = useState("13");

  useEffect(() => {
    moveCurrentPosition();
    fetch("/api/toilet")
      .then((res) => res.json())
      .then((data) => setPlaceData(data));
  }, []);

  const moveCurrentPosition = async () => {
    const location = await getCurrentPosition();
    setCurrentPosition({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    setMapKey(new Date().getTime());
  };

  // 検索処理
  const getAllList = () => {
    setMapzoom("13");
    setCurrentPosition({
      lat: 35.175,
      lng: 137.06,
    });
    setMapKey(new Date().getTime());
    fetch("/api/toilet")
      .then((res) => res.json())
      .then((data) => setPlaceData(data));
  };

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
    setMapzoom("16");
    const location = await getCurrentPosition();
    // console.log(location)
    setCurrentPosition({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    // console.log(currentPosition)
    setMapKey(new Date().getTime());
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
  };

  // function deleteMark(ele) {
  //   console.log(ele);
  //   const id=ele.id
  //   console.log(id)
  //   // fetch(`/api/list/${id}`,{
  //   //   method:'DELETE'
  //   // });
  // }

  const [addAddress, setAddAddress] = useState("");
  const [addName, setAddName] = useState("");
  const [addLat, setAddLat] = useState("");
  const [addLng, setAddLng] = useState("");

  function clickSubmit() {
    fetch("/api/toilet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: addName,
        address: addAddress,
        latitude: addLat,
        longitude: addLng,
      }),
    });
    getAllList();
  }

  return (
    <>
      <h1>N-map </h1>
      <h2>~長久手市 公共トイレ検索 非公式ツール~</h2>
      <div>
        <CurrentPostion onClick={() => moveCurrentPosition()}></CurrentPostion>
        <Nall onClick={() => getAllList()}></Nall>
        <Nearest onClick={() => getNearestList()}></Nearest>
      </div>
      {/* 地図表示 */}
      <input
        type="textbox"
        placeholder="住所"
        onChange={(event) => setAddAddress(event.target.value)}
      />
      <input
        type="textbox"
        placeholder="施設or場所名"
        onChange={(event) => setAddName(event.target.value)}
      />
      <input
        type="textbox"
        placeholder="緯度 latitude"
        onChange={(event) => setAddLat(event.target.value)}
      />
      <input
        type="textbox"
        placeholder="経度 longitude"
        onChange={(event) => setAddLng(event.target.value)}
      />
      <Submit className="add_point_submit" onClick={clickSubmit}></Submit>
      <MapContainer
        id="map"
        key={mapKey}
        center={currentPosition}
        zoom={mapzoom}
        style={{ height: "60vh", width: "80vw" }}
      >
        {/* 地図のタイル情報 */}
        <TileLayer
          //地理院タイル=>位置情報とズレる
          // attribution='&amp;copy <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">地理院タイル</a>'
          // url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
          attribution='&amp;copy <a href="http://osm.org/copyright";>OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* 現在地ピン */}
        <Marker id="map" position={currentPosition}>
          <Popup>現在地</Popup>
        </Marker>
        {/* 検索地ピン */}
        {placeData.length > 0
          ? placeData.map((item) => (
              <Marker key={item.id} position={item}>
                <Popup key={item.id}>
                  <b> {item.name} </b>
                  <br />
                  {item.address}
                  <br />
                  {item.distance}
                </Popup>
              </Marker>
            ))
          : null}
      </MapContainer>
      <p className="read-the-docs">↓↓ALL トイレリスト↓↓</p>

      {placeData.map((ele) => (
          <div className="list-button" key={ele.id}>
            <span style={{ color: "Royalblue" }}>{ele.name}</span> |{" "}
            <span style={{ color: "Seagreen" }}>{ele.address}</span> |{" "}
            <span style={{ color: "Darkred" }}>{ele.distance}</span>
            {/* <button onClick={() => deleteMark(ele.id)}>削除</button> */}
          </div>
      ))}
    </>
  );
};

export default App;
