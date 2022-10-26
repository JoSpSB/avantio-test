import { IFeed, IScrapper } from '../interfaces';
import Scrapper from './scrappers/scrapper';
import Errors from '../errors';
import { FEED_TYPES } from '../../feeds/constants';

import ScrapperElPais from './scrappers/scrapperElPais';
import ScrapperElMundo from './scrappers/scrapperElMundo';

import Feed from '../model';

export const getScrapper = (scrapperType: string, scrapperConf: IScrapper): Scrapper => {
  switch (scrapperType) {
    case 'elpais':
      return new ScrapperElPais(scrapperConf);
    case 'elmundo':
      return new ScrapperElMundo(scrapperConf);
    default:
      throw new Errors.NotSupportedFeedTypeError(`Not supported scrapper type: '${scrapperType}'`);
  }
}

export const getFeeds = async () => {
  const feedsResult: IFeed[] = [];

  for (const scrapperType of FEED_TYPES) {
    try {
      const scrapper = getScrapper(scrapperType, {});
      const feedData = { type: scrapperType, name: scrapper.getName(), news: await scrapper.getNews(), date: new Date() }

      const feed = new Feed(feedData);
      feed.save();

      feedsResult.push(feedData);
    } catch (error) {
      // Log error and continue.
      continue;
    }
  }

  return feedsResult;
}
