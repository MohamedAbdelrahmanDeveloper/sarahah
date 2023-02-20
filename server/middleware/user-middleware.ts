
import { getCookie } from 'h3'

export default defineEventHandler((event) => {
    const userCookie = getCookie(event,"userCookie");
    // @ts-ignore
      event.node.req.user = userCookie ? userCookie : 'User is signed out'
    // const userMessagesCookie = getCookie(event,"userMessagesCookie");
    //   // @ts-ignore
    // event.node.req.user = userMessagesCookie ? userMessagesCookie : 'User is signed out'
    // // console.log(event.node.req.user);
})