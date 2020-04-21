import { Response } from 'express';

export default class Fakexpress {
    constructor(req: any) {
        this.req = req;
    }

    res: Partial<Response> = {
        statusCode: 200,
        status: jest.fn().mockImplementation((code) => {
            this.res.statusCode = code;
            return this.res;
        }),
        json: jest.fn().mockImplementation((param) => {
            this.responseData = param;
            return this.res;
        })
    }

    req: any;
    responseData: any;
    next: any = (error: any) => {
        this.responseData = error;
        this.res.statusCode = 400;
    };
}
