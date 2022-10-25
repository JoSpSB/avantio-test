import { Router } from 'express';

import { IFeed } from '../feeds/interfaces';
import { FEED_TYPES } from '../feeds/constants';
import { getScrapper } from '../feeds/services';

const router = Router();

router.get('/', async (request, response) => {
  response.send({
    message: 'Try visiting /feeds to get news from different newspapers.',
  });
});

router.get('/feeds', async (request, response) => {
  const feedsResult: IFeed[] = [];
  for (const scrapperType of FEED_TYPES) {
    try {
      const scrapper = getScrapper(scrapperType, {});
      feedsResult.push({ name: scrapper.getName(), news: await scrapper.getFeeds() });
    } catch (err) {
      if (err instanceof Error) {
        return response.status(500).send({ error: err.message });
      }
      return response.status(500).send({ error: 'Unknown error' });
    }
  }

  return response.send({ data: feedsResult });
});

router.post('/feed', async (request, response) => {
  response.send({
    message: 'Under construction!',
  });
});

export default router;
