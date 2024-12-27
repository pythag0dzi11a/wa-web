import { randomUUID, UUID } from "node:crypto";
import { escapeLiteral } from "pg";
import db, { initDb } from "../db/db";
import { hashPassword } from "../password.ts";
import Locker from "../../types/locker.ts";

export type RegisterResult =
    | {
          status: RegisterStatus.OK;
          uuid: string;
      }
    | {
          status: Exclude<RegisterStatus, RegisterStatus.OK>;
      };

export enum RegisterStatus {
    USERNAME_EXIST,
    EMAIL_EXIST,
    OK
}

export async function regUser(
    username: string,
    email: string,
    password: string,
    uuid: UUID = randomUUID()
): Promise<RegisterResult> {
    await initDb();

    const lock = await Locker.lock([`user/register/${username}`, `email/${email}`]);

    try {
        // 判断用户名是否已被占用
        const dbUserResult = await db().query(
            `select *
             from user_info
             where username = ${escapeLiteral(username)};`
        );
        if (dbUserResult.rows.length > 0) {
            return { status: RegisterStatus.USERNAME_EXIST };
        }

        // 判断邮箱是否已被使用
        const dbEmailResult = await db().query(
            `select *
             from user_emails
             where email = ${escapeLiteral(email)};`
        );
        if (dbEmailResult.rows.length > 0) {
            return { status: RegisterStatus.EMAIL_EXIST };
        }

        // 将用户信息写入数据库
        const hashedPassword = hashPassword(password);

        await Promise.all([
            db().query(`insert into user_info (uuid, username, email, permission)
                        values (${escapeLiteral(uuid)}, ${escapeLiteral(username)}, ${escapeLiteral(email)}, 1);

            insert into user_security (uuid, hashed_password)
            values (${escapeLiteral(uuid)}, ${escapeLiteral(hashedPassword)});

            insert into user_emails (uuid, email, verified)
            values (${escapeLiteral(uuid)}, ${escapeLiteral(email)}, true);`)
        ]);

        return { status: RegisterStatus.OK, uuid: uuid };
    } finally {
        lock.unlock();
    }
}
