import { Request, Response, NextFunction } from 'express';
import { getGroupById, getAllGroups, addGroup, editGroup, deleteGroup } from '../controllers/groupController';
import Fakexpress from './fakeExpress';
import GroupService from '../services/groupServices';

jest.mock('../services/groupServices', () => ({
    getGroupById: jest.fn(),
    getAllGroups: jest.fn(),
    addGroup: jest.fn(),
    editGroup: jest.fn(),
    deleteGroup: jest.fn()
}));

const mockedGroupService = {
    getGroupById: GroupService.getGroupById as jest.Mock,
    getAllGroups: GroupService.getAllGroups as jest.Mock,
    addGroup: GroupService.addGroup as jest.Mock,
    editGroup: GroupService.editGroup as jest.Mock,
    deleteGroup: GroupService.deleteGroup as jest.Mock
};

describe('/group', () => {
    describe('GET /', () => {
        it('success return groups', async () => {
            const xp = new Fakexpress({
                query: {
                    groupSubstring: 'test',
                    limit: 1
                }
            });
            const groups = [
                { id: 1, name: 'test1' },
                { id: 2, name: 'test2' }
            ];
            const expectedResult = { groups };

            mockedGroupService.getAllGroups.mockResolvedValue(groups);

            await getAllGroups(xp.req as Request, xp.res as Response, xp.next as NextFunction);

            expect(xp.responseData).toStrictEqual(expectedResult);
            expect(xp.res.statusCode).toBe(200);
        });
    });

    describe('GET /:id', () => {
        it('success return group', async () => {
            const xp = new Fakexpress({ params: { id: 1 } });
            const group = { id: 1, name: 'test' };
            const expectedResult = { group };

            mockedGroupService.getGroupById.mockResolvedValue(group);

            await getGroupById(xp.req as Request, xp.res as Response, xp.next as NextFunction);

            expect(xp.responseData).toStrictEqual(expectedResult);
            expect(xp.res.statusCode).toBe(200);
        });
    });

    describe('POST /', () => {
        it('success add group', async () => {
            const xp = new Fakexpress({
                body: {
                    name: 'test',
                    permissions: ['TEST']
                }
            });
            const group = { id: 1 };
            const expectedResult = group;

            mockedGroupService.addGroup.mockResolvedValue(group.id);

            await addGroup(xp.req as Request, xp.res as Response, xp.next as NextFunction);

            expect(xp.responseData).toStrictEqual(expectedResult);
            expect(xp.res.statusCode).toBe(201);
        });
    });

    describe('PUT /:id', () => {
        it('success edit group', async () => {
            const xp = new Fakexpress({
                body: {
                    name: 'test',
                    permissions: ['TEST']
                },
                params: {
                    id: 1
                }
            });
            const response = { message: 'group edited success' };
            const expectedResult = response;

            mockedGroupService.editGroup.mockResolvedValue(response);

            await editGroup(xp.req as Request, xp.res as Response, xp.next as NextFunction);

            expect(xp.responseData).toStrictEqual(expectedResult);
            expect(xp.res.statusCode).toBe(200);
        });
        it('error edit group', async () => {
            const xp = new Fakexpress({
                body: {
                    name: 'test',
                    permissions: ['TEST']
                },
                params: {
                    id: 1
                }
            });
            const response = { message: 'group edited error' };
            const expectedResult = response;

            mockedGroupService.editGroup.mockRejectedValue(response);

            await editGroup(xp.req as Request, xp.res as Response, xp.next as NextFunction);

            expect(xp.responseData).toStrictEqual(expectedResult);
            expect(xp.res.statusCode).toBe(400);
        });
    });

    describe('DELETE /:id', () => {
        it('success delete group', async () => {
            const xp = new Fakexpress({
                params: {
                    id: 1
                }
            });
            const response = { message: 'group deleted success' };
            const expectedResult = response;

            mockedGroupService.deleteGroup.mockResolvedValue(response);

            await deleteGroup(xp.req as Request, xp.res as Response, xp.next as NextFunction);

            expect(xp.responseData).toStrictEqual(expectedResult);
            expect(xp.res.statusCode).toBe(200);
        });
        it('error delete group', async () => {
            const xp = new Fakexpress({
                params: {
                    id: 1
                }
            });
            const response = { message: 'group deleted error' };
            const expectedResult = response;

            mockedGroupService.deleteGroup.mockRejectedValue(response);

            await deleteGroup(xp.req as Request, xp.res as Response, xp.next as NextFunction);

            expect(xp.responseData).toStrictEqual(expectedResult);
            expect(xp.res.statusCode).toBe(400);
        });
    });
});
