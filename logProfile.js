const v8 = require('v8');

module.exports = function logProfile(timestamp, count, countAtLastMark, diff) {
  const usage = process.memoryUsage();
  const heapStats = v8.getHeapStatistics();
  const heapSpaceStats = v8.getHeapSpaceStatistics();
  const newSpaceStats = getSpaceStats(heapSpaceStats, 'new_space');
  const oldSpaceStats = getSpaceStats(heapSpaceStats, 'old_space');

  const info = [
    timestamp,
    count,
    (count - countAtLastMark) / (diff / 1000),
    usage.rss,
    (heapStats.used_heap_size / heapStats.total_heap_size) * 100,
    (newSpaceStats.space_used_size / newSpaceStats.space_size) * 100,
    (oldSpaceStats.space_used_size / oldSpaceStats.space_size) * 100
  ];

  console.log(info.join(', '));
};

function getSpaceStats(spaceStats, name) {
  return spaceStats.find(({ space_name }) => space_name === name);
}
