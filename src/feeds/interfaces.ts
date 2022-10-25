export interface INews {
  title: string,
  text: string,
}

export interface IFeed {
  type: string,
  name: string,
  news: INews[],
  date: Date,
}

export interface IFeedModel {
  type: string,
  name: string,
  news: [INews],
  date: Date,
}

export interface IScrapper {
  feedAmount?: number,
}
