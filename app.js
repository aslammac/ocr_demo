const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const port = 3000 || process.env.PORT;
// routes
const home = require("./lib/routes/home");
const ocr = require("./lib/routes/ocr");

//* Middleware
app.use(cors());
app.use(express.json());
app.use(
  morgan(
    "Method-:method URL-:url Status-:status Len-:res[content-length] - res_time-:response-time ms"
  )
);
app.use(express.static("public"));

//* Routes
app.use("/api/v1/", home);
app.use("/api/v1/ocr", ocr);

app.use((error, req, res, next) => {
  // console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});
//************************************************************************************************ */

//* Start server
app.listen(
  port,
  () => {
    console.log(`Server is running on port ${port}`);
  } //* Server is running on port 3000
);
