import { Router } from 'express';

import { getFeeds } from '../feeds';

const router = Router();

/**
 * Base path that can be used to show the Web page.
 */
router.get('/', async (request, response) => {
  response.send({
    message: 'Try visiting /feeds to get the daily trends from different newspapers.',
  });
});

/**
 * Get feeds from all available newspapers.
 */
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

/**
 * Get specific feed daily trends.
 */
router.get('/feed', async (request, response) => {
  response.send({
    message: 'Under construction!',
  });
});

/**
 * Create manually a feed from external source.
 */
router.post('/feed', async (request, response) => {
  response.send({
    message: 'Under construction!',
  });
});

/**
 * Update existing feed.
 */
router.put('/feed', async (request, response) => {
  response.send({
    message: 'Under construction!',
  });
});

/**
 * Delete existing feed.
 */
router.delete('/feed', async (request, response) => {
  response.send({
    message: 'Under construction!',
  });
});

export default router;
