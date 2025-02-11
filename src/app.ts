import express, { Request, Response,NextFunction } from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import NotFound from './middlewares/NotFound';
import router from './routes/main';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'] }));
app.use(cookieParser());

//test route
const test=async(req:Request,res:Response)=>{
  const sayHi="Hi~! Jakuan";
  res.send(sayHi);
 
}

app.get('/', test);

//application routes
app.use('/api/v1',router);


//gloabal err handler
app.use(globalErrorHandler)

//Not Found Route
app.use(NotFound);


export default app;
