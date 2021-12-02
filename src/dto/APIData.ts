import winston from 'winston';
import * as FlightInterface from '../interface/FlightResponse'

export class APIData {
    flights!: FlightInterface.Flight[];
    
    public getUniqueFlights = async(sourceonedata:APIData,sourcetwodata:APIData) =>{
        
        try{
            
            Array.prototype.push.apply(sourceonedata.flights,sourcetwodata.flights)
            let slice = sourceonedata.flights.flatMap(s => s.slices)
            let finalresult= slice.filter((v,i,a)=>a.findIndex(t=>(t.flight_number === v.flight_number && t.arrival_date_time_utc===v.arrival_date_time_utc))===i)
            return finalresult

        }catch(err){
            winston.error("Issue with DTO / Data sources");
            
            return err
        }
       
    }

}


