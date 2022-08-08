'use strict';

const jestOpenAPI = require('jest-openapi').default
const request = require('supertest')
const path = require('path')
const config      = require("../src/javascript/util/yaml-config.js")("config.yml")

jestOpenAPI(path.join(__dirname, '../oas.yaml'))
let app = require( '../src/javascript' )

describe('Тести для шляху "/node"', () => {

    const data = {
        token: config.service.token,
        instance: config.service.instance,
        uri: config.service.usePort ? `http://${config.service.host}:${config.service.port}` : `http://${config.service.host}`
    }

    describe('Реєстрація ноди', () => {

        test('Повинен зареєструвати ноди, код відповіді - 200', async () => {
            let res = await request(app).post("/node/register")
                .send(data)
                .set("Content-Type","application/json; charset=utf-8")
            expect(res.status).toEqual(200)
            expect(res).toSatisfyApiSpec()
        })

        test('Невизначені дані, код відповіді - 400', async () => {
            let res = await request(app).post("/node/register")
                .set("Content-Type","application/json; charset=utf-8")
            expect(res.status).toEqual(400)
        })

        test('Невірний токен, код відповіді - 400', async () => {
            let res = await request(app).post("/node/register")
                .send({token: "", instance: data.instance, uri: data.uri})
                .set("Content-Type","application/json; charset=utf-8")
            expect(res.status).toEqual(400)
        })

    })

    describe('Перевірка статуса ноди', () => {

        test('Повинен вернути інформація про ноду, код відповіді - 200', async () => {
            let res = await request(app).get(`/node/state/${data.instance}`)
            expect(res.status).toEqual(200)
            expect(res).toSatisfyApiSpec()
        })
        test('Ідентифікатор ноди відсутній, код відповіді - 404', async () => {
            let res = await request(app).get(`/node/state`)
            expect(res.status).toEqual(404)
        })
        test('Невірний ідентифікатор ноди, код відповіді - 400', async () => {
            let res = await request(app).get(`/node/state/${data.instance}ffff`)
            expect(res.status).toEqual(400)
        })

    })

    describe('Перевірка деплоя ноди', () =>{
        test('Ідентифікатор ноди відсутній, код відповіді - 404', async () => {
            let res = await request(app).post(`/node/deploy`)
            expect(res.status).toEqual(404)
        })
        test('Невірний ідентифікатор ноди, код відповіді - 200', async () => {
            let res = await request(app).post(`/node/deploy/${data.instance}ffff`)
            expect(res.status).toEqual(200)
        })
    })

    describe('Перевірка вивантаження ноди', () =>{
        test('Ідентифікатор ноди відсутній, код відповіді - 404', async () => {
            let res = await request(app).post(`/node/undeploy`)
            expect(res.status).toEqual(404)
        })
        test('Невірний ідентифікатор ноди, код відповіді - 400', async () => {
            let res = await request(app).post(`/node/undeploy/${data.instance}ffff`)
            expect(res.status).toEqual(400)
        })
    })

    describe('Запуск мікросервісу на ноді', () =>{
        test('Ідентифікатор ноди відсутній, код відповіді - 404', async () => {
            let res = await request(app).post(`/ms/start`)
            expect(res.status).toEqual(404)
        })
        test('Невірний ідентифікатор ноди, код відповіді - 400', async () => {
            let res = await request(app).post(`/ms/start/${data.instance}ffff`)
            expect(res.status).toEqual(400)
        })
    })

    describe('Налаштування мікросервісу на ноді', () =>{
        test('Ідентифікатор ноди відсутній, код відповіді - 404', async () => {
            let res = await request(app).post(`/ms/config`)
            expect(res.status).toEqual(404)
        })
        test('Невірний ідентифікатор ноди, код відповіді - 400', async () => {
            let res = await request(app).post(`/ms/config/${data.instance}ffff`)
            expect(res.status).toEqual(400)
        })
    })

    describe('Вивантеження мікросервісу на ноді', () =>{
        test('Ідентифікатор ноди відсутній, код відповіді - 404', async () => {
            let res = await request(app).post(`/ms/terminate`)
            expect(res.status).toEqual(404)
        })
        test('Невірний ідентифікатор ноди, код відповіді - 200', async () => {
            let res = await request(app).post(`/ms/terminate/${data.instance}ffff`)
            expect(res.status).toEqual(200)
        })
    })

    describe('Отримання метрик ноди', () => {
        test('Невірний ідентифікатор ноди, код відповіді - 400', async () => {
            let res = await request(app).get(`/ms/metrics/${data.instance}ffff`)
            expect(res.status).toEqual(400)
        })
    })

    describe('Скасувати реєстрацію ноди', () => {
        test('Повинен скасувати реєстрацію ноди, код відповіді - 200', async () => {
            let res = await request(app).post("/node/unregister")
                .send(data)
                .set("Content-Type","application/json; charset=utf-8")
            expect(res.status).toEqual(200)
            expect(res).toSatisfyApiSpec()
        })

        test('Невизначені дані, код відповіді - 400', async () => {
            let res = await request(app).post("/node/unregister")
                .set("Content-Type","application/json; charset=utf-8")
            expect(res.status).toEqual(400)
        })

        test('Невірний токен, код відповіді - 400', async () => {
            let res = await request(app).post("/node/unregister")
                .send({token: "", instance: data.instance, uri: data.uri})
                .set("Content-Type","application/json; charset=utf-8")
            expect(res.status).toEqual(400)
        })
    })

})