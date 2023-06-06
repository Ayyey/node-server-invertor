import fs from 'fs';
import { SystemRecordController } from './controllers/SystemRecordController';
const options = {
    key: fs.readFileSync('privatekey.pem'),
    cert: fs.readFileSync('publickey.pem'),
}
async function pivo(){
    await SystemRecordController.addRecord({gridVoltage:50}).catch((err)=>{console.log(err)});
}
pivo();
