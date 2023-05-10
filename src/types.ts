export interface COMMENT {
    ani_id: string;
    user: string;
    comment: string;
}

export interface USER_SIGNUP {
    username: string
    email: string
    password: string
}

export interface USER {
    username: string
    email: string
    password: string,
    _id: string,
    __v: number
}

export interface USER_LOGIN {
    username: string
    email: string
    password: string
}

export interface RESPONSE {
    code: number
    message: string
    data?: any
    error?: any
}