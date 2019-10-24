// @flow
import Permission from "./Permission";
import Role from "./Role";
import Base from "./Base";
import type RBAC from "./RBAC";
import db from "./models";
import RoleServices from "./services/RolesServices";
import PermissionServices from "./services/PermissionServices";
import NodeCache from 'node-cache';

export default class Storage {
  static useRBAC(rbac) {
    if (this.rbac) {
      throw new Error(
        "Storage is already in use with another instance of RBAC"
      );
    }
    
    const cache = new NodeCache();
    this.db = db;
    this.cache = cache;
    this.roleServices = new RoleServices(this.db,  this.cache);
    this.permissionServices = new PermissionServices(this.db  this.cache);
    this.rbac = rbac;
  }

  /**
   * Add permission or role
   * @method Storage#add
   * @param {Base} item Instance of role or permission
   */
  static async add(item: Bas, isRole): boolean {
    if (isRole) {
      return await this.roleServices.createRole(item);
    } else {
      return await this.permissionServices.createPermission(item);
    }
  }

  /**
   * Remove permission or role
   * @method Storage#remove
   * @param {Base} item Instance of role or permission
   */
  static async remove(item: Base): boolean {
    throw new Error("Storage method remove is not implemented");
  }

  /**
   * Add (grant) permission or role to hierarchy of actual role
   * @method Storage#grant
   * @param  {Role} role  Instance of role
   * @param  {Base} child Instance of role or permission
   */
  static async grant(role: Role, child: Base): boolean {
    try {
      if (role && child) {
        return await this.permissionServices.createOneRolePermission(
          role,
          child
        );
      }
    } catch (ex) {
      throw new Error("Storage method get is not implemented");
    }
  }

  /**
   * Remove (revoke) permission or role from hierarchy of actual role
   * @method Storage#revoke
   * @param  {Role} role  Instance of role
   * @param  {Base} child Instance of role or permission
   */
  static async revoke(role: Role, child: Base): boolean {
    throw new Error("Storage method revoke is not implemented");
  }

  /**
   * Get instance of permission or role by his name
   * @method Storage#get
   * @param  {String} name Name of role or permission
   * @param {Boolean} isRole True for Rol, false for Permission
   * @return {Base}
   */
  static async get(name: string, isRole: boolean): ?Base {
    try {
      if (isRole) {
        await this.roleServices.getAllRoles(name);
      } else {
        await this.permissionServices.getAllPermissions(name);
        console.log("now in get permissions");
      }
    } catch (ex) {
      throw new Error("Storage method get is not implemented");
    }
  }

  /**
   * Get all instances of Roles
   * @method Storage#getRoles
   * @return {Role[]}
   */
  static async getRoles(): Role[] {
    try {
      return await this.roleServices.getAllRoles();
    } catch (ex) {
      throw new Error("Storage method getRoles is not implemented");
    }
  }

  /**
   * Get all instances of Permissions
   * @method Storage#getPermissions
   * @return {Permission[]}
   */
  static async getPermissions(): Permission[] {
    try {
      return await this.permissionServices.getAllPermissions();
    } catch (ex) {
      throw new Error("Storage method getPermissions is not implemented");
    }
  }

  /**
   * Get instances of Roles and Permissions assigned to role
   * @method Storage#getGrants
   * @param  {String} role Name of role
   * @return {Base[]}
   */
  static async getGrants(role: string): Base[] {
    try {
      return await this.permissionServices.getUserSpecificPermission(role);
    } catch (ex) {
      console.log("ex", ex);
    }
  }

  /**
   * Get instance of role by his name
   * @method Storage#getRole
   * @param  {String} name Name of role
   * @return {Role}
   */
  static async getRoleById(name: string): ?Role {
    const role = await this.getById(name, true);
    
    return role;

  }

  /**
   * Get instance of role by his name
   * @method Storage#getRole
   * @param  {String} name Name of role
   * @return {Role}
   */
  static async getRole(name: string): ?Role {
    const role = await this.get(name, true);
    
    return role;

  }

  /**
   * Get instance of permission by his name
   * @method Storage#getPermission
   * @param  {string} action   Name of action
   * @param  {string} resource Name of resource
   * @return {Permission}           Instance of actual storage
   */
  static async getPermission(action: string, resource: string): ?Permission {
    const name = Permission.createName(
      action,
      resource,
      this.rbac.options.delimiter
    );
    const item = await this.get(name);
    if (item) {
      return item;
    }

    return undefined;
  }

  /**
   * Return true with callback if role or permission exists
   * @method Storage#exists
   * @param  {string} name Name of role or permission
   * @return {boolean}
   */
  static async exists(name: string): boolean {
    const item = await this.get(name);
    return !!item;
  }

  /**
   * Return true with callback if role exists
   * @method Storage#existsRole
   * @param  {string} name Name of role
   * @return {boolean}
   */
  static async existsRole(name: string): boolean {
    const role = await this.getRole(name);
    return !!role;
  }

  /**
   * Return true with callback if permission exists
   * @method Storage#existsPermission
   * @param  {string} action Name of action
   * @param  {string} resource Name of resource
   * @return {boolean}
   */
  static async existsPermission(action: string, resource: string): boolean {
    const permission = await this.getPermission(action, resource);
    return !!permission;
  }

  /**
   * Return true with callback if permission exists
   * @method Storage#existsPermission
   * @param  {string} userId Name of action
   * @param  {string} resource Name of resource
   * @return {boolean}
   */
  static async getUserRoles(action: string, resource: string): boolean {
    const permission = await this.getPermission(action, resource);
    return !!permission;
  }
}
