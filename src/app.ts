import winston from 'winston'
import config from './config/Config'
import  express from "express";
import  cors from "cors";
import  morgan from "morgan";
import {AppRouter} from './router/AppRouter'
var app = express();
var approuter = new AppRouter();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(approuter.router);

app.listen(config.MAIN_APP_PORT, function(){
    winston.info('Server is running and listening on port ' + config.MAIN_APP_PORT);
});