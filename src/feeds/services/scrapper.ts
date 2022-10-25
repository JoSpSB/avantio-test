import axios from 'axios';
import { load } from 'cheerio';

import { INew, IScrapper } from '../interfaces';

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

  protected parseNews = (feedArticles: INew[], $: any): INew[] => {
    throw new Error('Not implemented method!');
  };

  public getNews = async (): Promise<INew[]> => {
    const news: INew[] = [];
    const { data } = await axios.get(this.URL);
    const $ = load(data);

    this.parseNews(news, $);


    return news;
  };
}
