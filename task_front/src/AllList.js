import React from "react";
import { useQuery } from "@apollo/react-hooks";
import getAllList from "./getAllList.graphql";
import gql from "graphql-tag";

import styles from './AllList.module.scss'

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
  const { data, loading } = useQuery(all_list);
  console.log(data);
  return (
    
      <>
      {loading && <div>Loading...</div>}
      {!loading && data.getAllList && (
        <div style={{display:"flex",justifyContent: 'center'}}>
         <div style={{minWidth:'75%'}}>
          {data.getAllList.map((value) => (

            <div className={styles.getAllList}  onClick={() => props.onSelect(value)}>
              <div className={styles.wrap}>
              <div className={styles.avatar} style={{backgroundImage: `url(${value.url})`}}> </div>
                <div className={styles.subtitle}>
                {value.title} id[{value.id}]
                  <div>
                  {value.text}
                  </div>
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
