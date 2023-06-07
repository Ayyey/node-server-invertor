import SystemRecordModel from "../db/Sequelize"
import { SystemRecord } from "../models/SystemRecord"
import https from 'https'
export class SystemRecordController {
    public static async addRecord(req, res) {
        const record: SystemRecord = req.body;
        console.log("adding record");
        console.log(req.body);
        await SystemRecordModel.create(record);
        res.status(202).send({ isSucces: true });
    }
    public static async getRecords(req, res): Promise<Array<SystemRecord>> {
        const start: Date = new Date(req.query.start);
        const end: Date = new Date(req.query.end);
        console.log('data request');
        const queryResult = await SystemRecordModel.findAll(
            { where: { timestamp: { gte: start.toISOString(), lte: end.toISOString() } } }
        ); //
        const result = queryResult.map((value) => { return value.dataValues });
        return result;
    }
}