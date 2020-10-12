import React from "react";
import { useParams } from "react-router-dom";

import Card from "./Card";

export default function Child(props) {
  let { id } = useParams();

  return (
    <Card
      url="https://clck.ru/R8Nxg"
      title="Мое лицо"
      text="Когда ты вводишь неправильную ссылку"
    />
  );
}
