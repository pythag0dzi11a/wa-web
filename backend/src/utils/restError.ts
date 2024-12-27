import { ApiResponseError } from "share";

export const ErrorWrongFields: ApiResponseError = {
    code: 400,
    error: "WrongFields"
};

export const ErrorTooManyAttempts: ApiResponseError = {
    code: 403,
    error: "TooManyAttempts"
};

export const ErrorWrongUsernameOrPassword: ApiResponseError = {
    code: 403,
    error: "WrongUsernameOrPassword"
};

export const ErrorWrongPassword: ApiResponseError = {
    code: 403,
    error: "WrongPassword"
};

export const ErrorUsernameExist: ApiResponseError = {
    code: 403,
    error: "UsernameExist"
};

export const ErrorEmailExist: ApiResponseError = {
    code: 403,
    error: "EmailExist"
};

export const ErrorUnauthorized: ApiResponseError = {
    code: 401,
    error: "Unauthorized"
};

export const ErrorInternalServerError: ApiResponseError = {
    code: 500,
    error: "InternalServerError"
};

export const ErrorNotFound: ApiResponseError = {
    code: 404,
    error: "NotFound"
};
export const ErrorDeletingPrimaryEmail: ApiResponseError = {
    code: 403,
    error: "DeletingPrimaryEmail"
};

export const ErrorEmailNotFound: ApiResponseError = {
    code: 400,
    error: "EmailNotFound"
};

export const ErrorPermissionDenied: ApiResponseError = {
    code: 403,
    error: "PermissionDenied"
};
