export const getAvatarUrl = (userId: string) => {
    return `${process.env.REACT_APP_BACKEND_URL}/avatars/${userId}`
}