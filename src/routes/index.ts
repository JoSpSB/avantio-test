import { Router } from 'express';

const PORT: number = Number(process.env.PORT) || 3000;

const router = Router();

router.get('/', async (_req, res) => {
  res.send({
    message: `Server is running on port ${PORT}`,
  });
});

export default router;
