import Scrapper from './scrapper';
import { INews } from '../interfaces';

export default class ScrapperElPais extends Scrapper {
  NAME = 'El País';
  URL = 'https://elpais.com/';

  protected parseNews = (feedArticles: INews[], $: any): INews[] => {
    $('article').each((_idx: number, article: any) => {
      if (_idx >= this._feedAmount) return;
      const title = $(article).find('header > h2 > a')?.text();
      const text = $(article).find('p')?.text();
      feedArticles.push({ title, text });
    });

    return feedArticles;
  };
}
