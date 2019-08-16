import { getUser } from "./storageUtils";
//读取local中的user
 const user = getUser()

 export default{
     user,
     product:{},
 }