import { string } from '@hapi/joi';
import mongoose, { Schema } from 'mongoose';

const VideoSchema = new Schema({
  title: String,
  description: String,
  tags: [String],
  upload_date: {
    type: Date,
    default: Date.now,
  },
  thumbnail_url: String,
  video_url: String,
  user_id: mongoose.Types.ObjectId,
});

const Video = mongoose.model('Video', VideoSchema);
export default Video;
