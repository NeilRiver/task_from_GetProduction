import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Card from "./Card";

const listById = gql`
  query getListById($id: ID!) {
    getListById(id: $id) {
      id
      url
      title
      text
    }
  }
`;

export default function Child(props) {
  let { id } = useParams();

  const { data, loading, error } = useQuery(listById, {
    variables: {
      id,
    },
  });
  return !loading ? (
    error ? (
      <Card
        url="https://clck.ru/R8Nxg"
        title="Мое лицо"
        text="Когда ты вводишь неправильную ссылку"
      />
    ) : (
      <Card
        id={data.getListById.id}
        url={data.getListById.url}
        title={data.getListById.title}
        text={data.getListById.text}
      />
    )
  ) : (
    "Loading"
  );
}
