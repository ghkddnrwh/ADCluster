require('dotenv').config();

import Koa from 'koa';

const { PORT, MONGO_URI } = process.env;

const app = new Koa();

app.use((ctx) => {
  ctx.body = 'hello';
});

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listenning to port %d', port);
});
