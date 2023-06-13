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
    busSoftFail: { type: DataTypes.BOOLEAN, allowNull: true },
    lineFail: { type: DataTypes.BOOLEAN, allowNull: true },
    OPVShort: { type: DataTypes.BOOLEAN, allowNull: true },
    inverterVoltageTooLow: { type: DataTypes.BOOLEAN, allowNull: true },
    inverterVoltageTooHigh: { type: DataTypes.BOOLEAN, allowNull: true },
    overTemp: { type: DataTypes.BOOLEAN, allowNull: true },
    fanLocked: { type: DataTypes.BOOLEAN, allowNull: true },
    batteryVoltageHigh: { type: DataTypes.BOOLEAN, allowNull: true },
    batteryLowAlarm: { type: DataTypes.BOOLEAN, allowNull: true },
    batteryUnderShutdown: { type: DataTypes.BOOLEAN, allowNull: true },
    overload: { type: DataTypes.BOOLEAN, allowNull: true },
    EEPROMFault: { type: DataTypes.BOOLEAN, allowNull: true },
    inverterOverCurrent: { type: DataTypes.BOOLEAN, allowNull: true },
    invertSoftFail: { type: DataTypes.BOOLEAN, allowNull: true },
    selfTestFail: { type: DataTypes.BOOLEAN, allowNull: true },
    OPDCVoltageOver: { type: DataTypes.BOOLEAN, allowNull: true },
    batteryOpen: { type: DataTypes.BOOLEAN, allowNull: true },
    currentSensorFail: { type: DataTypes.BOOLEAN, allowNull: true },
    batteryShort: { type: DataTypes.BOOLEAN, allowNull: true },
    powerLimit: { type: DataTypes.BOOLEAN, allowNull: true },
    PVVoltageHigh: { type: DataTypes.BOOLEAN, allowNull: true },
    MPPTOverloadFault: { type: DataTypes.BOOLEAN, allowNull: true },
    MPPTOverloadWarning: { type: DataTypes.BOOLEAN, allowNull: true },
    batteryTooLowToCharge: { type: DataTypes.BOOLEAN, allowNull: true },

    //status
    ACCharging: { type: DataTypes.BOOLEAN, allowNull: true },
    SCCCharging: { type: DataTypes.BOOLEAN, allowNull: true },
    loadStatus: { type: DataTypes.BOOLEAN, allowNull: true },
    chargingStatus: { type: DataTypes.BOOLEAN, allowNull: true },
    SCCVersionUpdated: { type: DataTypes.BOOLEAN, allowNull: true },
    configurationChanged: { type: DataTypes.BOOLEAN, allowNull: true },

    mode: { type: DataTypes.CHAR, allowNull: true },

}, {
    sequelize,
    tableName: "SystemRecord",
    timestamps: false
})
SystemRecordModel.sync({ alter: true });
export default SystemRecordModel;