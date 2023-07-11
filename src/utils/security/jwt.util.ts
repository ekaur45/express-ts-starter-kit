import * as jwt from 'jsonwebtoken';
export const getToken = function (data:any){
    try {
        return jwt.sign({...data},process.env.SECRET || "",{algorithm:"HS256"});
    } catch (error) {
        throw error;
    }
}
export const verify = function (data:string){
    try {
        return jwt.verify(data,process.env.SECRET || "",{algorithms:["HS256"]})
    } catch (error) {
        throw error;
    }
}