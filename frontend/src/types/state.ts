export type UserInfo = {
  id: number
  role: "USER" | "ADMIN_COMPANY" | "ADMIN"
  company: number | null
}
