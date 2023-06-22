import axios from "axios";

// {fetcher รับข้อมูลใช้hook current user => url api/current =>res.data เก็บลงฐานข้อมูล }
// {get api url => res.data => prisma}
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher;