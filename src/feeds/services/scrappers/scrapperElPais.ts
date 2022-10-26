import Scrapper from './scrapper';
import { INews } from '../../interfaces';
import { load } from 'cheerio';

/**
 * Scrapper for El País.
 */
export default class ScrapperElPais extends Scrapper {
  NAME = 'El País';
  URL = 'https://elpais.com/';

  /**
   * Parse daily trends from the cover page.
   * @param coverData 
   * @returns INews[]
   */
  parseNews(coverData: any): INews[] {
    const news: INews[] = [];    
    const $ = load(coverData);

    $('article').each((_idx: number, article: any) => {
      if (_idx >= this._feedAmount) return;

      const title = $(article).find('header > h2 > a')?.text().trim();
      const text = $(article).find('p')?.text().trim();
      news.push({ title, text });
    });

    return news;
  };
}
