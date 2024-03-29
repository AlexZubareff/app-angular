export interface IUser {
    login: string,
    email?: string,
    password: string,
    cardNumber?: string
}

export const USER_LOCALSTORAGE_NAME = 'userApp';