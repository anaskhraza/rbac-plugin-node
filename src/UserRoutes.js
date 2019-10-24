
import { RBAC } from "./rbac/index";
import {canView, canAny, canAll, getPermissions} from "./middleware/PermissionMiddleware";

// rbac = new RBAC();


module.exports = (express) => {
  const router = express.Router();
  function adminController(req, res, next) {
    res.send("Hello admin");
  }

  function userController(req, res, next) {
    res.send("Hello user");
  }

  function hrController(req, res, next) {
    res.send("Hello hr");
  }

  // declare routesrbac.can("1", "view", "home")
  router.get("/admin", canView , adminController);
  router.get("/home", canView , adminController);
  router.get("/", canAny , adminController);
  router.get("/permits", canAll , adminController);
  router.get("/permissions", getPermissions , adminController);

  return router;
};
