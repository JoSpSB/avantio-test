export interface INew {
  title: string,
  text: string,
}

export interface IFeed {
  name: string,
  news: INew[],
}

export interface IFeedModel {
  type: string,
  name: string,
  url: string,
  articles: [INew],
  date: Date,
}

export interface IScrapper {
  feedAmount?: number,
}
