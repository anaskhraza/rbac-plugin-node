import RolesRepository from "../repository/RolesRepository";
import { rolesDTO } from "../DTO/rbacDTO";

class RolesServices {
  constructor(db, cache) {
    this.database = db;

    this.RolesRepository = new RolesRepository(db.roles, cache);
    
    this.getAllRoles = this.getAllRoles.bind(this);
    if(cache) {
      this.cache = cache;
      this.setRolesInCache();
    }
  }

  async setRolesInCache() {

    let roles = await this.getAllRoles();
    if(roles) {
      roles = rolesDTO(roles);
      this.cache.set("roles", roles, 1000000);
    }
    

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