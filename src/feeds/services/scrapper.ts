import axios from 'axios';
import { load } from 'cheerio';

import { INews, IScrapper } from '../interfaces';

export default class Scrapper {
  static NAME: string;
  static URL: string;
  protected _feedAmount: number;

  NAME = '';
  URL = '';

  constructor(scrapperConf: IScrapper) {
    this._feedAmount = scrapperConf.feedAmount || 5;
  }

  public getName = (): string => this.NAME;

  protected parseNews = (feedArticles: INews[], $: any): INews[] => {
    throw new Error('Not implemented method!');
  };

  public getNews = async (): Promise<INews[]> => {
    const news: INews[] = [];
    const { data } = await axios.get(this.URL);
    const $ = load(data);

    this.parseNews(news, $);


    return news;
  };
}
