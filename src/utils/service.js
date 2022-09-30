import axios from 'axios';


const service=axios.create({
    //baseURL: "https://yahenghb.com/JKDGJC",//服务器 
    //  baseURL:"https://yahenghb.com//JKDGJC",
    baseURL:'http://192.168.1.19:8015/',//本地测试
    timeout:3000
})



export default service