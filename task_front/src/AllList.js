import React from "react";
import { useQuery, gql } from "@apollo/client";
import styles from "./AllList.module.scss";
import { useHistory } from "react-router-dom";

const all_list = gql`
  {
    getAllList {
      id
      url
      title
      text
    }
  }
`;

function AllList(props) {
  const history = useHistory();

  const { data, loading } = useQuery(all_list);

  const handleOnSubmit = (id) => {
    history.push(`/${id}`);
  };

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && data.getAllList && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ minWidth: "75%" }}>
            {data.getAllList.map((value) => (
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
