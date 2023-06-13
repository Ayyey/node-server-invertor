import SystemRecordModel from "../db/Sequelize"
import { SystemRecord } from "../models/SystemRecord"
import { Op } from "sequelize";
export class SystemRecordController {
    public static async addRecord(req, res) {
        const record: SystemRecord = req.body;
        console.log("adding record");
        await SystemRecordModel.create(record);
        res.status(202).send({ isSuccess: true });
    }
    public static async getRecords(req, res) {
        const start: Date = new Date(req.query.start);
        const end: Date = new Date(req.query.end);
        console.log({
            start: {
                str: req.query.start,
                date: start
            },
            end: {
                str: req.query.end,
                date: end
            }
        })
        const queryResult = await SystemRecordModel.findAll(
            {
                where: {
                    timestamp: {
                        [Op.and]: {
                            [Op.gte]: start.toISOString(),
                            [Op.lte]: end.toISOString()
                        }
                    }
                }
            }
        ); //
        const result = queryResult.map((value) => { return value.dataValues });
        res.send(result);
    }
}