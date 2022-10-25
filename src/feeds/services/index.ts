import { IFeed, IScrapper } from '../interfaces';
import Scrapper from './scrapper';
import Errors from '../errors';
import { FEED_TYPES } from '../../feeds/constants';

import ScrapperElPais from './scrapperElPais';
import ScrapperElMundo from './scrapperElMundo';

export function getScrapper(scrapperType: string, scrapperConf: IScrapper): Scrapper {
  switch (scrapperType) {
    case 'elpais':
      return new ScrapperElPais(scrapperConf);
    case 'elmundo':
      return new ScrapperElMundo(scrapperConf);
    default:
      throw new Errors.NotSupportedFeedTypeError(`Not supported scrapper type: '${scrapperType}'`);
  }
}

export async function getFeeds() {
  const feedsResult: IFeed[] = [];

  for (const scrapperType of FEED_TYPES) {
    const scrapper = getScrapper(scrapperType, {});
    feedsResult.push({ type: scrapperType, name: scrapper.getName(), news: await scrapper.getNews(), date: new Date() });
  }

  return feedsResult;
}
