const express = require("express");
const {graphqlHTTP} = require('express-graphql');
const cors = require("cors");
const { buildSchema } = require("graphql");
const { readFileSync } = require("fs");

const schemaString = readFileSync("server/schema.graphql", {
  encoding: "utf-8",
});
const schema = buildSchema(schemaString);

const list = [
  { id: 0, title: "Some Title", text: "Some Text" },
  { id: 1, title: "Some Title", text: "Some Text" },
  { id: 2, title: "Some Title", text: "Some Text" },
  { id: 3, title: "Some Title", text: "Some Text" },
  { id: 4, title: "Some Title", text: "Some Text" },
  { id: 5, title: "Some Title", text: "Some Text" },
  { id: 6, title: "Some Title", text: "Some Text" },
  { id: 7, title: "Some Title", text: "Some Text" },
  { id: 8, title: "Some Title", text: "Some Text" },
  { id: 9, title: "Some Title", text: "Some Text" },
];

const root = {
  getAllList: () => {
    return list;
  },
  getListById: (params) => {
    return list.find(x=>x.id == params.id)
  }
};

//-----------------------------------------------------------------------

const app = express();
app.use(cors());
app.use("/graphql", graphqlHTTP({ schema, graphiql: true, rootValue: root }));

app.listen(3005, (err) => {
  err ? console.error(`Error  ${err}`) : console.log("Server started");
});
