import { getCookie } from 'h3'

export default defineEventHandler((event) => {
    const user = getCookie(event,"userCookie");
    return user ? user : 'User is signed out'
})