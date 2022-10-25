import Scrapper from './scrapper';
import { INews } from '../interfaces';

export default class ScrapperElMundo extends Scrapper {
  NAME = 'El Mundo';
  URL = 'https://www.elmundo.es/';

  protected parseNews = (feedNews: INews[], $: any): INews[] => {
    $('article').each((_idx: number, article: any) => {
      if (_idx >= this._feedAmount) return;
      const title = $(article).find('header > span')?.text().trim();
      const text = $(article).find('header > a')?.text().trim();
      feedNews.push({ title, text });
    });

    return feedNews;
  };
}
