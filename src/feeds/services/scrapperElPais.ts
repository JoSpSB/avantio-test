import Scrapper from './scrapper';
import { INews } from '../interfaces';
import { load } from 'cheerio';

export default class ScrapperElPais extends Scrapper {
  NAME = 'El País';
  URL = 'https://elpais.com/';

  parseNews(feedNews: INews[], data: any): INews[] {
    const $ = load(data);
    $('article').each((_idx: number, article: any) => {
      if (_idx >= this._feedAmount) return;
      const title = $(article).find('header > h2 > a')?.text().trim();
      const text = $(article).find('p')?.text().trim();
      feedNews.push({ title, text });
    });

    return feedNews;
  };
}
