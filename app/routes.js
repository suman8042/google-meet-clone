import express from 'express';
import { saveCallId, getCallId } from './controller.js'; // Ensure the .js extension

const router = express.Router();

router.post('/api/save-call-id', saveCallId);
router.get('/api/get-call-id/:id', getCallId);

export default router;
