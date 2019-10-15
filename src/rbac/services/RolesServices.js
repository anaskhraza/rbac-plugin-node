import RolesRepository from "../repository/RolesRepository";

class RolesServices {
  constructor(roles) {
    this.RolesRepository = new RolesRepository(roles);

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