import Video from '../models/video';

export default function createFakeData() {
  const videos = [...Array(40).keys()].map((i) => ({
    title: `this is ${i} video`,
    descriptioin: `wow this is my ${i} video`,
    tags: ['one', 'three', 'four'],
    thumbnail_url:
      'https://s3.ca-central-1.amazonaws.com/codingwithmitch/media/VideoPlayerRecyclerView/Sending+Data+to+a+New+Activity+with+Intent+Extras.png',

    video_url:
      'https://s3.ca-central-1.amazonaws.com/codingwithmitch/media/VideoPlayerRecyclerView/Sending+Data+to+a+New+Activity+with+Intent+Extras.mp4',
  }));

  Video.insertMany(videos, (err, docs) => {
    console.log(docs);
  });
}
