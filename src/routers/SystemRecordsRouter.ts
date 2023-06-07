import { Router } from "express";
import { SystemRecordController } from "../controllers/SystemRecordController";
import bodyParser from "body-parser";
const SystemRecordRouter = Router();
SystemRecordRouter.use(bodyParser.json());
SystemRecordRouter.use(bodyParser.urlencoded({extended:true}));
SystemRecordRouter.post('/data', SystemRecordController.addRecord);
SystemRecordRouter.get('/data', SystemRecordController.getRecords);
SystemRecordRouter.get('/pivo', (req, res) => {
    res.send('pivo!!!!');
})
export default SystemRecordRouter;