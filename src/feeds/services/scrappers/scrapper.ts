import axios from 'axios';

import { INews, IScrapper } from '../../interfaces';

/**
 * Service to extract news from newspaper cover page.
 */
export default class Scrapper {
  static NAME: string;
  static URL: string;
  protected _feedAmount: number;

  NAME = '';
  URL = '';

  constructor(scrapperConf: IScrapper) {
    this._feedAmount = scrapperConf.feedAmount || 5;
  }

  /**
   * Newspaper name.
   * @returns string
   */
  getName(): string {
    return this.NAME;
  }

  parseNews(coverData: any): INews[] {
    throw new Error('Not implemented method!');
  };

  /**
   * Gets the news from newspaper cover page.
   * @returns INews[]
   */
  async getNews(): Promise<INews[]> {
    const { data } = await axios.get(this.URL);

    return this.parseNews(data);
  };
}
