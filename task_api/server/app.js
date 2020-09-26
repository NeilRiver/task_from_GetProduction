const express = require("express");
const {graphqlHTTP} = require('express-graphql');
const cors = require("cors");
const { buildSchema } = require("graphql");
const { readFileSync } = require("fs");

var router = express.Router();

const schemaString = readFileSync("server/schema.graphql", {
  encoding: "utf-8",
});
const schema = buildSchema(schemaString);

const list = [
  { id: 0, url: 'http://bit.do/fJPxH', title: "Batman", text: "Потому, что я - Бэтмен! "},
  { id: 1, url: 'http://bit.do/fJPxH', title: "Batman", text: "Потому, что я - Бэтмен! Еие!" },
  { id: 2, url: 'http://bit.do/fJPxH', title: "Batman", text: "Потому, что я - Бэтмен! Оооу!" },
  { id: 3, url: 'http://bit.do/fJPxH', title: "Batman", text: "Человек - летучая мышь" },
  { id: 4, url: 'http://bit.do/fJPxH', title: "Batman", text: "Потому, что я - Бэтмен! Оуо!" },
  { id: 5, url: 'http://bit.do/fJPxH', title: "Batman", text: "Потому, что я - Бэтмен! Еие!" },
  { id: 6, url: 'http://bit.do/fJPxH', title: "Batman", text: "Потому, что я - Бэтмен! Оооу!" },
  { id: 7, url: 'http://bit.do/fJPxH', title: "Batman", text: "Человек - летучая мышь" },
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
