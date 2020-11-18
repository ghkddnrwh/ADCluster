require('dotenv').config();

import Koa from 'koa';
import mongoose from 'mongoose';

const { PORT, MONGO_URI } = process.env;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

const app = new Koa();

app.use((ctx) => {
  ctx.body = 'hello';
});

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listenning to port %d', port);
});
