const logProfile = require('./logProfile');

async function loop(times, lastMark, count = 0) {
  console.log('==== BEGIN ====');
  console.log();

  let now;
  let diff = 0;
  let countAtLastMark = count;

  while (count < times) {
    now = new Date();
    diff = now - lastMark;
    if (count === 0) {
      console.log('event_type, timestamp, total_iterations, iterations_per_second, resident_set_size, percent_heap_used, percent_new_space_used, percent_old_space_used');
    } else if (diff >= 1000) {
      logProfile(count, countAtLastMark, diff);
      lastMark = now;
      countAtLastMark = count;
    }

    count = await iterate(count);
  }

  console.log();
  console.log('==== DONE ====');
}

function iterate(count) {
  return Promise.resolve().then(() => count + 1);
}

loop(1000000000, new Date());
