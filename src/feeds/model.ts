import { Schema, model } from 'mongoose';

import { INews, IFeedModel } from './interfaces';
import { FEED_TYPES } from './constants';

const articleSchema = new Schema<INews>({
  title: { type: String, required: true },
  text: { type: String, required: false },
});

const feedSchema = new Schema<IFeedModel>({
  type: { type: String, enum: FEED_TYPES, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  articles: [articleSchema],
  date: { type: Date, default: Date.now() },
});

const Feed = model('Feed', feedSchema);

export default Feed;
