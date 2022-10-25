import Scrapper from './scrapper';
import { INews } from '../interfaces';

export default class ScrapperElMundo extends Scrapper {
  NAME = 'El Mundo';
  URL = 'https://www.elmundo.es/';

  protected parseNews = (feedArticles: INews[], $: any): INews[] => {
    $('article').each((_idx: number, article: any) => {
      if (_idx >= this._feedAmount) return;
      const title = $(article).find('header > a > h2')?.text();
      const text = $(article).find('p')?.text();
      feedArticles.push({ title, text });
    });

    return feedArticles;
  };
}
