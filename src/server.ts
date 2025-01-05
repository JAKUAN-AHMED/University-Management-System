import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { Server } from 'http';

let server:Server;
async function main() {
  try {
   
    await mongoose.connect(config.db_url as string);
    server=app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

// Call main function to start everything
main();
process.on('unhandledRejection',()=>{
  console.log(`☠️   ,    unhadledRejectin is detected,shutting down the server...`);
  if(server)
  {
    server.close(()=>{
      process.exit(1);
    })
  }
  process.exit(1);
})
process.on('uncaughtException',()=>{
  console.log(
    `☠️   ,    uncaughtException is detected,shutting down the server...`,
  );
  process.exit(1);
})
