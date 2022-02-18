import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  // editor
  .grant(AppRoles.EDITOR)
  .create('jobs')
  .update('jobs')
  // admin
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.EDITOR)
  .create(['companies'])
  .update(['companies'])
  .delete(['companies', 'jobs']);
