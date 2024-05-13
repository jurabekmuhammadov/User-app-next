import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { NextApiRequest, NextApiResponse } from 'next';

const dataFilePath = path.join(process.cwd(), 'data', 'users.json');
export function get(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data' });
    }
}

export function post(req: NextApiRequest, res: NextApiResponse) {
    try {
        const newData = { ...req.body, id: uuidv4() };
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
        data.push(newData);
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).json({ message: 'Error adding data' });
    }
}

export function notAllowed(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
