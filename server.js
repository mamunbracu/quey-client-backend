const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv");
const connectDatabase = require('./config/database')
dotenv.config();



const app = express();
app.use(cors())


connectDatabase()
// mongoose.connect(process.env.DATABASE, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// }, async () => {
//   console.log('db connected');
// })


//import route
const route = require("./Route/route")

const swaggerOptions = {
  swaggerDefinition: {
      info: {
          version: "1.0.0",
          title: "React Query V3",
          description: "CRUD Api",
          contact: {
              name: "MD Mamun Uddin"
          },
          servers: ["http://localhost:5000"]
      }
  },
  apis: ["./Route/*.js"]
};

app.get("/" , (req, res) => {
  res.send("api is running")
})

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(route);
const PORT = 8000
const server = app.listen(process.env.PORT || PORT, async () => {
  console.log(`server started at ${PORT}`);
});