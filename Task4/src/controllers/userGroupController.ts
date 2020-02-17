import { Request, Response, Router } from 'express';
import { UserGroupDTO } from '../types/userGroupTypes';
import UserGroupService from '../services/userGroupServices';

export const UserGroupController = (router: Router): void => {

    router.post('/userGroup', // TODO VALIDATION
        async (req: Request, res: Response): Promise<void> => {
            const { groupId, usersIds }: UserGroupDTO = req.body;
            const userGroups = await UserGroupService.addUsersToGroup(Number(groupId), usersIds);
            res.status(201).json({ userGroups });
        }
    );
};
