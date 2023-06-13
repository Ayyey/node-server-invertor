import SystemRecordModel from '../db/Sequelize';
import { Op, col } from 'sequelize';
import fs from 'fs'
import Excel from 'excel4node';
import * as XLSX from 'xlsx'
export default class {
    static async exportData(req, res) {
        console.log({ start: req.query.start, end: req.query.end })
        const start = new Date(req.query.start);
        const end = new Date(req.query.end);
        const queryResult = await SystemRecordModel.findAll({
            where: {
                timestamp: {
                    [Op.and]: {
                        [Op.gte]: start.toISOString(),
                        [Op.lte]: end.toISOString()
                    }
                }
            },
            order: [
                ['timestamp', 'DESC']
            ]
        });
        const wb = new Excel.Workbook();
        const ws = wb.addWorksheet('History Datas');
        //Headers
        ws.cell(1, 1).string('Device mode');
        ws.cell(1, 2).string('Time');
        ws.cell(1, 3).string('AC voltage');
        ws.cell(1, 4).string('AC frequency');
        ws.cell(1, 5).string('PV input voltage');
        ws.cell(1, 6).string('PV input power');
        ws.cell(1, 7).string('Output apparent power');
        ws.cell(1, 8).string('Output active power');
        ws.cell(1, 9).string('Battery voltage');
        ws.cell(1, 10).string('Battery capacity');
        ws.cell(1, 11).string('PV input current');
        ws.cell(1, 12).string('Battery discharge current');
        ws.cell(1, 13).string('Output voltage');
        ws.cell(1, 14).string('Output frequency');
        for (const [iter, row] of queryResult.entries()) {
            const i = iter + 2; //offset from the start
            row.dataValues.mode = 'B';
            row.dataValues.loadPercent = 30.0;
            row.dataValues.batteryDischargeCurrent = 1.0;
            ws.cell(i, 1).string(getModeString(row.dataValues.mode.toString()));
            ws.cell(i, 2).string(getTimeString(row.dataValues.timestamp));
            ws.cell(i, 3).string(row.dataValues.gridVoltage.toFixed(1) || '0');
            ws.cell(i, 4).string(row.dataValues.gridFreq.toFixed(1));
            ws.cell(i, 5).string(row.dataValues.solarVoltage.toFixed(1));
            ws.cell(i, 6).string(row.dataValues.loadPercent.toFixed(0));
            ws.cell(i, 7).string(row.dataValues.outputPowerApparent.toFixed(1));
            ws.cell(i, 8).string(row.dataValues.outputPowerActive.toFixed(1));
            ws.cell(i, 9).string(row.dataValues.batteryVoltage.toFixed(2));
            ws.cell(i, 10).string(row.dataValues.batteryCapacity.toFixed(0));
            ws.cell(i, 11).string(row.dataValues.solarCurrent.toFixed(1));
            ws.cell(i, 12).string(row.dataValues.batteryDischargeCurrent.toFixed(1));
            ws.cell(i, 13).string(row.dataValues.outputVoltage.toFixed(1));
            ws.cell(i, 14).string(row.dataValues.outputFreq.toFixed(1));
        }
        wb.writeToBuffer().then((buffer) => {
            res.send(buffer);
        });
    }
    static async importData(req, res) {
        const body = [];
        const parseXlsx = async (req, res, buffer) => {
            const file = buffer;
            const wb = XLSX.read(file);
            const sheetName = wb.SheetNames[0];
            console.log(sheetName)
            const sheet = wb.Sheets[sheetName];
            console.log(sheet);

            const range = XLSX.utils.decode_range(wb.Sheets[sheetName]['!ref'])
            let altColumnsNames;
            const promises = [];
            for (let rowIndex = range.s.r; rowIndex <= range.e.r; ++rowIndex) {
                const row = [];
                for (let columnIndex = range.s.c; columnIndex <= range.e.c; ++columnIndex) {
                    let cellAddr = { c: columnIndex, r: rowIndex };
                    let cellStr = XLSX.utils.encode_cell(cellAddr);
                    let cellRef = sheet[cellStr];
                    console.log(cellRef);
                    row.push(cellRef.v);
                }
                if (rowIndex == 0) {
                    altColumnsNames = mapAlternativeColumnNames(row);
                }
                else {
                    let rowValues = { timestamp: null };
                    for (const name in altColumnsNames) {
                        rowValues[name] = row[altColumnsNames[name]] // in brackets is index of value;
                    }
                    const promise = SystemRecordModel.create(rowValues);
                    promises.push(promise);
                }
            }
            await Promise.allSettled(promises);
            console.log('done!');
            res.status(200).end();
        }
        req.on('data', (chunk => {

            body.push(chunk);
        }))
        req.on('end', () => {
            console.log('done')
            parseXlsx(req, res, Buffer.concat(body));
        })
    }

}
function mapAlternativeColumnNames(row) { // map to index
    const result = {};
    for (const [index, name] of row.entries()) {
        let altName;
        switch (name) {
            case "Device mode": altName = "mode"; break;
            case "Time": altName = "timestamp"; break;
            case "AC voltage": altName = "gridVoltage"; break;
            case "AC frequency": altName = "gridFreq"; break;
            case "PV input voltage": altName = "solarVoltage"; break;
            case "PV input power": altName = "loadPercent"; break;
            case "Output apparent power": altName = "outputPowerApparent"; break;
            case "Output active power": altName = "outputPowerActive"; break;
            case "Battery voltage": altName = "batteryVoltage"; break;
            case "Battery capacity": altName = "batteryCapacity"; break;
            case "PV input current": altName = "solarCurrent"; break;
            case "Battery discharge current": altName = "batteryDischargeCurrent"; break;
            case "Output voltage": altName = "outputVoltage"; break;
            case "Output frequency": altName = "outputFreq"; break;
        }
        result[altName] = index;
    }
    return result;
}
function getModeString(char: string): string {
    switch (char) {
        case "P": return "Power on mode";
        case "S": return "Standby mode";
        case "L": return "Line mode";
        case "B": return "Battery mode";
        case "F": return "Fault mode";
        case "H": return "Power saving mode";
        default: return "error, couldn't get mode";
    }
}
function getTimeString(date: Date): string {
    let year, month, day, hour, min, sec;
    year = new Intl.DateTimeFormat('ru', { year: 'numeric' }).format(date);
    month = new Intl.DateTimeFormat('ru', { month: '2-digit' }).format(date);
    day = new Intl.DateTimeFormat('ru', { day: '2-digit' }).format(date);
    hour = new Intl.DateTimeFormat('ru', { hour: '2-digit' }).format(date);
    min = new Intl.DateTimeFormat('ru', { minute: '2-digit' }).format(date);
    sec = new Intl.DateTimeFormat('ru', { second: '2-digit' }).format(date);
    return `${year}-${month}-${day} ${hour}:${min.length == 2 ? min : '0' + min.toString()}:${sec}`

}