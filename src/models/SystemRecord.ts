
export type SystemRecord = {
    id: number;
    timestamp: Date;

    mode: string;

    gridVoltage: number;
    gridFreq: number;
    outputVoltage: number;
    outputFreq: number;
    outputPowerApparent: number;
    outputPowerActive: number;
    loadPercent: number;
    busVoltage: number;
    batteryVoltage: number;
    batteryCurrent: number;
    batteryCapacity: number;
    temperature: number;
    solarCurrent: number;
    solarVoltage: number;
    batteryVoltageSCC: number;
    batteryDischargeCurrent: number;

    //warnings
    inverterFault: boolean;
    busOver: boolean;
    busUnder: boolean;
    busSoftFail: boolean;
    lineFail: boolean;
    OPVShort: boolean;
    inverterVoltageTooLow: boolean;
    inverterVoltageTooHigh: boolean;
    overTemp: boolean;
    fanLocked: boolean;
    batteryVoltageHigh: boolean;
    batteryLowAlarm: boolean;
    batteryUnderShutdown: boolean;
    overload: boolean;
    EEPROMFault: boolean;
    inverterOverCurrent: boolean;
    invertSoftFail: boolean;
    selfTestFail: boolean;
    OPDCVoltageOver: boolean;
    batteryOpen: boolean;
    currentSensorFail: boolean;
    batteryShort: boolean;
    powerLimit: boolean;
    PVVoltageHigh: boolean;
    MPPTOverloadFault: boolean;
    MPPTOverloadWarning: boolean;
    batteryTooLowToCharge: boolean;

    //status bits
    ACCharging: boolean;
    SCCCharging: boolean;
    chargingStatus: boolean;
    loadStatus: boolean;
    SCCVersionUpdated: boolean;
    configurationChanged: boolean;
};