import Scrapper from './scrapper';
import { INews } from '../interfaces';
import { load } from 'cheerio';

export default class ScrapperElMundo extends Scrapper {
  NAME = 'El Mundo';
  URL = 'https://www.elmundo.es/';

  parseNews(feedNews: INews[], data: any): INews[] {
    const $ = load(data);
    $('article').each((_idx: number, article: any) => {
      if (_idx >= this._feedAmount) return;
      const title = $(article).find('header > span')?.text().trim();
      const text = $(article).find('header > a')?.text().trim();
      feedNews.push({ title, text });
    });

    return feedNews;
  };
}
