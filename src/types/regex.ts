export const passwordRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^\w\s]).{8,32}$/, 'gm')
export const usernameRegex = RegExp(/^[a-zA-Z0-9_.-]+$/, 'g')
export const phoneRegex = RegExp(/^\+998\d{7}$/, 'g')