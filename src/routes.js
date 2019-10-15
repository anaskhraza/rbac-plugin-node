module.exports = (express) => {
  // your custom controller for express

  const router = express.Router();

  const UserRoutes = require("./UserRoutes")(express);
  // const MeetingRoutes = require("./MeetingRoutes")(express, db);
  // const PermissionRoutes = require("./PermissionRoutes")(express, db);
  // const RolesRoutes = require("./RolesRoutes")(express, db);
  // const QuestionCategoryRoutes = require("./QuestionCategoryRoutes")(express, db);
  // const QuestionRoutes = require("./QuestionRoutes")(express, db);
  // const ResponseRoutes = require("./ResponseRoutes")(express, db);

  router.use("/users", UserRoutes);
  // router.use("/meetings", MeetingRoutes);
  // router.use("/permissions", PermissionRoutes);
  // router.use("/roles", RolesRoutes);
  // router.use("/question_category", QuestionCategoryRoutes);
  // router.use("/questions", QuestionRoutes);
  // router.use("/responses", ResponseRoutes);

  return router;
};
