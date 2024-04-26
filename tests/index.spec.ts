import request from 'supertest';
import server from '../app';
//import app from '../app';

describe('Api Running test',()=>{
    let token = "";
    beforeAll(async ()=>{
        const res = await request(server).post('/api/account/test');
        token = res.body.data.token;
        //console.log(token);
        
    },0);    
    it('200',async ()=>{
        const res = await request(server).post('/api/get-status').send({firstName:"Waqas",lastName:"Ahmad"});
        //expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(200);
    })
    it('400',async ()=>{
        const res = await request(server).post('/api/get-status').send();
        //expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(400);
    })
    it('500',async ()=>{
        const res = await request(server).post('/api/account/test').send();
        //expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(200);
    });
    it('protected',async()=>{
        //console.log(token);
        const res = await request(server).post('/api/account/protected').set('Authorization',token).send({});
        expect(res.body.status).toBe(500);
        //console.log(res.body.data);
    })
})
