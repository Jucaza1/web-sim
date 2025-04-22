import b from "bcrypt"

export class HasherBcrypt{
    private cost: number
    constructor(cost: number = 10) {
        this.cost = cost
    }
    hash(input: string): string {
        const salt = b.genSaltSync(this.cost)
        const hash = b.hashSync(input, salt)
        return hash
    }
    compare(input: string, hash: string): boolean {
        return b.compareSync(input, hash)
    }
}
