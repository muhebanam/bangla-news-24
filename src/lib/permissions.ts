export type Role = "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "REPORTER" | "USER";

export type Permission =
  | "manage_all"
  | "manage_users"
  | "manage_news"
  | "manage_ads"
  | "review_news"
  | "approve_news"
  | "create_news"
  | "edit_news"
  | "read_news"
  | "comment";

export const permissions: Record<Role, Permission[]> = {
  SUPER_ADMIN: ["manage_all", "manage_users", "manage_news", "manage_ads", "review_news", "approve_news", "create_news", "edit_news", "read_news", "comment"],
  ADMIN: ["manage_users", "manage_news", "manage_ads", "review_news", "approve_news", "create_news", "edit_news", "read_news", "comment"],
  EDITOR: ["review_news", "approve_news", "edit_news", "read_news", "comment"],
  REPORTER: ["create_news", "edit_news", "read_news", "comment"],
  USER: ["read_news", "comment"],
};

export const roleLabels: Record<Role, { bn: string; badge: string; color: string }> = {
  SUPER_ADMIN: { bn: "সুপার অ্যাডমিন", badge: "Super Admin", color: "badge-error" },
  ADMIN: { bn: "অ্যাডমিন", badge: "Admin", color: "badge-warning" },
  EDITOR: { bn: "বার্তা সম্পাদক", badge: "Editor", color: "badge-primary" },
  REPORTER: { bn: "প্রতিবেদক", badge: "Reporter", color: "badge-info" },
  USER: { bn: "সাধারণ পাঠক", badge: "Reader", color: "badge-ghost" },
};

export function hasPermission(role: Role, requiredPermission: Permission): boolean {
  if (role === "SUPER_ADMIN") return true;
  const userPerms = permissions[role] || [];
  return userPerms.includes(requiredPermission) || userPerms.includes("manage_all");
}
