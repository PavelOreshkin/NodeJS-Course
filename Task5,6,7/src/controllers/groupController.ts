import express, { Request, Response, Router, NextFunction } from 'express';
import GroupService from '../services/groupServices';
import { GroupDTO } from 'groupTypes';
import { ENTITY } from '../constants';
import { verifyEntityExistence } from '../validations';
import { GroupQuery } from '../types/groupTypes';
import { sendLog } from '../logger';

const router: Router = express.Router();

router.param('id', verifyEntityExistence(ENTITY.GROUP));

export const getGroupById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id: number = Number(req.params.id);
        const group: Object = await GroupService.getGroupById(id);
        res.json({ group });
    } catch (error) {
        return next(error);
    }
};

export const getAllGroups = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { groupSubstring, limit }: GroupQuery = req.query;
        const groups: Object = await GroupService.getAllGroups(groupSubstring, Number(limit));
        res.json({ groups });
    } catch (error) {
        return next(error);
    }
};

export const addGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, permissions }: GroupDTO = req.body;
        const id: number = await GroupService.addGroup(name, permissions);
        res.status(201).json({ id });
    } catch (error) {
        return next(error);
    }
};

export const editGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { method, path } = req;
        const { name, permissions }: GroupDTO = req.body;
        const id: number = Number(req.params.id);
        const success: boolean = await GroupService.editGroup(id, name, permissions);
        if (success) {
            res.status(200).json({ message: 'group edited success' });
            return;
        }
        const message = 'group edit error';
        sendLog({ method, path, id, message });
        res.status(400).json({ message: 'group went wrong' });
    } catch (error) {
        return next(error);
    }
};

export const deleteGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { method, path } = req;
        const id: number = Number(req.params.id);
        const success: boolean = await GroupService.deleteGroup(id);
        if (success) {
            res.status(200).json({ message: 'group deleted success' });
            return;
        }
        const message = 'group deleted error';
        sendLog({ method, path, message });
        res.status(400).json({ message: 'something went wrong' });
    } catch (error) {
        return next(error);
    }
};

router.get('/:id', getGroupById);
router.get('/', getAllGroups);
router.post('/', addGroup);
router.put('/:id', editGroup);
router.delete('/:id', deleteGroup);

export default router;
