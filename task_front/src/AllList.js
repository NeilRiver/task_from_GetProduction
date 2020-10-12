import React, { useState, useEffect } from "react";
import styles from "./AllList.module.scss";
import { useHistory } from "react-router-dom";

function AllList(props) {
  const history = useHistory();

  const handleOnSubmit = (id) => {
    history.push(`/${id}`);
  };

  const [data, setCount] = useState(0);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3005/all");
      response = await response.json();
      setCount(response);
    }
    fetchMyAPI();
  }, []);

  console.log(data);

  return (
    <>
      {data === 0 ? (
        <div>Loading...</div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ minWidth: "75%" }}>
            {data.map((value) => (
              <div
                className={styles.getAllList}
                onClick={() => handleOnSubmit(value.id)}
              >
                <div className={styles.wrap}>
                  <div
                    className={styles.avatar}
                    style={{ backgroundImage: `url(${value.url})` }}
                  >
                    {" "}
                  </div>
                  <div className={styles.subtitle}>
                    {value.title} id[{value.id}]<div>{value.text}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default AllList;
