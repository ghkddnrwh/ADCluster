require('dotenv').config();

import Koa from 'koa';
import Router from 'koa-router';
import mongoose from 'mongoose';
import bodyParser from 'koa-bodyparser';

import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';

const { PORT, MONGO_URI } = process.env;

// connect to mongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

app.use(jwtMiddleware);
app.use(bodyParser());

router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());

app.use((ctx) => {
  ctx.body = 'hello';
});

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listenning to port %d', port);
});
