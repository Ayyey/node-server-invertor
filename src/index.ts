import fs from 'fs';
import express from 'express';
import https from 'https'
import http from 'http'
import SystemRecordRouter from './routers/SystemRecordsRouter';
import ExportRouter from './routers/ExportRouter';;
import cors from 'cors'
const options = {
    key: fs.readFileSync('privatekey.pem'),
    cert: fs.readFileSync('publickey.pem'),
}
const app = express();
app.use(cors());
app.use(ExportRouter);
app.use(SystemRecordRouter);
app.get('/', (req, res) => {
    res.send('succes');
})

const server = http.createServer(app);
server.listen(8000, () => {
    console.log('server is started')
    //loadTestData();
});