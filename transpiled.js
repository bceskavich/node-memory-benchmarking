'use strict';

var loop = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(times, lastMark) {
    var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var now, diff, countAtLastMark;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('==== BEGIN ====');
            console.log();

            now = void 0;
            diff = 0;
            countAtLastMark = count;

          case 5:
            if (!(count < times)) {
              _context.next = 14;
              break;
            }

            now = new Date();
            diff = now - lastMark;
            if (count === 1) {
              console.log('total_iterations, iterations_per_second, memory_usage');
            } else if (diff >= 1000) {
              console.log(`${count}, ${(count - countAtLastMark) / (diff / 1000)}, ${process.memoryUsage().rss}`);

              lastMark = now;
              countAtLastMark = count;
            }

            _context.next = 11;
            return iterate(count);

          case 11:
            count = _context.sent;
            _context.next = 5;
            break;

          case 14:

            console.log();
            console.log('==== DONE ====');

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function loop(_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function iterate(count) {
  return Promise.resolve().then(function () {
    return count + 1;
  });
}

loop(1000000000, new Date());
