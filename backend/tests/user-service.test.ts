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
function compareUserWithUser(user: User, userDTO: User): boolean {
    return user.email === userDTO.email &&
        user.name === userDTO.name &&
        user.companyId === userDTO.companyId &&
        user.profession === userDTO.profession
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
    it('should create a user', () => {
        const result = userService.createUser(userCreateDTO)
        expect(result.ok).toBe(true)
        const createdUser = result.data
        expect(createdUser).toBeDefined()
    })
    it('should create and get a user by id', () => {
        const createResult = userService.createUser(userCreateDTO)
        expect(createResult.ok).toBe(true)
        const createdUser = createResult.data!
        expect(createdUser).toBeDefined()

        const getResult = userService.getUser(createdUser.id)
        expect(getResult.ok).toBe(true)
        expect(getResult.data).toBeDefined()
        const user = getResult.data!

        expect(compareUserWithUserCreateDTO(user, userCreateDTO)).toBe(true)
        expect(compareUserWithUser(user, createdUser)).toBe(true)
    })
    it('should create and get a user by email', () => {
        const createResult = userService.createUser(userCreateDTO)
        expect(createResult.ok).toBe(true)
        const createdUser = createResult.data!
        expect(createdUser).toBeDefined()

        const getResult = userService.getUserByEmail(createdUser.email)
        expect(getResult.ok).toBe(true)
        expect(getResult.data).toBeDefined()
        const user = getResult.data!

        expect(compareUserWithUserCreateDTO(user, userCreateDTO)).toBe(true)
        expect(compareUserWithUser(user, createdUser)).toBe(true)
    })
    it('should create and get a user by companyId', () => {
        const createResult = userService.createUser(userCreateDTO)
        expect(createResult.ok).toBe(true)
        const createdUser = createResult.data!
        expect(createdUser).toBeDefined()

        const getResult = userService.getUsersByCompanyId(createdUser.companyId!)
        expect(getResult.ok).toBe(true)
        expect(getResult.data).toBeDefined()
        const users = getResult.data!
        expect(users.length).toBe(1)

        expect(compareUserWithUserCreateDTO(users[0], userCreateDTO)).toBe(true)
        expect(compareUserWithUser(users[0], createdUser)).toBe(true)
    })
    it('should create and get all users', () => {
        const createResult = userService.createUser(userCreateDTO)
        expect(createResult.ok).toBe(true)
        const createdUser = createResult.data!
        expect(createdUser).toBeDefined()

        const getResult = userService.getUsers()
        expect(getResult.ok).toBe(true)
        expect(getResult.data).toBeDefined()
        const users = getResult.data!
        expect(users.length).toBe(1)

        expect(compareUserWithUserCreateDTO(users[0], userCreateDTO)).toBe(true)
        expect(compareUserWithUser(users[0], createdUser)).toBe(true)
    })
    it('should update a user', () => {
        const createResult = userService.createUser(userCreateDTO)
        expect(createResult.ok).toBe(true)
        const createdUser = createResult.data!
        expect(createdUser).toBeDefined()

        const updateResult = userService.updateUser(createdUser.id, { name: "Updated User" })
        expect(updateResult.ok).toBe(true)
        const updatedUser = updateResult.data!
        expect(updatedUser).toBeDefined()
        expect(updatedUser.name).toBe("Updated User")
    })
    it('should delete a user', () => {
        const createResult = userService.createUser(userCreateDTO)
        expect(createResult.ok).toBe(true)
        const createdUser = createResult.data!
        expect(createdUser).toBeDefined()

        const deleteResult = userService.deleteUser(createdUser.id)
        expect(deleteResult.ok).toBe(true)
        const deletedUser = deleteResult.data!
        expect(deletedUser).toBeDefined()
        expect(deletedUser.id).toBe(createdUser.id)

        const getResult = userService.getUser(createdUser.id)
        expect(getResult.ok).toBe(false)
    })
    it('should not create a user with existing email', () => {
        const createResult1 = userService.createUser(userCreateDTO)
        expect(createResult1.ok).toBe(true)
        const createdUser1 = createResult1.data!
        expect(createdUser1).toBeDefined()

        const createResult2 = userService.createUser({ ...userCreateDTO, email: userCreateDTO.email })
        expect(createResult2.ok).toBe(false)
    })
    it('should not create a user with invalid email', () => {
        const createResult = userService.createUser({ ...userCreateDTO, email: "invalid-email" })
        expect(createResult.ok).toBe(false)
    })
    it('should not update a user with invalid id', () => {
        const createResult = userService.createUser(userCreateDTO)
        expect(createResult.ok).toBe(true)
        const createdUser = createResult.data!
        expect(createdUser).toBeDefined()

        const updateResult = userService.updateUser("invalid-id", { name: "Updated User" })
        expect(updateResult.ok).toBe(false)
    })
    it('should not update a user with an existing email', () => {
        const createResult1 = userService.createUser(userCreateDTO)
        expect(createResult1.ok).toBe(true)
        const createdUser1 = createResult1.data!
        expect(createdUser1).toBeDefined()

        const createResult2 = userService.createUser(userCreateDTO2)
        expect(createResult2.ok).toBe(true)
        const createdUser2 = createResult2.data!
        expect(createdUser2).toBeDefined()

        const updateResult = userService.updateUser(createdUser1.id, { email: createdUser2.email })
        expect(updateResult.ok).toBe(false)
    })
})

