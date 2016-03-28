'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.csv2json = csv2json;
exports.json2csv = json2csv;

exports.default = function (req, res, next) {
  res.csv = expressDecorator;
  next();
};

var _babyparse = require('babyparse');

var _babyparse2 = _interopRequireDefault(_babyparse);

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function csv2json(csv) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? { header: true, skipEmptyLines: true, dynamicTyping: true } : arguments[1];

  var results = _babyparse2.default.parse(csv, opts);
  return (0, _lodash2.default)(results.data).map(_flat.unflatten).value();
}

function json2csv(json) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? { delimiter: ';' } : arguments[1];

  var data = (0, _lodash2.default)(json).castArray().map(_flat2.default).value();

  var fields = (0, _lodash2.default)(data).map(_lodash2.default.keys).flatten().uniq().value();

  return _babyparse2.default.unparse({ fields: fields, data: data }, opts);
}

function expressDecorator(rawData) {
  var filename = arguments.length <= 1 || arguments[1] === undefined ? 'res.csv' : arguments[1];
  var opts = arguments[2];

  this.set('Content-Type', 'text/csv; charset=utf-8');
  this.set('Content-Disposition', 'attachment; filename=' + filename);
  this.status(200); // Fix for Chrome (CSV download fail if status is not 200)

  var data = (0, _lodash2.default)(rawData).castArray().map(function (item) {
    return item.toJSON ? item.toJSON() : item;
  }).value();

  var csv = json2csv(data, opts);
  this.send(csv);
}