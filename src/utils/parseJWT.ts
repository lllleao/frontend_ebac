const parseJwt = (token: string | null) => {
    try {
        const base64Url = token?.split('.')[1]
        const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
            atob(base64 as string)
                .split('')
                .map(
                    (c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`
                )
                .join('')
        )
        return JSON.parse(jsonPayload)
    } catch (e) {
        console.log(e)
        return null
    }
}

export default parseJwt
