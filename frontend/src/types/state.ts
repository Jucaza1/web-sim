export type UserInfo = {
  id: number
  name: string
  role: "USER" | "ADMIN_COMPANY" | "ADMIN"
  company: number | null
}
