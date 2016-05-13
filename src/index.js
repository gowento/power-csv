import Baby from 'babyparse';
import flatten, { unflatten } from 'flat';
import _ from 'lodash';

export function csv2json(csv, opts = {}) {
  const options = _.defaults(opts, { header: true, skipEmptyLines: true });
  const results = Baby.parse(csv, options);

  return _.map(results.data, unflatten);
}

export function json2csv(json, opts = {}) {
  const options = _.defaults(opts, { delimiter: ';' });
  const data = _(json)
    .castArray()
    .map(flatten)
    .value();

  const fields = _(data)
    .flatMap(_.keys)
    .uniq()
    .value();

  return Baby.unparse({ fields, data }, options);
}

function expressDecorator(rawData, filename = 'res.csv', opts) {
  this.set('Content-Type', 'text/csv; charset=utf-8');
  this.set('Content-Disposition', `attachment; filename=${filename}`);
  this.status(200); // Fix for Chrome (CSV download fail if status is not 200)

  const data = _(rawData)
    .castArray()
    .map(item => (item.toJSON ? item.toJSON() : item))
    .value();

  const csv = json2csv(data, opts);
  this.send(csv);
}

export default function (req, res, next) {
  res.csv = expressDecorator;
  next();
}
