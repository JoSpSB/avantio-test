import Errors from '../errors';
import Feed from '../model';
import { IFeed, IScrapper } from '../interfaces';
import { FEED_TYPES } from '../../feeds/constants';

import Scrapper from './scrappers/scrapper';
import ScrapperElPais from './scrappers/scrapperElPais';
import ScrapperElMundo from './scrappers/scrapperElMundo';

/**
 * Get specific scrapper type.
 * @param scrapperType 
 * @param scrapperConf 
 * @returns Scrapper
 */
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

/**
 * Get feeds from all available scrappers.
 * @returns Feed
 */
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
