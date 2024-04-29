import request from 'supertest';
import server from '../app';
//import app from '../app';

describe('Api Running test',()=>{
    let token = "";
    beforeAll(async ()=>{
        const res = await request(server).post('/api/account/login');
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
        const res = await request(server).post('/api/account/login').send();
        //expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(200);
    });
    it('protected',async()=>{
        //console.log(token);
        const res = await request(server).post('/api/account/protected').set('Authorization',token).send({});
        expect(res.body.status).toBe(500);
        //console.log(res.body.data);
    })
    it('protected bearer token',async()=>{
        //console.log(token);
        const res = await request(server).post('/api/account/protected').set('Authorization',"Bearer "+token).send({});
        expect(res.body.status).toBe(500);
        //console.log(res.body.data);
    })
    it('protected bearer token any',async()=>{
        //console.log(token);
        const res = await request(server).post('/api/account/protectedany').set('Authorization',"Bearer "+token).send({});
        expect(res.body.status).toBe(500);
        //console.log(res.body.data);
    })
    it('protected bearer token protecteduser',async()=>{
        //console.log(token);
        const res = await request(server).post('/api/account/protecteduser').set('Authorization',"Bearer "+token).send({});
        expect(res.body.status).toBe(401);
        //console.log(res.body.data);
    })
    it('protected bearer token error',async()=>{
        //console.log(token);
        const res = await request(server).post('/api/account/protectedany').set('Authorization',"Bearer sdafhkjsdahfkjsadhjk").send({});
        expect(res.body.status).toBe(401);
        //console.log(res.body.data);
    })
    it('Should be unauthorized',async()=>{
        //console.log(token);
        const res = await request(server).post('/api/account/protected').send({});
        expect(res.body.status).toBe(401);
        //console.log(res.body.data);
    })
    it('Should be not found',async()=>{
        //console.log(token);
        const res = await request(server).get('/api/account/notfound').send({});
        expect(res.body.status).toBe(404);
        //console.log(res.body.data);
    })
})
