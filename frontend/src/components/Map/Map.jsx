import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvents,
} from "react-leaflet";
import L, { marker } from "leaflet";
import currentMarker from "../../mapIcon/leaf-green.png";
import placeMarker from "../../mapIcon/leaf-red.png";
import shadowMarker from "../../mapIcon/leaf-shadow.png";
import addMarker from "../../mapIcon/leaf-orange.png";
import { Current } from "../Current";
import { AllArea } from "../AllArea";
import { AddPoint } from "../AddPoint";
import { Stack } from "@mantine/core";
import { Delete } from "../Delete";
import { useEffect, useState } from "react";
import { Filter } from "../Filter/Filter";

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

// // 追加アイコン
const addIcon = L.icon({
  iconUrl: addMarker,
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
    setPlaceData,
    setAllPlace,
    allPlace,
  } = props;

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
    const addDistance = await placeData.map(
      (obj) =>
        (obj.distance =
          distance(
            currentPosition.lat,
            currentPosition.lng,
            obj.lat,
            obj.lng
          ).toFixed(3) + "km")
    );
    await setAllPlace(addDistance);
  };

  useEffect(() => {
    getNearestList();
  }, []);

  const deleteMark = async (ele) => {
    await fetch(`/api/toilet/${ele}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setPlaceData(data);
        setAllPlace(data);
      });
  };

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    useMapEvents({
      click: (location) => {
        setPosition([location.latlng.lat, location.latlng.lng]);
      },
      contextmenu: () => {
        setPosition(null);
      },
      dblclick: () => {
        setPosition(null);
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={addIcon}>
        <Popup>
          <AddPoint
            setPlaceData={setPlaceData}
            setAllPlace={setAllPlace}
            position={position}
            setMapKey={setMapKey}
          ></AddPoint>
        </Popup>
      </Marker>
    );
  }

  return (
    <>
      <MapContainer
        id="map"
        key={mapKey}
        center={center}
        zoom={mapzoom}
        style={{ marginLeft: "5vw", height: "80vh", width: "90vw" }}
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
                  <br />
                  <Delete onClick={() => deleteMark(item.id)}></Delete>
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
                <Filter
                  setPlaceData={setPlaceData}
                  allPlace={allPlace}
                ></Filter>
              </Stack>
            </div>
          </div>
        </div>
        <LocationMarker />
      </MapContainer>
    </>
  );
};
