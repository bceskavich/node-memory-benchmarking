function iterate(count) {
  return Promise.resolve().then(() => count + 1);
}

function asyncLoop(times, lastMark, count, countAtLastMark, onComplete) {
  const doLoop = (nextCount) => {
    if (nextCount === times) {
      onComplete();
    } else {
      const now = new Date();
      const diff = now - lastMark;
      if (nextCount === 1) {
        console.log('total_iterations, iterations_per_second, memory_usage');
      } else if (diff >= 1000) {
        console.log(`${nextCount}, ${(nextCount - countAtLastMark) / (diff / 1000)}, ${process.memoryUsage().rss}`);

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

function loop(times, count = 1) {
  console.log('==== BEGIN ====');
  console.log();

  return new Promise((resolve, reject) => {
    asyncLoop(times, new Date(), count, count, err => {
      return err ? reject(err) : resolve();
    })
  }).then(() => {
    console.log();
    console.log('==== DONE ====');
  });
}

loop(1000000000);
