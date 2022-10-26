import axios from 'axios';

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

  getName(): string {
    return this.NAME;
  }

  parseNews(feedNews: INews[], data: any): INews[] {
    throw new Error('Not implemented method!');
  };

  async getNews(): Promise<INews[]> {
    const news: INews[] = [];
    const { data } = await axios.get(this.URL);

    this.parseNews(news, data);

    return news;
  };
}
