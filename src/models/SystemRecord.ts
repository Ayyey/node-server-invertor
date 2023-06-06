
export type SystemRecord = {
    id: number;
    timeStamp : number;
    
    gridVoltage : number;
    gridFreq : number;
    outputVoltage : number;
    outputFreq : number;
    outputPowerApparent : number;
    outputPowerActive : number;
    loadPercent : number;
    busVoltage : number;
    batteryVoltage : number;
    batteryCurrent : number;
    batteryCapacity : number;
    temperature : number;
    solarCurrent : number;
    solarVoltage : number;
    batteryVoltageSCC : number;
    batteryDischargeCurrent : number;
    //warnings
    inverterFault : boolean;
    busOver : boolean;
    busUnder : boolean;
    busOftFail : boolean;
    lineFail : boolean;
    OPVShort : boolean;
    InverterVoltageTooLow : boolean;
    inverterVoltageTooHigh : boolean;
    overTemperature : boolean;
    FanLocked : boolean;
    BatteryVoltageHigh : boolean;
    BatteryLowAlarm : boolean;
    BatteryUnderShutdown : boolean;
    Overload : boolean;
    EEPROMFault : boolean;
    InverterOverCurrent : boolean;
    InvertSoftFail : boolean;
    SelfTestFail : boolean;
    OPDCVoltageOver : boolean;
    BatteryOpen : boolean;
    CurrentSensorFail : boolean;
    BatteryShort : boolean;
    PowerLimit : boolean;
    PVVoltageHigh : boolean;
    MPPTOverloadFault : boolean;
    MPTOverloadWarning : boolean;
    BatteryTooLowToCharge : boolean;
    //status bits
    ACCharging : boolean;
    SCCCharging : boolean;
    LoadStatus : boolean;
    SSCVersion : boolean;
    Config : boolean;
};