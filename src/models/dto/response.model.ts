import { UserTypes } from "./user-types.model";

export class ResponseModel<T>{
    status:number | undefined;
    message:string | undefined;
    data:T | undefined;
}

export class AccountResponseModel{
    id:number | 0; 
    firstName:string; 
    lastName:string;
    username:string; 
    email:string;
    phoneNumber:string;
    password?:string;
    displayName:string; 
    type:UserTypes;
    profile:string;
    token?:string;
    constructor(){
        this.id = 0;
        this.username = "";
        this.password = "";
        this.displayName = "";
        this.firstName = "";
        this.lastName = "";
        this.type = UserTypes.User;
        this.profile = "";
        this.phoneNumber = "";
        this.email = "";
    }
}
