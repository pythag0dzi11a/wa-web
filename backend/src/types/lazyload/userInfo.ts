import { escapeLiteral } from "pg";
import db from "../../utils/db/db.ts";
import { LazyCache } from "./lazyCache.ts";

export const securityUpdateTimeCache = new LazyCache(async (uuid: string) => {
    const result = await db().query(`SELECT updated_at
                                     FROM user_security
                                     WHERE uuid = ${escapeLiteral(uuid)}`);

    if (result.rowCount != 1) {
        throw new Error(`User ${uuid} not found`);
    }

    return Number(result.rows[0]["updated_at"]);
}, 60);

export default class UserInfo {
    protected _uuid: string;
    protected _error?: Error;
    protected data?: {
        uuid: string;
        username: string;
        email: string;
        permission: number;
        createdAt: number;
    };

    constructor(uuid: string) {
        this._uuid = uuid;
    }

    public uuid() {
        return this._uuid;
    }

    public async username() {
        if (!this.data) {
            this.data = await this.getData();
        }

        return this.data.username;
    }

    public async email() {
        if (!this.data) {
            this.data = await this.getData();
        }

        return this.data.email;
    }

    public async permission() {
        if (!this.data) {
            this.data = await this.getData();
        }

        return this.data.permission;
    }

    public async createdAt() {
        if (!this.data) {
            this.data = await this.getData();
        }

        return this.data.createdAt;
    }

    async securityUpdatedTime() {
        return await securityUpdateTimeCache.get(this._uuid);
    }

    protected async getData() {
        if (this._error) {
            throw this._error;
        }

        const result = await db().query(`SELECT *
                                         FROM user_info
                                         WHERE uuid = ${escapeLiteral(this._uuid)}`);

        if (result.rowCount != 1) {
            this._error = new Error(`User ${this.uuid} not found`);
            throw this._error;
        }

        return {
            uuid: result.rows[0]["uuid"],
            username: result.rows[0]["username"],
            email: result.rows[0]["email"],
            permission: result.rows[0]["permission"],
            createdAt: result.rows[0]["created_at"]
        };
    }
}
