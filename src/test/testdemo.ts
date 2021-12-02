import { expect } from 'chai';
import request from 'supertest';
const app ="http://localhost:3000"

describe('To test if the endpoint is available' , ()=>{
   
    it('Get uniuqe flight calues',async ()=>{
        const response = await request(app).get('/app').send()
        .then((response: any) =>{
            return response;
        })
        expect(response.status).to.equal(200);
    })
})

