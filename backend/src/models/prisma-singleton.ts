import { PrismaClient } from '@prisma/client'

export class PrismaClientSingleton {
    private static instance: PrismaClient | null = null
    private constructor() { }
    public static getInstance(): PrismaClient {
        if (!this.instance) {
            this.instance = new PrismaClient()
        }
        return this.instance
    }
}
