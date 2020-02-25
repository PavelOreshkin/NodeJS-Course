import { Request, Response, Router } from 'express';
import { UserGroupDTO } from '../types/userGroupTypes';
import UserGroupService from '../services/userGroupServices';

export const UserGroupController = (router: Router): void => {
    router.post('/userGroup',
        async (req: Request, res: Response): Promise<void> => {
            const { groupId, usersIds }: UserGroupDTO = req.body;
            let userGroups;
            try {
                userGroups = await UserGroupService.addUsersToGroup(Number(groupId), usersIds);
            } catch (error) {
                res.status(400).json({ message: error.original.detail });
            }
            res.status(201).json({ userGroups });
        }
    );
};
