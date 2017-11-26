const logProfile = require('./logProfile');

function asyncLoop(times, lastMark, start, count, countAtLastMark, onComplete) {
  const doLoop = (nextCount) => {
    if (nextCount === times) {
      onComplete();
    } else {
      const now = new Date();
      const diff = now - lastMark;
      if (nextCount === 0) {
        console.log('timestamp, total_iterations, iterations_per_second, resident_set_size, percent_heap_used, percent_new_space_used, percent_old_space_used');
      } else if (diff >= 1000) {
        logProfile(now - start, nextCount, countAtLastMark, diff);
        lastMark = now;
        countAtLastMark = nextCount;
      }

      iterate(nextCount).then(result => {
        process.nextTick(() => doLoop(result));
      }).catch(onComplete);
    }
  };

  doLoop(count);
}

function loop(times, count = 0) {
  console.log('==== BEGIN ====');
  console.log();

  return new Promise((resolve, reject) => {
    asyncLoop(times, new Date(), new Date(), count, count, err => {
      return err ? reject(err) : resolve();
    })
  }).then(() => {
    console.log();
    console.log('==== DONE ====');
  });
}

function iterate(count) {
  return Promise.resolve().then(() => count + 1);
}

loop(1000000000);
