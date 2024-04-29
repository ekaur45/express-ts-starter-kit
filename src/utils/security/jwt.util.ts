import * as jwt from 'jsonwebtoken';
export const getToken = function (data: any) {
    return jwt.sign({ ...data }, process.env.SECRET || "", { algorithm: "HS256" });
}
export const verify = function (data: string) {
    return jwt.verify(data, process.env.SECRET || "", { algorithms: ["HS256"] })
}