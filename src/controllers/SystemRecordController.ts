import SystemRecordModel from "../db/Sequelize"
import { SystemRecord } from "../models/SystemRecord"
export class SystemRecordController {
    public static async addRecord(record: any) : Promise<SystemRecord>{
       const res = await SystemRecordModel.create(record);
       return res.dataValues;
    }
    public static async getRecords(start : Date, end : Date) : Promise<Array<SystemRecord>>{
        const res = await SystemRecordModel.findAll(); //{where:{timeStamp: {gte:start.toISOString(), lte:end.toISOString()}}}
        const result = res.map((value)=>{return value.dataValues});
        return result;
    }
}