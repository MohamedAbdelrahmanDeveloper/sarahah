import { getCookie } from 'h3'

export default defineEventHandler((event) => {
    const messages = getCookie(event,"userMessagesCookie");
    return messages ? messages : 'There are no messages yet'
})