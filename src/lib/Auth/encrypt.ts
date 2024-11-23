import bcrypt from "bcrypt"

export async function encrypt(password: string) {
    return await bcrypt.hash(password, 12)
}

export async function compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
}
