import React from "react";
import { useQuery } from '@apollo/react-hooks';
import  GetAllList from "./GetAllList.graphql";
import { gql } from "apollo-boost";


const q = gql`
  query getAllList {
    getAllList {
      id
      title
      text
    }
  }
`;

function AllList() {
  const { data, loading } = useQuery(GetAllList);
  //console.log(data)
  return <div>1</div>;
}

export default AllList;
