import { createHash } from "node:crypto";
import { salt } from "./const";

/**
 * Hashes a password using the SHA-512 algorithm with salt.
 *
 * @param {string} password - The password to be hashed.
 * @return {string} The hashed password.
 */
export function hashPassword(password: string): string {
    return createHash("sha512")
        .update(password + salt)
        .digest("hex");
}
