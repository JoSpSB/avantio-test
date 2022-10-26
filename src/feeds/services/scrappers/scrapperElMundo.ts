import Scrapper from './scrapper';
import { INews } from '../../interfaces';
import { load } from 'cheerio';

/**
 * Scrapper for El Mundo.
 */
export default class ScrapperElMundo extends Scrapper {
  NAME = 'El Mundo';
  URL = 'https://www.elmundo.es/';

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

      const title = $(article).find('header > span')?.text().trim();
      const text = $(article).find('header > a')?.text().trim();
      news.push({ title, text });
    });

    return news;
  };
}
