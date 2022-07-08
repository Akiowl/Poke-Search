import React, { useState } from "react";
import axios from "axios";

import "./styles.css";

export const App = () => {
  console.log("レンダリングチェッカー");
  // Stateを設定
  const [searchText, setSearchText] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");

  // カラー
  const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5"
  };

  // colorsのkeyを配列に格納
  const main_types = Object.keys(colors);

  const onChangeText = (event) => setSearchText(event.target.value);

  // 検索を行う関数
  const Search = (text) => {
    const url = "https://pokeapi.co/api/v2/pokemon/" + text;
    // ポケモン情報取得
    axios.get(url).then((res) => {
      setName(res.data.name[0].toUpperCase() + res.data.name.slice(1));
      setId(res.data.id.toString().padStart(3, "0"));
      const poke_types = res.data.types.map((type) => type.type.name);
      const type = main_types.find((type) => poke_types.indexOf(type) > -1);
      setType(type);
      setImageUrl(res.data.sprites.front_default);
      setColor(colors[type]);
    });
  };

  // 検索ボタンが押された際のメソッド
  const onClickSearch = () => {
    if (searchText === "") return;
    Search(searchText);
  };

  return (
    <>
      <div>
        <h1>ポケモン検索</h1>
      </div>
      <div className="searchForm">
        <p>ポケモンの情報が検索できます</p>
        <input
          placeholder="ポケモンのIdを入力"
          value={searchText}
          onChange={onChangeText}
        ></input>
        <button onClick={onClickSearch}>検索</button>
      </div>
      <div className="resultContents" style={{ backgroundColor: color }}>
        <p>Name：{name}</p>
        <p>Id：{id}</p>
        <p>Type：{type}</p>
        <img src={imageUrl} alt=""></img>
      </div>
    </>
  );
};
