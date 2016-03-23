import test from 'ava';
import {
  json2csv,
  csv2json,
} from '../src';

test('json2csv returns valid CSV', t => {
  const json = [
    {
      field: 'foo',
      object: {
        field: 'bar',
        anotherField: 'foo',
        numericField: 123,
      },
      array: [1, 2, 'foo'],
    },
    {
      field: 'bar',
      object: {
        numericField: 456,
      },
      array: [3, 4, 'bar'],
    },
  ];
  const csv = json2csv(json);
  t.is(csv, 'field;object.field;object.anotherField;object.numericField;array.0;array.1;array.2\r\nfoo;bar;foo;123;1;2;foo\r\nbar;;;456;3;4;bar');
});

test('json2csv works with simple object', t => {
  const json = {
    foo: 'bar',
    bar: {
      foo: 'bar',
    },
  };
  const csv = json2csv(json);
  t.is(csv, 'foo;bar.foo\r\nbar;bar');
});

test('json2csv accepts custom opts', t => {
  const json = {
    foo: 'bar',
    bar: {
      foo: 'bar',
    },
  };
  const csv = json2csv(json, { delimiter: ',' });
  t.is(csv, 'foo,bar.foo\r\nbar,bar');
});

test('csv2json returns valid JSON', t => {
  const csv = 'field;object.field;object.anotherField;object.numericField;array.0;array.1;array.2\r\nfoo;bar;foo;123;1;2;foo\r\nbar;;;456;3;4;bar';
  const json = csv2json(csv);
  t.is(json.length, 2);
  t.same(json, [
    {
      field: 'foo',
      object: {
        field: 'bar',
        anotherField: 'foo',
        numericField: 123,
      },
      array: [1, 2, 'foo'],
    },
    {
      field: 'bar',
      object: {
        field: '',
        anotherField: '',
        numericField: 456,
      },
      array: [3, 4, 'bar'],
    },
  ]);
});
