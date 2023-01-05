interface IUserRegister {
    username: string
    email: string
    password: string
    passwordConfirmation?: string
    name: string
    phone: string
    birthday: Date
    role?: string
    loc: any
    friends: string
}