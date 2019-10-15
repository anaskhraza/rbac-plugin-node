import Permission from '../Permission';

export const permissionsDTO = (permissions) => {

    const permissionsDTO = permissions.map(permission => ({
        name: permission.permissions.name
    }))

    return permissionsDTO;
    
}