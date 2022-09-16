export class Token {
    success: boolean
    token: string
    cookieSettings: {
        expires: Date,
        httpOnly: boolean
        secure?: boolean
    }
}