import Router from 'koa-router';
import * as videosCtrl from './videos.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const videos = new Router();

videos.get('/', videosCtrl.list);
videos.post('/', checkLoggedIn, videosCtrl.add);

const video = new Router();
video.get('/', videosCtrl.read);
video.delete('/', checkLoggedIn, videosCtrl.checkOwnVideo, videosCtrl.remove);
video.patch('/', checkLoggedIn, videosCtrl.checkOwnVideo, videosCtrl.update);

videos.use('/:id', videosCtrl.getVideoById, video.routes());

export default videos;
