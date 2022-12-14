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

    it('GET /todos/:id --> speciftc todo', () =>{
        return request(app)
            .get('/todos/1')
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

    it('GET /todos/id --> 400 invalid type', () =>{
        return request(app)
        .get('/todos/as')
        .expect('Content-Type', /json/)
        .expect(400)
        .then((response => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    msg: expect.any(String),
                })
            )
        }))
    });

    it('GET /todos/id --> 404 not found invalid id', () =>{
        return request(app)
        .get('/todos/999999')
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    msg: expect.any(String),
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
                })
            )
        })
    });

    it('PUT /todos/:id --> ATT a todo as comleted/imcomplet', () =>{
        return request(app)
        .put('/todos/1')
        .send({completed: true})
        .expect(200)
        .then(response =>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    id: 1,
                    name: expect.any(String),
                    completed: true,
                })
            )
        })
    })


    it('DEL /todos/:id --> DEL a todo', () =>{
        return request(app)
        .delete('/todos/3')
        .expect(200)
        .then(response =>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    id: 3,
                    name: expect.any(String),
                    completed: expect.any(Boolean),
                })
            )
        })
    })

    it('DEL /todos/:id --> Try to del a invalid todo', () =>{
        return request(app)
        .delete('/todos/999999')
        .expect(404)
        .then(response =>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    msg: expect.any(String)
                })
            )
        })
    })
});
