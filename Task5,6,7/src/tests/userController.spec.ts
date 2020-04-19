import { Request, Response, NextFunction } from 'express';
import { getUserById } from '../controllers/userController';
import Fakexpress from './fakeExpress';

describe('Check method getUserById ', () => {
    const fakeServiceCall = jest.fn().mockImplementation((id, xp) => {
        if (Boolean(id)) {
            xp.res.status(200);
            return 'success';
        }
        xp.res.status(404);
        return 'error';
    });

    test('status 200 and return user', async () => {
        const xp = new Fakexpress({ params: { id: 1 } });
        const result = { user: 'success' };

        await getUserById((id: number) =>
            fakeServiceCall(id, xp), xp.req as Request, xp.res as Response, xp.next as NextFunction);

        expect(xp.responseData).toStrictEqual(result);
        expect(xp.res.statusCode).toBe(200);
    });

    test('should 404 and return error', async () => {
        const xp = new Fakexpress({ params: {} });
        const result = { user: 'error' };

        await getUserById((id: number) =>
            fakeServiceCall(id, xp), xp.req as Request, xp.res as Response, xp.next as NextFunction);

        expect(xp.responseData).toStrictEqual(result);
        expect(xp.res.statusCode).toBe(404);
    });
});
