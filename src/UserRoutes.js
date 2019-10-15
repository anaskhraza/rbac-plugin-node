
import { RBAC } from "./rbac/index";

rbac = new RBAC();


module.exports = (express) => {
  const router = express.Router();
  function adminController(req, res, next) {
    res.send("Hello admin");
  }

  // declare routes
  router.get("/", rbac.can("1", "view", "home"), adminController);

  return router;
};
