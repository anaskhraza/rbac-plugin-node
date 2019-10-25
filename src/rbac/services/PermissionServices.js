import PermissionRepository from "../repository/PermissionRepository";
import { rolePermissionsDTO, getPermissionsByRole, permissionsDTO } from '../DTO/rbacDTO';

class PermissionServices {
  constructor(db, cache) {
    this.database = db;
    this.PermissonRepository = new PermissionRepository(db.permissions, cache);

    

    this.getAllPermissions = this.getAllPermissions.bind(this);
    this.getUserSpecificPermission = this.getUserSpecificPermission.bind(this);
    
    if(cache) {

      this.cache = cache;
      this.setPermissionsInCache();
      
    }
  }

  async setPermissionsInCache() {

    //  const permissions = await this.getAllPermissions();
      let rolePermissions = await this.PermissonRepository.getAllUserSpecificPermission(this.database);
      if(rolePermissions) {
        rolePermissions = rolePermissionsDTO(rolePermissions);
        this.cache.set("rolePermissions", rolePermissions, 1000000);
      }
     
    

  }


  async getAllPermissions() {
    console.log("UserController ", "UserController");
    return await this.PermissonRepository.getAllPermissions();
  }

  async getUserSpecificPermission(role) {
    console.log("getUserSpecificPermission ", "User Specific Permission");
    
    const rolePermissions = this.cache.get( "rolePermissions" );

    if(rolePermissions) {
      let roleBasedPermissions = getPermissionsByRole(rolePermissions);
      console.log("roleBasedPermissions ", roleBasedPermissions);
      return roleBasedPermissions[role];
    } else {
      let permissions = await this.PermissonRepository.getUserSpecificPermission(this.database, role);
      if(permissions) {
        permissions = permissionsDTO(permissions);
        return permissions;
      }
    }
  }

  async createPermission(name) {
    console.log("UserController ", "UserController");
    return await this.PermissonRepository.createPermission(name);
  }

  async RolePermissionMap(rolePermissionMap) {
    console.log("UserController ", "UserController");
    return await this.PermissonRepository.rolePermissionMap(rolePermissionMap);
  }

  async createOneRolePermission(role, permission) {
    console.log("UserController ", "UserController");
    return await this.PermissonRepository.createOneRolePermission(role, permission);
  }

}


export default PermissionServices;