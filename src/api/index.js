import Router from 'koa-router';

import auth from './auth';
import videos from './videos';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/video', videos.routes());

export default api;
