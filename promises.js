const logProfile = require('./logProfile');

function loop(times, lastMark, start, count = 0, countAtLastMark = 0) {
  return Promise.resolve().then(() => {
    const now = new Date();
    const diff = now - lastMark;
    if (count === 0) {
      console.log('event_type, timestamp, total_iterations, iterations_per_second, resident_set_size, percent_heap_used, percent_new_space_used, percent_old_space_used');
    } else if (diff >= 100) {
      logProfile(now - start, count, countAtLastMark, diff);
      lastMark = now;
      countAtLastMark = count;
    }

    return times === count
      ? Promise.resolve()
      : loop(times, lastMark, start, count + 1, countAtLastMark);
  });
}

console.log('==== BEGIN ====');
console.log();

loop(1000000000, new Date(), new Date()).then(() => {
  console.log();
  console.log('==== DONE ====');
});
