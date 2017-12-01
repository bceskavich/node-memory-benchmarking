const v8 = require('v8');

function loop(times, lastMark, count = 0, countAtLastMark = 0) {
  return Promise.resolve().then(() => {
    const now = new Date();
    const diff = now - lastMark;
    if (count !== 0 && diff >= 100) {
      logProfile(count, countAtLastMark, diff);
      lastMark = now;
      countAtLastMark = count;
    }

    return times === count
      ? Promise.resolve()
      : loop(times, lastMark, count + 1, countAtLastMark);
  });
}

function logProfile(count, countAtLastMark, diff) {
  const usage = process.memoryUsage();
  const heapStats = v8.getHeapStatistics();
  const heapSpaceStats = v8.getHeapSpaceStatistics();
  const newSpaceStats = getSpaceStats(heapSpaceStats, 'new_space');
  const oldSpaceStats = getSpaceStats(heapSpaceStats, 'old_space');

  const info = [
    'PROFILE',
    process.uptime() * 1000,
    count,
    (count - countAtLastMark) / (diff / 1000),
    usage.rss,
    (heapStats.used_heap_size / heapStats.total_heap_size) * 100,
    (newSpaceStats.space_used_size / newSpaceStats.space_size) * 100,
    (oldSpaceStats.space_used_size / oldSpaceStats.space_size) * 100
  ];

  console.log((oldSpaceStats.space_used_size / oldSpaceStats.space_size) * 100);
};

function getSpaceStats(spaceStats, name) {
  return spaceStats.find(({ space_name }) => space_name === name);
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
