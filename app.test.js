const { response } = require('express');
const request = require('supertest');
const app = require('./app');

describe('Todos API', ()=>{
    it('GET /todos --> array todos', () =>{
        return request(app)
            .get('/todos')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) =>{
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            name: expect.any(String),
                            completed: expect.any(Boolean),
                        }),
                    ])
                )
            })
    });

    it('GET /todos/id --> speciftc todo', () =>{
        return request(app)
            .get('/todo/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        completed: expect.any(Boolean),
                    })
                )
            }))
    });

    it('GET /todos/id --> 404 not found', () =>{
        return request(app)
        .get('/todo/as')
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    msg: expect.any(String),
                    completed: expect.any(Boolean),
                })
            )
        }))
    });

    it('POST /todos --> creat todo', ()=>{
        return request(app)
            .post('/todos')
            .send({name: 'tirar o lixo'})
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        name: 'tirar o lixo',
                        completed: expect.any(Boolean),
                    })
                )
            }))
    });

    it('GET /todos --> Validate request body', () =>{
        return request(app)
        .post('/todos')
        .send({name: 123})
        .expect(422)
        .then(response =>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    msg: expect.any(String),
                    completed: expect.any(Boolean),
                })
            )
        })
    });
});