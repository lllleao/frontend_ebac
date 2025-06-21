export const sanitizeInput = (input: string) => {
    return input.trim().replace(/<[^>]*>/g, '')
}

export const validatePassword = (password: string): boolean => {
    const hasMinLength = password.length >= 8
    const isNumeric = /^\d+$/.test(password)
    const isAlpha = /^[a-zA-Z]+$/.test(password)

    return hasMinLength && !isNumeric && !isAlpha
}

export const dateFormat = (date: Date) => {
    const data = new Date(date)
    const opcoes: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo'
    }
    const dataFormatada = data.toLocaleString('pt-BR', opcoes)
    return dataFormatada
}
