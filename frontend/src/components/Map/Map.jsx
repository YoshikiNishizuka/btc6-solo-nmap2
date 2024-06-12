import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import currentMarker from "../../mapIcon/leaf-green.png";
import placeMarker from "../../mapIcon/leaf-red.png";
import shadowMarker from "../../mapIcon/leaf-shadow.png";
import { Current } from "../Current";
import { AllArea } from "../AllArea";
import { Near } from "../Near";
import { Stack } from "@mantine/core";

// // 現在地アイコン
const currentIcon = L.icon({
  iconUrl: currentMarker,
  shadowUrl: shadowMarker,
  iconSize: [19, 47],
  shadowSize: [25, 32],
  iconAnchor: [11, 46],
  shadowAnchor: [2, 31],
  popupAnchor: [-1.5, -38],
});
// // 検索値アイコン
const placeIcon = L.icon({
  iconUrl: placeMarker,
  shadowUrl: shadowMarker,
  iconSize: [19, 47],
  shadowSize: [25, 32],
  iconAnchor: [11, 46],
  shadowAnchor: [2, 31],
  popupAnchor: [-1.5, -38],
});

export const Map = (props) => {
  const {
    center,
    mapKey,
    placeData,
    currentPosition,
    mapzoom,
    setCurrentPosition,
    setCenter,
    setMapKey,
    setMapzoom,
  } = props;

  return (
    <>
      <MapContainer
        id="map"
        key={mapKey}
        center={center}
        zoom={mapzoom}
        style={{ marginLeft: "5vw", height: "60vh", width: "90vw" }}
      >
        {/* サークル*/}
        <Circle
          center={currentPosition}
          radius={100}
          fillColor="#33FFCC"
          color="#339999"
          fillOpacity={0.1}
        />
        <Circle
          center={currentPosition}
          radius={400}
          fillColor="#3399FF"
          color="#3399FF"
          fillOpacity={0.1}
        />
        <Circle
          center={currentPosition}
          radius={700}
          fillColor="#FF3366"
          color="#FF82B2"
          fillOpacity={0.1}
        />
        {/* 地図のタイル情報 */}
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright";>OpenStreetMap</a> contributors'
          url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
        />
        {/* 現在地ピン */}
        <Marker id="map" position={currentPosition} icon={currentIcon}>
          <Popup>現在地</Popup>
        </Marker>
        {/* 検索地ピン */}
        {placeData.length > 0
          ? placeData.map((item) => (
              <Marker key={item.id} position={item} icon={placeIcon}>
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
        {/* マップ上にアイコン*/}
        <div id="map_button">
          <div className="leaflet-top leaflet-right">
            <div className="leaflet-control">
              <Stack>
                <Current
                  setCurrentPosition={setCurrentPosition}
                  setCenter={setCenter}
                  setMapKey={setMapKey}
                  setMapzoom={setMapzoom}
                ></Current>
                <AllArea
                  setMapzoom={setMapzoom}
                  setMapKey={setMapKey}
                  setCenter={setCenter}
                ></AllArea>
                <Near
                  placeData={placeData}
                  setMapzoom={setMapzoom}
                  setMapKey={setMapKey}
                  currentPosition={currentPosition}
                ></Near>
              </Stack>
            </div>
          </div>
        </div>
      </MapContainer>
    </>
  );
};
