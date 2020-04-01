import express, { Request, Response, Router } from 'express';
import { UserGroupDTO } from '../types/userGroupTypes';
import UserGroupService from '../services/userGroupServices';
import { sendLog } from '../logger';

const router: Router = express.Router();

router.post('',
    async (req: Request, res: Response): Promise<void> => {
        const { method, path } = req;
        const { groupId, usersIds }: UserGroupDTO = req.body;
        let userGroups;
        try {
            userGroups = await UserGroupService.addUsersToGroup(Number(groupId), usersIds);
        } catch (error) {
            const message = error.original.detail;
            sendLog({ method, path, message });
            res.status(400).json({ message });
            return;
        }
        res.status(201).json({ userGroups });
    }
);

export default router;
