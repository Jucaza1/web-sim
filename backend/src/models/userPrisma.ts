import { User } from '@prisma/client';
import { UserStore } from "./user";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export class UserPrismaStore implements UserStore {
    getUser(id: string): User | null {
        let user = null;
        prisma.user.findUnique({ where: { id } }).then((restult) => {
            if (!restult) {
                return
            }
            user = restult
        });
        return user;
    }

    getUsers(): User[] {
        let users: User[] = [];
        prisma.user.findMany().then((result) => {
            if (!result) {
                return
            }
            users = result
        });
        return users
    }

    createUser(user: User): User | null {
        // Check if the user already exists
        let existingUser = null;
        prisma.user.findUnique({ where: { email: user.email } }).then((result) => {
            if (result) {
                existingUser = result
            }
        })
        if (existingUser) {
            // throw new Error('User already exists');
            return null
        }
        // Create the user
        let userResult = null;
        prisma.user.create({ data: user }).then((result) => {
            if (!result) {
                return
            }
            userResult = result
        })
        return userResult
    }

    updateUser(id: string, user: Partial<User>): User | null {
        let userResult = null;
        prisma.user.update({ where: { id }, data: user }).then((result) => {
            if (!result) {
                return
            }
            userResult = result
        })
        return userResult

    }

    deleteUser(id: string): void {
        prisma.user.delete({ where: { id } });
    }
    getUserByEmail(email: string): User | null {
        let user = null;
        prisma.user.findUnique({ where: { email } }).then((result) => {
            if (!result) {
                return
            }
            user = result
        });
        return user
    }
    getUsersByCompanyId(companyId: string): User[] {
        let users: User[] = [];
        prisma.user.findMany({ where: { companyId } }).then((result) => {
            if (!result) {
                return
            }
            users = result
        });
        return users
    }
}
