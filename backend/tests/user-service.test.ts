import { beforeEach, describe, expect, it } from '@jest/globals'
import { UserService } from '../src/services/user-service'
import { UserMemoryStore } from '../src/models/user-memory'
import { HasherBcrypt } from '../src/services/hashing'
import { UserCreateDTO } from '../src/types/validations'
import { User } from '../src/types/db'
import { randomUUID } from 'crypto'


const hasher = new HasherBcrypt(10)
let userService: UserService
let userCreateDTO: UserCreateDTO
let userCreateDTO2: UserCreateDTO
function initializeUserService() {
    const userStore = new UserMemoryStore()
    const uService = new UserService(userStore, hasher)
    return uService
}
function compareUserWithUserCreateDTO(user: User, userDTO: UserCreateDTO): boolean {
    return user.email === userDTO.email &&
        user.name === userDTO.name &&
        user.companyId === userDTO.companyId &&
        user.profession === userDTO.profession
}
function compareUserWithUser(user: User, user2: User): boolean {
    return user.email === user2.email &&
        user.name === user2.name &&
        user.companyId === user2.companyId &&
        user.profession === user2.profession
}
describe('UserService', () => {
    beforeEach(() => {
        userService = initializeUserService()
        userCreateDTO = {
            email: "test@gmail.com",
            password: "password",
            name: "Test User",
            companyId: randomUUID(),
            profession: "Engineer",
        }
        userCreateDTO2 = {
            email: "test2@gmail.com",
            password: "password",
            name: "Test User2",
            companyId: randomUUID(),
            profession: "Engineer",
        }
    })
    it('should create a user', async () => {
        const result = await userService.createUser(userCreateDTO)
        expect(result.ok).toBe(true)
        const createdUser = result.data
        expect(createdUser).toBeDefined()
    })
    it('should create and get a user by id', async () => {
        const createResult = await userService.createUser(userCreateDTO)
        expect(createResult.ok).toBe(true)
        const createdUser = createResult.data!
        expect(createdUser).toBeDefined()

        const getResult = await userService.getUser(createdUser.id)
        expect(getResult.ok).toBe(true)
        expect(getResult.data).toBeDefined()
        const user = getResult.data!

        expect(compareUserWithUserCreateDTO(user, userCreateDTO)).toBe(true)
        expect(compareUserWithUser(user, createdUser)).toBe(true)
    })
    it('should create and get a user by email', async () => {
        const createResult = await userService.createUser(userCreateDTO)
        expect(createResult.ok).toBe(true)
        const createdUser = createResult.data!
        expect(createdUser).toBeDefined()

        const getResult = await userService.getUserByEmail(createdUser.email)
        expect(getResult.ok).toBe(true)
        expect(getResult.data).toBeDefined()
        const user = getResult.data!

        expect(compareUserWithUserCreateDTO(user, userCreateDTO)).toBe(true)
        expect(compareUserWithUser(user, createdUser)).toBe(true)
    })
    it('should create and get a user by companyId', async () => {
        const createResult = await userService.createUser(userCreateDTO)
        expect(createResult.ok).toBe(true)
        const createdUser = createResult.data!
        expect(createdUser).toBeDefined()

        const getResult = await userService.getUsersByCompanyId(createdUser.companyId!)
        expect(getResult.ok).toBe(true)
        expect(getResult.data).toBeDefined()
        const users = getResult.data!
        expect(users.length).toBe(1)

        expect(compareUserWithUserCreateDTO(users[0], userCreateDTO)).toBe(true)
        expect(compareUserWithUser(users[0], createdUser)).toBe(true)
    })
    it('should create and get all users', async () => {
        const createResult = await userService.createUser(userCreateDTO)
        expect(createResult.ok).toBe(true)
        const createdUser = createResult.data!
        expect(createdUser).toBeDefined()

        const getResult = await userService.getUsers()
        expect(getResult.ok).toBe(true)
        expect(getResult.data).toBeDefined()
        const users = getResult.data!
        expect(users.length).toBe(1)

        expect(compareUserWithUserCreateDTO(users[0], userCreateDTO)).toBe(true)
        expect(compareUserWithUser(users[0], createdUser)).toBe(true)
    })
    it('should update a user', async () => {
        const createResult = await userService.createUser(userCreateDTO)
        expect(createResult.ok).toBe(true)
        const createdUser = createResult.data!
        expect(createdUser).toBeDefined()

        const updateResult = await userService.updateUser(createdUser.id, { name: "Updated User" })
        expect(updateResult.ok).toBe(true)
        const updatedUser = updateResult.data!
        expect(updatedUser).toBeDefined()
        expect(updatedUser.name).toBe("Updated User")
    })
    it('should delete a user', async () => {
        const createResult = await userService.createUser(userCreateDTO)
        expect(createResult.ok).toBe(true)
        const createdUser = createResult.data!
        expect(createdUser).toBeDefined()

        const deleteResult = await userService.deleteUser(createdUser.id)
        expect(deleteResult.ok).toBe(true)
        const deletedUser = deleteResult.data!
        expect(deletedUser).toBeDefined()
        expect(deletedUser.id).toBe(createdUser.id)

        const getResult = await userService.getUser(createdUser.id)
        expect(getResult.ok).toBe(false)
    })
    it('should not create a user with existing email', async () => {
        const createResult1 = await userService.createUser(userCreateDTO)
        expect(createResult1.ok).toBe(true)
        const createdUser1 = createResult1.data!
        expect(createdUser1).toBeDefined()

        const createResult2 = await userService.createUser({ ...userCreateDTO, email: userCreateDTO.email })
        expect(createResult2.ok).toBe(false)
    })
    it('should not create a user with invalid email', async () => {
        const createResult = await userService.createUser({ ...userCreateDTO, email: "invalid-email" })
        expect(createResult.ok).toBe(false)
    })
    it('should not update a user with invalid id', async () => {
        const createResult = await userService.createUser(userCreateDTO)
        expect(createResult.ok).toBe(true)
        const createdUser = createResult.data!
        expect(createdUser).toBeDefined()

        const updateResult = await userService.updateUser("invalid-id", { name: "Updated User" })
        expect(updateResult.ok).toBe(false)
    })
    it('should not update a user with an existing email', async () => {
        const createResult1 = await userService.createUser(userCreateDTO)
        expect(createResult1.ok).toBe(true)
        const createdUser1 = createResult1.data!
        expect(createdUser1).toBeDefined()

        const createResult2 = await userService.createUser(userCreateDTO2)
        expect(createResult2.ok).toBe(true)
        const createdUser2 = createResult2.data!
        expect(createdUser2).toBeDefined()

        const updateResult = await userService.updateUser(createdUser1.id, { email: createdUser2.email })
        expect(updateResult.ok).toBe(false)
    })
})

