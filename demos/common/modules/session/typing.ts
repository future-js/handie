interface UserEntity {
  id: string;
  username: string;
  nickname: string;
}

type UserInfo = Omit<UserEntity, 'id'>;

type UserPermission = string[] | Record<string, string[]>;

type UserAndPermissions = UserInfo & {
  permissions: Record<string, UserPermission>;
};

export type { UserInfo, UserPermission, UserAndPermissions };
