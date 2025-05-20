import { User } from "./db";

export type UserDTO = Omit<User, "password">
