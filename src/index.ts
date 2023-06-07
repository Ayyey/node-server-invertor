import fs from 'fs';
import express from 'express';
import https from 'https'
import SystemRecordRouter from './routers/SystemRecordsRouter';
import bodyParser from "body-parser";
const options = {
    key: fs.readFileSync('privatekey.pem'),
    cert: fs.readFileSync('publickey.pem'),
}
const app = express();
app.use(SystemRecordRouter);
app.get('/', (req, res) => {
    res.send('succes');
})

const server = https.createServer(options, app);
server.listen(8000, () => {
    console.log('server is started')
});

