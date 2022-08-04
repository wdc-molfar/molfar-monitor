'use strict';

const jestOpenAPI = require('jest-openapi').default
const request = require('supertest')
const path = require('path')

jestOpenAPI(path.join(__dirname, '../oas.yaml'))
let app = require( '../src/javascript' )


describe('Тести для шляху "/state"', () => {

    describe('Перевірка стану роботи контейнера', function() {


        test('Повинен повернути стан роботи контейнера, код відповіді - 200', async () => {

            let res = await request(app)
                .get(`/state`)
                .set("Content-Type","application/json; charset=utf-8")
            expect(res.status).toEqual(200)
            expect(res).toSatisfyApiSpec()

        });
    });
});