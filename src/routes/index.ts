import { Router } from 'express';

import { getFeeds } from '../feeds/services';

const router = Router();

router.get('/', async (request, response) => {
  response.send({
    message: 'Try visiting /feeds to get news from different newspapers.',
  });
});

router.get('/feeds', async (request, response) => {
  try {
    return response.send({ data: await getFeeds() });
  } catch (err) {
    if (err instanceof Error) {
      return response.status(500).send({ error: err.message });
    }
    return response.status(500).send({ error: 'Unknown error' });
  }
});

router.post('/feed', async (request, response) => {
  response.send({
    message: 'Under construction!',
  });
});

export default router;
