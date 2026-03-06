export interface LoginCredentials {
    username: string
    password: string
}

export interface LoginResponse {
    token: string
}

export interface AuthUser {
    id: number
    username: string
    token: string
}

export interface JwtPayload{
    sub: number
    user: string
    iat: number  // this is issued at
}

