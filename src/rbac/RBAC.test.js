import { RBAC, Permission, Memory/*, Mongoose, Dynamoose, MySql */ } from './index';
import should from 'should';
// import mongoose from 'mongoose';
// import dynamoose from 'dynamoose';
import Storage from './Storage';

function testRBAC(storage, storageType) {
  
  describe(`RBAC ${storageType}`, () => {
    let rbac;
    let response;

    const permissions = [
      ['create', 'article'],
      ['delete', 'user'],
      ['update', 'article'],
    ];

    const roles = ['superadmin', 'admin', 'user', 'guest'];

    const grants = {
      admin: ['delete_user'],
      user: ['create_article', 'update_article'],
    };

    const permissionsAsObject = {
      article: ['create', 'update'],
      user: ['delete'],
    };

    it('decode permission', () => {
      const decoded = Permission.decodeName('create_article', '_');

      expect(decoded).toBeDefined();

      expect(decoded.action).toBe('create');
      expect(decoded.resource).toBe('article');
    });

    it('admin can create article', async () => {
      const { admin } = response.roles;

      const can = await admin.can('create', 'article');
      expect(can).toBe(true);
    });

    it('admin can delete user', async () => {
      const { admin } = response.roles;

      const can = await admin.can('delete', 'user');
      expect(can).toBe(true);
    });

    it('user can not delete user', async () => {
      const { user } = response.roles;

      const can = await user.can('delete', 'user');
      expect(can).toBe(false);
    });

    it('user can create article', async () => {
      const { user } = response.roles;

      const can = await user.can('create', 'article');
      expect(can).toBe(true);
    });

    it('user can any create article', async () => {
      const { user } = response.roles;

      const can = await user.canAny(permissions);
      expect(can).toBe(true);
    });

    it('user can all create article', async () => {
      const { user } = response.roles;

      const can = await user.canAll(permissions);
      expect(can).toBe(false);
    });

    it('admin can all create article', async () => {
      const { admin } = response.roles;

      await rbac.grants(grants);
      const can = await admin.canAll(permissions);
      expect(can).toBe(true);
    });

    it('should be able to get role', async () => {
      const admin = await rbac.getRole('admin');
      expect(admin.name).toBe('admin');
    });

    it('should not be able to get permission through getRole', async () => {
      const permission = await rbac.getRole('create_article');
      expect(permission).toBeUndefined();
    });

    it('should be able to get permission', async () => {
      const permission = await rbac.getPermission('create', 'article');
      expect(permission.name).toBe('create_article');
    });

    it('should not be able to get role through getPermission', async () => {
      await expect(rbac.getPermission('admin', '')).rejects.toEqual(new Error('Resource is not defined'));
    });

  });
}

testRBAC(Storage, 'Database');

