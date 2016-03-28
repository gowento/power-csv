import test from 'ava';
import express from 'express';
import request from 'supertest-as-promised';

import csv from '../src';

function makeExpressApp() {
  const app = express();
  app.use(csv);

  app.get('/csv', (req, res) => {
    const json = {
      foo: 'bar',
      bar: {
        foo: 'bar',
      },
    };
    res.csv(json, 'test.csv');
  });

  return app;
}

test('title', async t => {
  const res = await request(makeExpressApp())
    .get('/csv');

  t.is(res.status, 200);
  t.is(res.headers['content-type'], 'text/csv; charset=utf-8');
  t.is(res.headers['content-disposition'], 'attachment; filename=test.csv');
  t.is(res.text, 'foo;bar.foo\r\nbar;bar');
});
