import { Sequelize, DataTypes, Model } from 'sequelize';
import { SystemRecord } from '../models/SystemRecord';
import appconfig from '../../appconfig.json';
const db = appconfig.db;

const sequelize = new Sequelize(
    `postgres://${db.user}:${db.password}@${db.host}:5432/${db.database}`,
    { logging: false, omitNull: true }
);

class SystemRecordModel extends Model<SystemRecord> { }

SystemRecordModel.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    timestamp: DataTypes.DATE,

    gridVoltage: { type: DataTypes.REAL, allowNull: true },
    gridFreq: { type: DataTypes.REAL, allowNull: true },
    outputVoltage: { type: DataTypes.REAL, allowNull: true },
    outputFreq: { type: DataTypes.REAL, allowNull: true },
    outputPowerApparent: { type: DataTypes.REAL, allowNull: true },
    outputPowerActive: { type: DataTypes.REAL, allowNull: true },
    loadPercent: { type: DataTypes.REAL, allowNull: true },
    busVoltage: { type: DataTypes.REAL, allowNull: true },
    batteryVoltage: { type: DataTypes.REAL, allowNull: true },
    batteryCurrent: { type: DataTypes.REAL, allowNull: true },
    batteryCapacity: { type: DataTypes.REAL, allowNull: true },
    temperature: { type: DataTypes.REAL, allowNull: true },
    solarCurrent: { type: DataTypes.REAL, allowNull: true },
    solarVoltage: { type: DataTypes.REAL, allowNull: true },
    batteryVoltageSCC: { type: DataTypes.REAL, allowNull: true },
    batteryDischargeCurrent: { type: DataTypes.REAL, allowNull: true },

    //Warnings
    inverterFault: { type: DataTypes.BOOLEAN, allowNull: true },
    busOver: { type: DataTypes.BOOLEAN, allowNull: true },
    busUnder: { type: DataTypes.BOOLEAN, allowNull: true },
    busOftFail: { type: DataTypes.BOOLEAN, allowNull: true },
    lineFail: { type: DataTypes.BOOLEAN, allowNull: true },
    OPVShort: { type: DataTypes.BOOLEAN, allowNull: true },
    InverterVoltageTooLow: { type: DataTypes.BOOLEAN, allowNull: true },
    inverterVoltageTooHigh: { type: DataTypes.BOOLEAN, allowNull: true },
    overTemperature: { type: DataTypes.BOOLEAN, allowNull: true },
    FanLocked: { type: DataTypes.BOOLEAN, allowNull: true },
    BatteryVoltageHigh: { type: DataTypes.BOOLEAN, allowNull: true },
    BatteryLowAlarm: { type: DataTypes.BOOLEAN, allowNull: true },
    BatteryUnderShutdown: { type: DataTypes.BOOLEAN, allowNull: true },
    Overload: { type: DataTypes.BOOLEAN, allowNull: true },
    EEPROMFault: { type: DataTypes.BOOLEAN, allowNull: true },
    InverterOverCurrent: { type: DataTypes.BOOLEAN, allowNull: true },
    InvertSoftFail: { type: DataTypes.BOOLEAN, allowNull: true },
    SelfTestFail: { type: DataTypes.BOOLEAN, allowNull: true },
    OPDCVoltageOver: { type: DataTypes.BOOLEAN, allowNull: true },
    BatteryOpen: { type: DataTypes.BOOLEAN, allowNull: true },
    CurrentSensorFail: { type: DataTypes.BOOLEAN, allowNull: true },
    BatteryShort: { type: DataTypes.BOOLEAN, allowNull: true },
    PowerLimit: { type: DataTypes.BOOLEAN, allowNull: true },
    PVVoltageHigh: { type: DataTypes.BOOLEAN, allowNull: true },
    MPPTOverloadFault: { type: DataTypes.BOOLEAN, allowNull: true },
    MPTOverloadWarning: { type: DataTypes.BOOLEAN, allowNull: true },
    BatteryTooLowToCharge: { type: DataTypes.BOOLEAN, allowNull: true },

    //status
    ACCharging: { type: DataTypes.BOOLEAN, allowNull: true },
    SCCCharging: { type: DataTypes.BOOLEAN, allowNull: true },
    LoadStatus: { type: DataTypes.BOOLEAN, allowNull: true },
    SSCVersion: { type: DataTypes.BOOLEAN, allowNull: true },
    Config: { type: DataTypes.BOOLEAN, allowNull: true },

}, {
    sequelize,
    tableName: "SystemRecord",
    timestamps: false
})
SystemRecordModel.sync({ alter: true });
export default SystemRecordModel;