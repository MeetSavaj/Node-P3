import * as bodyParser from "body-parser";
// import { config } from "dotenv";
import express from "express";
import cors from 'cors';
import { Routes } from "./routes";
import { errors } from "celebrate";
import { NotFoundResponse } from "./helpers/http";
import path from 'path';
import { socketService } from "./socket";
const PORT = 3030;


class AppServer {
  protected app: express.Application = express();

  constructor() {

    this.app.use(cors());

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.all("/*", (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Request-Headers", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization, token, x-device-type, x-app-version, x-build-number, uuid,x-auth-token,X-L10N-Locale,x-auth-organization");
      res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
      next();
    });

    this.app.use('/public/', express.static(path.join(__dirname + './../public/')));

    const routes = new Routes();
    this.app.use("/admin", routes.path());

    // this.app.use(errors()); // JOI errors

    let server = this.app.listen(PORT, () => {
      console.log("Server Running on port : " + PORT);
    });

    this.app.get('/meet', function (req, res) {
      res.send('server working');
    });

    // this.app.use(errorMiddleWare);
    this.app.use(errors()); // JOI errors

    this.app.use((req, res) => {
      return NotFoundResponse(res, req.originalUrl + ' not found')
    })
    new socketService().init(server);
  } 

}


new AppServer();



// import { createServer } from "http";
// import { Server } from "socket.io";
// import express from "express";
// // const server = require('http').createServer(app);
// // const io = require('socket.io')(server);
// // import cors from 'Cors';
// const app = express();

// app.use('/', (req, res) => {
//   res.send("hii");
// })

// let server = app.listen(5444, () => {
//   console.log("Server Running on port : " + 5444);
// })

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// // // app.use(cors());

// io.on("connection", (socket: any) => {
//   console.log("Hello"); // ojIckSD2jqNzOqIrAGzL
// });



