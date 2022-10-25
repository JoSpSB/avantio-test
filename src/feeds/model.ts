import { Schema, model } from 'mongoose';

interface INews {
  title: string,
  text: string,
}

interface IFeed {
  name: string,
  url: string,
  articles: [INews],
  date: Date,
}

const articleSchema = new Schema<INews>({
  title: { type: String, required: true },
  text: { type: String, required: false },
});

const feedSchema = new Schema<IFeed>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  articles: [articleSchema],
  date: { type: Date, default: Date.now() },
});

const Feed = model('Feed', feedSchema);

export default Feed;
