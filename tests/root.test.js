'use strict';

const jestOpenAPI = require('jest-openapi').default
const request = require('supertest')
const path = require('path')

jestOpenAPI(path.join(__dirname, '../oas.yaml'))
let app = require( '../src/javascript' )

describe('Тести для шляху "/"', () => {

    describe('Отримати загальний опис сервісу', () => {

        test('Повинен повернути сторінку загального опису, код відповіді - 200', async () => {
            let res = await request(app).get("/")
            expect(res.status).toEqual(200)
            expect(res).toSatisfyApiSpec()
        })

        test('Повинен повернути сторінку статистики, код відповіді - 302', async () => {
            let res = await request(app).get("/metrics")
            expect(res.status).toEqual(302)
        })

    })

})