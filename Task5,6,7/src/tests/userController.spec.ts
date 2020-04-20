import { Request, Response, NextFunction } from 'express';
import { getUserById, getAutoSuggestUsers, addUser, editUser, deleteUser } from '../controllers/userController';
import Fakexpress from './fakeExpress';
import UserService from '../services/userServices';

jest.mock('../services/userServices', () => ({
    getUserById: jest.fn(),
    getAutoSuggestUsers: jest.fn(),
    addUser: jest.fn(),
    editUser: jest.fn(),
    deleteUser: jest.fn()
}));

const mockedUserService = {
    getUserById: UserService.getUserById as jest.Mock,
    getAutoSuggestUsers: UserService.getAutoSuggestUsers as jest.Mock,
    addUser: UserService.addUser as jest.Mock,
    editUser: UserService.editUser as jest.Mock,
    deleteUser: UserService.deleteUser as jest.Mock
};

describe('/user', () => {
    describe('GET /', () => {
        it('success return users', async () => {
            const xp = new Fakexpress({
                query: {
                    loginSubstring: 'test',
                    limit: 1
                }
            });
            const users = [
                { id: 1, login: 'test1' },
                { id: 2, login: 'test2' }
            ];
            const expectedResult = { users };

            mockedUserService.getAutoSuggestUsers.mockResolvedValue(users);

            await getAutoSuggestUsers(xp.req as Request, xp.res as Response, xp.next as NextFunction);

            expect(xp.responseData).toStrictEqual(expectedResult);
            expect(xp.res.statusCode).toBe(200);
        });
    });

    describe('GET /:id', () => {
        it('success return user', async () => {
            const xp = new Fakexpress({ params: { id: 1 } });
            const user = { id: 1, username: 'test' };
            const expectedResult = { user };

            mockedUserService.getUserById.mockResolvedValue(user);

            await getUserById(xp.req as Request, xp.res as Response, xp.next as NextFunction);

            expect(xp.responseData).toStrictEqual(expectedResult);
            expect(xp.res.statusCode).toBe(200);
        });
    });

    describe('POST /', () => {
        it('success add user', async () => {
            const xp = new Fakexpress({
                body: {
                    login: 'testLogin',
                    password: 'testPassword',
                    age: 10
                }
            });
            const user = { id: 1 };
            const expectedResult = user;

            mockedUserService.addUser.mockResolvedValue(user.id);

            await addUser(xp.req as Request, xp.res as Response, xp.next as NextFunction);

            expect(xp.responseData).toStrictEqual(expectedResult);
            expect(xp.res.statusCode).toBe(201);
        });
    });

    describe('PUT /:id', () => {
        it('success edit user', async () => {
            const xp = new Fakexpress({
                body: {
                    login: 'testLogin',
                    password: 'testPassword',
                    age: 10
                },
                params: {
                    id: 1
                }
            });
            const response = { message: 'user edited success' };
            const expectedResult = response;

            mockedUserService.editUser.mockResolvedValue(response);

            await editUser(xp.req as Request, xp.res as Response, xp.next as NextFunction);

            expect(xp.responseData).toStrictEqual(expectedResult);
            expect(xp.res.statusCode).toBe(200);
        });
        it('error edit user', async () => {
            const xp = new Fakexpress({
                body: {
                    login: 'testLogin',
                    password: 'testPassword',
                    age: 10
                },
                params: {
                    id: 1
                }
            });
            const response = { message: 'user edited error' };
            const expectedResult = response;

            mockedUserService.editUser.mockRejectedValue(response);

            await editUser(xp.req as Request, xp.res as Response, xp.next as NextFunction);

            expect(xp.responseData).toStrictEqual(expectedResult);
            expect(xp.res.statusCode).toBe(400);
        });
    });

    describe('DELETE /:id', () => {
        it('success delete user', async () => {
            const xp = new Fakexpress({
                params: {
                    id: 1
                }
            });
            const response = { message: 'user deleted success' };
            const expectedResult = response;

            mockedUserService.deleteUser.mockResolvedValue(response);

            await deleteUser(xp.req as Request, xp.res as Response, xp.next as NextFunction);

            expect(xp.responseData).toStrictEqual(expectedResult);
            expect(xp.res.statusCode).toBe(200);
        });
        it('error delete user', async () => {
            const xp = new Fakexpress({
                params: {
                    id: 1
                }
            });
            const response = { message: 'user deleted error' };
            const expectedResult = response;

            mockedUserService.deleteUser.mockRejectedValue(response);

            await deleteUser(xp.req as Request, xp.res as Response, xp.next as NextFunction);

            expect(xp.responseData).toStrictEqual(expectedResult);
            expect(xp.res.statusCode).toBe(400);
        });
    });
});
