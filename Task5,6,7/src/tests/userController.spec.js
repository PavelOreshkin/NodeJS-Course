const { mockRequest, mockResponse } = require('./interceptor');
const controller = require('../controllers/userController');

// describe("Check method \'userController\' ", () => {
//     test('should 200 and return correct value', async () => {
//         const req = mockRequest();
//         req.params.id = 1;
//         const res = mockResponse();

//         await controller.todoController(req, res);

//         expect(res.send).toHaveBeenCalledTimes(1);
//         expect(res.send.mock.calls.length).toBe(1);
//         expect(res.send).toHaveBeenCalledWith('Hello i am todo controller');
//     });

//     test('should 404 and return correct value', async () => {
//         const req = mockRequest();
//         req.params.id = null;
//         const res = mockResponse();

//         await controller.todoController(req, res);

//         expect(res.status).toHaveBeenCalledWith(404);
//         expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
//     });
// });

describe("Check method \'userController\' ", () => {
    test('should 200 and return correct value', async () => {
        const req = mockRequest();
        req.params.id = 1;
        const res = mockResponse();

        await controller.getUserById(1);

        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send.mock.calls.length).toBe(1);
        expect(res.send).toHaveBeenCalledWith('Hello i am todo controller');
    });

    test('should 404 and return correct value', async () => {
        const req = mockRequest();
        req.params.id = null;
        const res = mockResponse();

        await controller.todoController(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
    });
});
