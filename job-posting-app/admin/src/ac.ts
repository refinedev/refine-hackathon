import { AccessControl } from "accesscontrol";

export enum AppRoles {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
}

export const ac = new AccessControl();
ac
  // editor
  .grant(AppRoles.EDITOR)
  .read(["companies", "jobs"])
  .create("jobs")
  .update("jobs")
  // admin
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.EDITOR)
  .create(["companies"])
  .update(["companies"])
  .delete(["companies", "jobs"]);
