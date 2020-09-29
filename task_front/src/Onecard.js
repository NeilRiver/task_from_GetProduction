import React from "react";
import { useParams } from "react-router-dom";
import styles from "./AllList.module.scss";

export default function Child(props) {
  let { id } = useParams();

  return (
    <div style={{ height: "100vh" }} className={styles.getAllList}>
      <div className={styles.wrap}>
        <div
          className={styles.avatar}
          style={{ backgroundImage: `url(${props.url})` }}
        ></div>
        <div className={styles.subtitle}>
          {props.title} id[{id}]<div>{props.text}</div>
        </div>
      </div>
    </div>
  );
}
