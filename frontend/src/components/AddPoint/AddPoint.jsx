import { useState } from "react";

export function AddPoint(props) {
  const {setPlaceData} = props
  const [addAddress, setAddAddress] = useState("");
  const [addName, setAddName] = useState("");
  const [addLat, setAddLat] = useState("");
  const [addLng, setAddLng] = useState("");
  
  const clickSubmit = async () =>{
    await fetch("/api/toilet", {
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
    await fetch("/api/toilet")
    .then((res) => res.json())
    .then((data) => setPlaceData(data));
  }

  return (
    <>
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
      <button className="add_point_submit" onClick={clickSubmit}>
        登録
      </button>
    </>
  );
}
