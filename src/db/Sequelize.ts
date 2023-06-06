import { Sequelize, DataTypes, Model } from 'sequelize';
import { SystemRecord } from '../models/SystemRecord';
import appconfig from '../../appconfig.json';
const db = appconfig.db;

const sequelize = new Sequelize(
    `postgres://${db.user}:${db.password}@${db.host}:5432/${db.database}`,
    {logging: console.log, omitNull: true}
);

class SystemRecordModel extends Model<SystemRecord> {}

SystemRecordModel.init({
    id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    timeStamp: DataTypes.DATE,

    gridVoltage: {type: DataTypes.FLOAT, allowNull: true},
    gridFreq: {type: DataTypes.FLOAT, allowNull: true},
    outputVoltage: {type: DataTypes.FLOAT, allowNull: true},
    outputFreq: {type: DataTypes.FLOAT, allowNull: true},
    outputPowerApparent: {type: DataTypes.FLOAT, allowNull: true},
    outputPowerActive: {type: DataTypes.FLOAT, allowNull: true},
    loadPercent: {type: DataTypes.FLOAT, allowNull: true},
    busVoltage: {type: DataTypes.FLOAT, allowNull: true},
    batteryVoltage: {type: DataTypes.FLOAT, allowNull: true},
    batteryCurrent: {type: DataTypes.FLOAT, allowNull: true},
    batteryCapacity: {type: DataTypes.FLOAT, allowNull: true},
    temperature: {type: DataTypes.FLOAT, allowNull: true},
    solarCurrent: {type: DataTypes.FLOAT, allowNull: true},
    solarVoltage: {type: DataTypes.FLOAT, allowNull: true},
    batteryVoltageSCC: {type: DataTypes.FLOAT, allowNull: true},
    batteryDischargeCurrent: {type: DataTypes.FLOAT, allowNull: true},

    //Warnings
    inverterFault: {type: DataTypes.BOOLEAN, allowNull:true},
    busOver: {type: DataTypes.BOOLEAN, allowNull:true},
    busUnder: {type: DataTypes.BOOLEAN, allowNull:true},
    busOftFail: {type: DataTypes.BOOLEAN, allowNull:true},
    lineFail: {type: DataTypes.BOOLEAN, allowNull:true},
    OPVShort: {type: DataTypes.BOOLEAN, allowNull:true},
    InverterVoltageTooLow: {type: DataTypes.BOOLEAN, allowNull:true},
    inverterVoltageTooHigh: {type: DataTypes.BOOLEAN, allowNull:true},
    overTemperature: {type: DataTypes.BOOLEAN, allowNull:true},
    FanLocked: {type: DataTypes.BOOLEAN, allowNull:true},
    BatteryVoltageHigh: {type: DataTypes.BOOLEAN, allowNull:true},
    BatteryLowAlarm: {type: DataTypes.BOOLEAN, allowNull:true},
    BatteryUnderShutdown: {type: DataTypes.BOOLEAN, allowNull:true},
    Overload: {type: DataTypes.BOOLEAN, allowNull:true},
    EEPROMFault: {type: DataTypes.BOOLEAN, allowNull:true},
    InverterOverCurrent: {type: DataTypes.BOOLEAN, allowNull:true},
    InvertSoftFail: {type: DataTypes.BOOLEAN, allowNull:true},
    SelfTestFail: {type: DataTypes.BOOLEAN, allowNull:true},
    OPDCVoltageOver: {type: DataTypes.BOOLEAN, allowNull:true},
    BatteryOpen: {type: DataTypes.BOOLEAN, allowNull:true},
    CurrentSensorFail: {type: DataTypes.BOOLEAN, allowNull:true},
    BatteryShort: {type: DataTypes.BOOLEAN, allowNull:true},
    PowerLimit: {type: DataTypes.BOOLEAN, allowNull:true},
    PVVoltageHigh: {type: DataTypes.BOOLEAN, allowNull:true},
    MPPTOverloadFault: {type: DataTypes.BOOLEAN, allowNull:true},
    MPTOverloadWarning: {type: DataTypes.BOOLEAN, allowNull:true},
    BatteryTooLowToCharge: {type: DataTypes.BOOLEAN, allowNull:true},

    //status
    ACCharging: {type: DataTypes.BOOLEAN, allowNull:true},
    SCCCharging: {type: DataTypes.BOOLEAN, allowNull:true},
    LoadStatus: {type: DataTypes.BOOLEAN, allowNull:true},
    SSCVersion: {type: DataTypes.BOOLEAN, allowNull:true},
    Config: {type: DataTypes.BOOLEAN, allowNull:true},

}, {sequelize, tableName: "SystemRecord"})
SystemRecordModel.sync();
export default SystemRecordModel;