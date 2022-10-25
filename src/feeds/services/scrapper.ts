import axios from 'axios';
import { load } from 'cheerio';

import { IArticle, IScrapper } from '../interfaces';

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

  protected parseNews = (feedArticles: IArticle[], $: any): IArticle[] => {
    throw new Error('Not implemented method!');
  };

  public getFeeds = async (): Promise<IArticle[]> => {
    const feedArticles: IArticle[] = [];
    const { data } = await axios.get(this.URL);
    const $ = load(data);

    this.parseNews(feedArticles, $);

    return feedArticles;
  };
}
