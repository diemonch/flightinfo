import dotenv from 'dotenv';
import { resolve } from 'path';
import { env } from 'process';
dotenv.config({ path: resolve(__dirname, "../../.env") });

interface Config{

        MAIN_APP_PORT:number;
        API_USERNAME:string;
        API_PASSWORD:string;
        API_ENDPOINT1:string;
        API_ENDPOINT2:string;
        REDIS_BUFFER_TIME:number;
       
        

}
interface ENV{

    MAIN_APP_PORT:number|undefined;
    API_USERNAME:string|undefined;
    API_PASSWORD:string|undefined;
    API_ENDPOINT1:string|undefined;
    API_ENDPOINT2:string|undefined;
    REDIS_BUFFER_TIME:number|undefined;
    
   


}

const getConfig = (): ENV => {
    return {
      MAIN_APP_PORT: process.env.MAIN_APP_PORT ? Number(process.env.MAIN_APP_PORT):undefined,
      API_USERNAME:process.env.API_USERNAME?String(process.env.API_USERNAME):undefined,
      API_PASSWORD:process.env.API_PASSWORD?String(process.env.API_PASSWORD):undefined,
      API_ENDPOINT1:process.env.API_PASSWORD?String(process.env.API_ENDPOINT1):undefined,
      API_ENDPOINT2:process.env.API_PASSWORD?String(process.env.API_ENDPOINT2):undefined,
      REDIS_BUFFER_TIME:process.env.API_PASSWORD?Number(process.env.REDIS_BUFFER_TIME):undefined
      
      
    };
  };

  const getRefinedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
      if (value === undefined) {
        throw new Error(`Missing key ${key} in config.env`);
      }
    }
    return config as Config;
  };
  
  const config = getConfig();
  
  const certifiedConfig = getRefinedConfig(config);
  
  export default certifiedConfig;