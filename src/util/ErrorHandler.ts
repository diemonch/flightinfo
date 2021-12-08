import winston from "winston";

export const errorHandler =  async  (error:any) => {

    if (!error.handled) {
        if (error.timedout) {
            winston.error("TIMEDOUT", error.timedout);
        } else {
            winston.error("Request Fail !", error.message);
            error.handled = true;
            throw error;
        }
    } 
};


