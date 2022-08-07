
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const product = require("./product");
const app = express();
var cors = require('cors')



app.use(express.json(), cors());
require("./connection");
app.post("/create", async (req, resp) => {
  let data = new product(req.body);
  let result = await data.save();
  resp.send(result);
});

app.get("/list", async (req, resp) => {
  let data = await product.find();
  resp.send(data);
});
app.delete("/delete/:_id", async (req, resp) => {
  console.log(req.params);
  let data = await product.deleteOne(req.params);
  resp.send(data);
});
app.put("/update/:_id", async (req, resp) => {
  console.log(req.params);
  let data = await product.updateOne(req.params, { $set: req.body });
  resp.send(data);
});
app.get("/search/:key", async (req, resp) => {
  console.log(req.params.key);
  let data = await product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { brand: { $regex: req.params.key } },
    ],
  });
  resp.send(data);
});

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "upload");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
}).single("user_file");
app.post("/upload",upload, (req, resp) => {
    console.log(req.body)
  resp.send("file  upload");
});
app.listen(4000);
