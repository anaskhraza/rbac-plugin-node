import express from "express";
import { RBAC } from "../rbac/index";
// import secure from "rbac/controllers/express";
const rbac = new RBAC();

const canView = async (req, res, next) => {
  //   console.log("req ", req);
  // if (req.user) {
  // user is authenticated
  //   const rbac = req.rbac;
  //   res.send(req);
  const roleId = req.query.roleId; //req.roleId // Role should be passed from authentication middleware to the RBAC or through jwt token
  const route = req.path.replace("/", "");

  const can = rbac.can(roleId, "view", route).then(isPermit => {
    if (isPermit) {
      next();
    } else {
      res.send(401, "Unauthorized");
    }
  });
};

const canAny = async (req, res, next) => {
  //   console.log("req ", req);
  // if (req.user) {
  // user is authenticated
  //   const rbac = req.rbac;
  //   res.send(req);
  const roleId = req.query.roleId;//req.roleId // Role should be passed from authentication middleware to the RBAC or through jwt token
//   const route = req.url.replace("/", "");

  const can = rbac
    .canAny(roleId, [["view", "home"], ["edit", "home"]])
    .then(isPermit => {
      if (isPermit) {
        next();
      } else {
        res.send(401, "Unauthorized");
      }
    });
};

const canAll = async (req, res, next) => {
    //   console.log("req ", req);
    // if (req.user) {
    // user is authenticated
    //   const rbac = req.rbac;
    //   res.send(req);
    const roleId = req.query.roleId; 
    
    //req.roleId // Role should be passed from authentication middleware to the RBAC or through jwt token
    // const route = req.url.replace("/", "");
  
    const can = rbac
      .canAll(roleId, [["view", "home"], ["view", "admin"], ["view", "users"]])
      .then(isPermit => {
        if (isPermit) {
          next();
        } else {
          res.send(401, "Unauthorized");
        }
      });
  };

  const getPermissions = async (req, res, next) => {
    //   console.log("req ", req);
    // if (req.user) {
    // user is authenticated
    //   const rbac = req.rbac;
    //   res.send(req);
    const roleId = req.query.roleId; //req.roleId // Role should be passed from authentication middleware to the RBAC or through jwt token
    // const route = req.url.replace("/", "");
  
    const can = rbac
      .getScope(roleId)
      .then(permissionArray => {
        if (permissionArray && permissionArray.length > 0) {
          res.send(permissionArray);
        } else {
          res.send(401, "Unauthorized");
        }
      });
  };

module.exports = { canView, canAny, canAll, getPermissions };
