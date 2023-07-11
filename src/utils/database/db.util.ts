import { Connection, createConnection, FieldInfo, MysqlError } from 'mysql';
import { LogData } from '../logs/error.logs';
export default class DbUtil {
    private connection: Connection;
    constructor() {
        this.connection = createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            debug:Boolean(process.env.DB_DEBUG || false),
            typeCast: function (field, useDefaultTypeCasting) {
                // We only want to cast bit fields that have a single-bit in them. If the field
                // has more than one bit, then we cannot assume it is supposed to be a Boolean.
                if ((field.type === "BIT") && (field.length >= 1)) {

                    var bytes = field.buffer();

                    // A Buffer in Node represents a collection of 8-bit unsigned integers.
                    // Therefore, our single "bit field" comes back as the bits '0000 0001',
                    // which is equivalent to the number 1.
                    if (!bytes) return false;
                    return (bytes[0] === 1);

                }

                return (useDefaultTypeCasting());
            }
        })
    }
    private executeSQL(type:string,query: string, data: any = [],isSp:boolean =false): Promise<{success:boolean,data:any,fields:any}> {
        return new Promise((resolve, reject) => {
            this.connection.query(query, data, (error, result,fields) => {
                if (error) {
                    LogData(error);
                    reject(error);
                } else {
                    if(type=="SELECT"){
                        if(isSp){
                            return resolve({success:true,data:result[0],fields:fields});
                        }
                    }
                    resolve({success:true,data:result,fields:null});
                }
            });
        })
    }
    mysqlExecute = async (query:string,data:any[],isSp:boolean = true):Promise<{success:boolean,data:any}>=>{
        return await this.executeSQL("EXECUTE",query,data,isSp);
    }
    mysqlSelect = async (q:string,data:any[]=[],isSp=true):Promise<{success:boolean,data:any}>=>{
        return await this.executeSQL("SELECT",q,data,isSp);
    }
    mysqlSelectSingle = async (q:string,data:any[]=[],isSp=true):Promise<{success:boolean,data:any}>=>{
        const result =await this.executeSQL("SELECT",q,data,isSp);
        if(result.success == true){
            result.data = result.data?.length>0 ? result.data[0] : null;
        }
        result.success = result.data != null;
        return result;
    }
}