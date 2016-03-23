import Baby from 'babyparse';
import flatten, { unflatten } from 'flat';
import _ from 'lodash';

export function csv2json(csv, opts = { header: true, skipEmptyLines: true, dynamicTyping: true }) {
  const results = Baby.parse(csv, opts);
  return _(results.data)
    .map(unflatten)
    .value();
}

export function json2csv(json, opts = { delimiter: ';' }) {
  const data = _(json)
    .castArray()
    .map(flatten)
    .value();

  const fields = _(data)
    .map(_.keys)
    .flatten()
    .uniq()
    .value();

  return Baby.unparse({ fields, data }, opts);
}
