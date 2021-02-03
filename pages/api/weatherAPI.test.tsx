import weatherAPI from './weatherAPI';

var httpMocks = require('node-mocks-http');

describe('/api/weatherAPI/[city]', () => {
    test('successful get request with status code 200 response', async () => {
        const { req, res } = httpMocks.createMocks({
            method: 'GET',
            query: {
                city: 'Aalborg',
            },
        });

        await weatherAPI(req, res);

        expect(res._getStatusCode()).toBe(200);   
    });

    test('status code 400 response with error message on unknown city', async () => {
        const { req, res } = httpMocks.createMocks({
            method: 'GET',
            query: {
                city: 'Banana cake',
            },
        });

        await weatherAPI(req, res);

        expect(res._getStatusCode()).toBe(400);
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                error: 'City does not exist'
            })
        );   
    });

    test('conforms to Data interface (utils/types.tsx)', async () => {
        const { req, res } = httpMocks.createMocks({
            method: 'GET',
            query: {
                city: 'Aalborg',
            },
        });

        await weatherAPI(req, res);

        expect(typeof JSON.parse(res._getData()).name).toBe('string');        
        expect(typeof JSON.parse(res._getData()).weatherData).toBe('object');     
        expect(typeof JSON.parse(res._getData()).weatherData.temperature).toBe('string');     
        expect(typeof JSON.parse(res._getData()).weatherData.skyText).toBe('string');     
        expect(typeof JSON.parse(res._getData()).weatherData.humidity).toBe('string');     
        expect(typeof JSON.parse(res._getData()).weatherData.windText).toBe('string');    
        expect(typeof JSON.parse(res._getData()).error).toBe('string');  
    });

    test('returns correct city', async () => {
        const { req, res } = httpMocks.createMocks({
            method: 'GET',
            query: {
                city: 'Aalborg',
            },
        });

        await weatherAPI(req, res);

        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                name: 'Aalborg, Nordjylland'
            })
        );
    });
});