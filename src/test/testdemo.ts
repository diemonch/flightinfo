import { expect } from 'chai';
import request from 'supertest';
const app ="http://localhost:3000"


describe('To test if the endpoint is available' , ()=>{
   
    const hasDuplication = function(array: any[]) {

         return array.map(function(value) {
          return value.flight_number + value.arrival_date_time_utc
      
        }).some(function(value, index, array) { 
             return array.indexOf(value) !== array.lastIndexOf(value);  
           })
      }

    it('Get uniuqe flight values',async ()=>{
      
         const response = await request(app).get('/app').send()
         const data:[] = JSON.parse(response.text)
         expect(hasDuplication(data)).to.be.false
    })
})

