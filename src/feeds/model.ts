import { Schema, model } from 'mongoose';

import { INews, IFeedModel } from './interfaces';
import { FEED_TYPES } from './constants';

const newsSchema = new Schema<INews>({
  title: { type: String, required: true },
  text: { type: String, required: false },
}, { _id : false });

const feedSchema = new Schema<IFeedModel>({
  type: { type: String, enum: FEED_TYPES, required: true },
  name: { type: String, required: true },
  news: [newsSchema],
  date: { type: Date, default: new Date() },
});

const Feed = model('Feed', feedSchema);

export default Feed;
