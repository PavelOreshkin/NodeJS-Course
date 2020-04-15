import express, { Request, Response, Router, NextFunction } from 'express';
import { UserGroupDTO } from '../types/userGroupTypes';
import UserGroupService from '../services/userGroupServices';
import { sendLog } from '../logger';

const router: Router = express.Router();

router.post(
    '/',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { method, path } = req;
            const { groupId, usersIds }: UserGroupDTO = req.body;
            const userGroups = await UserGroupService.addUsersToGroup(Number(groupId), usersIds);
            if (userGroups) {
                res.status(201).json({ userGroups });
                return;
            }
            const message = 'user not assigned to group';
            sendLog({ method, path, message });
            res.status(400).json({ message });
        } catch (error) {
            return next(error);
        }
    }
);

export default router;
