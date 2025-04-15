import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/public.routes';
import privateRoutes from './routes/private.routes';
import requestLogger from './lib/RequestLogger';
import noRouteMatch from './lib/NoPathMatch';
import globalErrorHandler from './lib/globalErrorHandler';
import { env } from './config/env';
import cors from 'cors';

const app = express();

mongoose.set('strictQuery', true);
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());
app.use(requestLogger);

app.use('/api/auth', authRoutes);
app.use('/api', privateRoutes);
app.use(noRouteMatch);
app.use(globalErrorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log('DB Connection successful');

    app.listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to Database: ', err);
    process.exit(1);
  }
};

startServer();
