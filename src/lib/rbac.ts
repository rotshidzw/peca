export const roleRank = {
  READER: 1,
  EDITOR: 2,
  ADMIN: 3
} as const;

export function hasRole(role: string | undefined, required: keyof typeof roleRank) {
  if (!role) return false;
  return roleRank[role as keyof typeof roleRank] >= roleRank[required];
}
