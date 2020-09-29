import React from "react";
import styles from "./AllList.module.scss";

function Card(props) {
  return (
    <div style={{ height: "100vh" }} className={styles.getAllList}>
      <div className={styles.wrap}>
        <div
          className={styles.avatar}
          style={{ backgroundImage: `url(${props.url})` }}
        ></div>
        <div className={styles.subtitle}>
          {props.title} id[{props.id}]<div>{props.text}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
