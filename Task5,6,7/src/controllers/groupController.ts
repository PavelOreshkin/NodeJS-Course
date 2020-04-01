import express, { Request, Response, Router } from 'express';
import GroupService from '../services/groupServices';
import { GroupDTO } from 'groupTypes';
import { ENTITY } from '../constants';
import { verifyEntityExistence } from '../validations';
import { GroupQuery } from '../types/groupTypes';
import { sendLog } from '../logger';

const router: Router = express.Router();

router.param('id', verifyEntityExistence(ENTITY.GROUP));

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    const id: number = Number(req.params.id);
    const group: Object = await GroupService.getGroupById(id);
    res.json({ group });
});

router.get('/', async (req: Request, res: Response): Promise<void> => {
    const { groupSubstring, limit }: GroupQuery = req.query;
    const groups: Object = await GroupService.getAllGroups(groupSubstring, Number(limit));
    res.json({ groups });
});

router.post('/',
    async (req: Request, res: Response): Promise<void> => {
        const { name, permissions }: GroupDTO = req.body;
        const id: number = await GroupService.addGroup(name, permissions);
        res.status(201).json({ id });
    }
);

router.put('/:id',
    async (req: Request, res: Response): Promise<void> => {
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
    }
);

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
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
});

export default router;
