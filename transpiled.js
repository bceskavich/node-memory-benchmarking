"use strict";

var loop = (function() {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(times, lastMark) {
      var count =
        arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var now, diff, countAtLastMark;
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                console.log("==== BEGIN ====");
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
                if (count === 0) {
                  console.log(
                    "event_type, timestamp, total_iterations, iterations_per_second, resident_set_size, percent_heap_used, percent_new_space_used, percent_old_space_used"
                  );
                } else if (diff >= 1000) {
                  logProfile(count, countAtLastMark, diff);
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
                console.log("==== DONE ====");

              case 16:
              case "end":
                return _context.stop();
            }
          }
        },
        _callee,
        this
      );
    })
  );

  return function loop(_x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step("next", value);
            },
            function(err) {
              step("throw", err);
            }
          );
        }
      }
      return step("next");
    });
  };
}

var logProfile = require("./logProfile");

function iterate(count) {
  return Promise.resolve().then(function() {
    return count + 1;
  });
}

loop(1000000000, new Date());
