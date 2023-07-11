import { appendFileSync,writeFileSync,existsSync,mkdirSync ,readFileSync } from 'fs';
import * as path from 'path';
export const LogData = (data:Error)=>{
    const _path = path.resolve("logs/");
    const exists = existsSync(_path);
    if(!exists) mkdirSync(_path);
    let x={
        Name:data.name,
        Message:data.message,
        Stack:data.stack
    }
    var _data:string = "[]";
    try {
        _data = readFileSync(_path+"/logs.txt",{flag:"a"}).toString();
    } catch (error) {
        _data = "[]";
    } 
    if(!_data) _data="[]";
    var c = JSON.parse(_data);
    c.push(x);
    writeFileSync( _path+"/logs.txt",JSON.stringify(c));
}