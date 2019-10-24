import express from 'express';
import bodyParser from 'body-parser';
// import { RBAC } from "./rbac/index";

// const rbac = new RBAC();

// rbac.can("1", "view", "home").then( can => {
//     console.log("can CHeck", can);
// })

// rbac.canAny("1", [["view", "home"], ["edit", "home"]]).then( can => {
//     console.log("can CHeck", can);
// })
const http = require('http');;

// your cus",tom controller for express//   res.send('Hello admin');

const app = express();

const apiRouter = require('./routes')(express);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-dsn');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', apiRouter);
// app.use('/admin', RBAC.can("admin", "view", "home"),adminController);

const port = process.env.PORT || 3002;

const httpServer = http.createServer(app);
httpServer.listen(port);
console.log(`Server is running on PORT ${port}`);
// app.listen(port, () => {
//    console.log(`Server is running on PORT ${port}`);
// });
export default app;
