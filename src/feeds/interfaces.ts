export interface IArticle {
  title: string,
  text: string,
}

export interface INews {
  title: string,
  text: string,
}

export interface IFeed {
  name: string,
  news: IArticle[],
}

export interface IFeedModel {
  type: string,
  name: string,
  url: string,
  articles: [INews],
  date: Date,
}

export interface IScrapper {
  feedAmount?: number,
}
