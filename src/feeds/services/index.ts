import { IScrapper } from '../interfaces';
import Scrapper from './scrapper';
import Errors from '../errors';

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
