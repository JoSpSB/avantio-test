import { Router } from 'express';

const PORT: number = Number(process.env.PORT) || 3000;

const router = Router();

router.get('/', async (request, response) => {
  response.send({
    message: `Try visiting /feeds to get news from different newspapers.`,
  });
});

router.get('/feeds', async (request, response) => {
  response.send({
    message: `Under construction! Will return the news from newspapers.`,
  });
});

router.post('/feed', async (request, response) => {
  response.send({
    message: 'Under construction!',
  });
});

export default router;
