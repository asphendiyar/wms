export type GetUsersParams = {
  page: number;
  warehouse_id?: string;
  profile?: string;
  setFirst?: boolean;
};
export type GetUsersGroupsParams = {
  page: number;
  name?: string;
  setFirst?: boolean;
};
export type GetOneUsersGroupParams = {
  page?: number;
  groupId: string;
};
