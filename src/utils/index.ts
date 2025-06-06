export const sanitizeInput = (input: string) => {
    return input.trim().replace(/<[^>]*>/g, '')
}

export const validatePassword = (password: string): boolean => {
    const hasMinLength = password.length >= 8
    const isNumeric = /^\d+$/.test(password)
    const isAlpha = /^[a-zA-Z]+$/.test(password)

    return hasMinLength && !isNumeric && !isAlpha
}
