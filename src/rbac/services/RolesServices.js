import RolesRepository from "../repository/RolesRepository";

class RolesServices {
  constructor(db, cache) {
    this.database = db;

    this.RolesRepository = new RolesRepository(db.roles, cache);
    
    this.getAllRoles = this.getAllRoles.bind(this);
  }

  async getAllRoles(name) {
    console.log("UserController ", "UserController");
    return await this.RolesRepository.getAllRoles();
  }

  async createRole(name) {
    console.log("UserController ", "UserController");
    return await this.RolesRepository.createRole(name);
  }

  async createBulkRoles(names) {
    console.log("UserController ", "UserController");
    return await this.RolesRepository.createBulkRoles(names);
  }

  

}


export default RolesServices;