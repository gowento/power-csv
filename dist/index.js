'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.csv2json = csv2json;
exports.json2csv = json2csv;

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

  var preparedJson = (0, _lodash2.default)(json).castArray().map(_flat2.default).value();

  return _babyparse2.default.unparse(preparedJson, opts);
}