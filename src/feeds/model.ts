import { Schema, model } from 'mongoose';

import { INews, IFeed } from './interfaces';
import { FEED_TYPES } from './constants';

/**
 * Sub-document representing each daily trends.
 */
const newsSchema = new Schema<INews>({
  title: { type: String, required: true },
  text: { type: String, required: false },
}, { _id : false });

/**
 * Feed document.
 */
const feedSchema = new Schema<IFeed>({
  type: { type: String, enum: FEED_TYPES, required: true },
  name: { type: String, required: true },
  news: [newsSchema],
  date: { type: Date, default: new Date() },
});

const Feed = model('Feed', feedSchema);

export default Feed;
