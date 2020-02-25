import { Request, Response, Router } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import GroupService from '../services/groupServices';
import { GroupDTO } from 'groupTypes';

export const GroupController = (router: Router): void => {
    router.get('/group/:id', async (req: Request, res: Response): Promise<void> => {
        const id: number = Number(req.params.id);
        const group: Object = await GroupService.getGroupById(id);
        res.json({ group });
    });

    router.get('/group', async (req: Request, res: Response): Promise<void> => {
        const { groupSubstring, limit }: ParamsDictionary = req.query;
        const groups: Object = await GroupService.getAllGroups(groupSubstring, Number(limit));
        res.json({ groups });
    });

    router.post('/group',
        async (req: Request, res: Response): Promise<void> => {
            const { name, permissions }: GroupDTO = req.body;
            const id: number = await GroupService.addGroup(name, permissions);
            res.status(201).json({ id });
        }
    );

    router.put('/group/:id',
        async (req: Request, res: Response): Promise<void> => {
            const { name, permissions }: GroupDTO = req.body;
            const id: number = Number(req.params.id);
            const success: boolean = await GroupService.editGroup(id, name, permissions);
            if (success) {
                res.status(200).json({ message: 'group edited success' });
                return;
            }
            res.status(400).json({ message: 'group went wrong' });
        }
    );

    router.delete('/group/:id', async (req: Request, res: Response): Promise<void> => {
        const id: number = Number(req.params.id);
        const success: boolean = await GroupService.deleteGroup(id);
        if (success) {
            res.status(200).json({ message: 'group deleted success' });
            return;
        }
        res.status(400).json({ message: 'something went wrong' });
    });
};
