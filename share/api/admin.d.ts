import { tags } from "typia";

export interface AdminUserGetQuery {
    uuid?: string & tags.Format<"uuid">;
    username?: string;
    email?: string & tags.Format<"email">;
    count?: number;
}

export interface AdminUserGetResponse {
    code: 200;
    data: {
        uuid: string & tags.Format<"uuid">;
        username: string;
        email: string & tags.Format<"email">;
        permission: number;
        created_at: number;
    }[];
}

export interface AdminNoticeGetResponse {
    code: 200;
    data: {
        src: string;
    };
}

export interface AdminNoticePostRequest {
    src: string;
}

export interface AdminNoticePostResponse {
    code: 200;
    data: {};
}

export interface AdminBanRequest {
    uuid: string & tags.Format<"uuid">;
    reason?: string;
    type: "strong" | "weak";
}

export interface AdminBanResponse {
    code: 200;
    data: {};
}

export interface UnBanUserRequest {
    uuid: string & tags.Format<"uuid">;
}

export interface AdminUnbanResponse {
    code: 200;
    data: {};
}
