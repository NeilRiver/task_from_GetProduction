import React from "react";
import { useParams } from "react-router-dom";
import styles from "./AllList.module.scss";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

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

  const { data, loading } = useQuery(listById, {
    variables: {
      // id: selectedList,
      id,
    },
  });

  console.log("CARD", data);
  console.log("CARD", id);

  return !loading?(
    <div style={{ height: "100vh" }} className={styles.getAllList}>
      <div className={styles.wrap}>
        <div
          className={styles.avatar}
          style={{ backgroundImage: `url(${data.getListById.url})` }}
        ></div>
        <div className={styles.subtitle}>
          {data.getListById.title} id[{data.getListById.id}]<div>{data.getListById.text}</div>
        </div>
      </div>
    </div>
  ):
  'Loading';
}
