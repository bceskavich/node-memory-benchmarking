const v8 = require('v8');

function loop(times, lastMark, count = 0, countAtLastMark = 0) {
  return Promise.resolve().then(() => {
    const now = new Date();
    const diff = now - lastMark;
    if (count !== 0 && diff >= 100) {
      console.log('WRITING PROFILE LAST 100ms');
      lastMark = now;
      countAtLastMark = count;
    }

    return times === count
      ? Promise.resolve()
      : loop(times, lastMark, count + 1, countAtLastMark);
  });
}

function demo() {
  console.log('==== BEGIN ====');
  console.log();

  loop(1000000000, new Date()).then(() => {
    console.log();
    console.log('==== DONE ====');
  });
}

demo();
