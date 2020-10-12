const express = require("express");

// prettier-ignore
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

const app = express();
const cors = require("cors");
app.use(cors());

app.listen(3005, (err) => {
  err ? console.error(`Error  ${err}`) : console.log("Server started");
});

//-----------------------------------------------------------------------

app.get("/all", function (req, res) {
  res.json(list);
});
