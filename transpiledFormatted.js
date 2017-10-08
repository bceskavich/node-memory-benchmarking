const loop = function() {
  var generator = _asyncToGenerator(regeneratorRuntime.mark(function callee(times) {
    var count = arguments.length > 1 && arguments[1] !== undefined
      ? arguments[1]
      : 1;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(count < times)) {
              _context.next = 6;
              break;
            }

            _context.next = 3;
            return iterate(count);

          case 3:
            count = _context.sent;
            _context.next = 0;
            break;

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function loop(x2) {
    return generator.apply(this, arguments);
  }
}();

function _asyncToGenerator(fn) {
  return () => {
    const gen = fn.apply(this, arguments);

    return new Promise((resolve, reject) => {
      const step = (key, arg) => {
        try {
          const info = gen[key](arg);
          const value = info.value;
        } catch (error) {
          return reject(error);
        }

        if (info.done) {
          return resolve(value);
        }

        return Promise
          .resolve(value)
          .then(value => step('next', value))
          .catch(err => step('throw', err));
      }

      return step("next");
    });
  };
}

function iterate(count) {
  return Promise.resolve().then(() => {
    console.log('iteration:', count);
    return count + 1;
  });
}

loop(1000000000);
