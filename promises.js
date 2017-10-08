function loop(times, lastMark, count = 1, countAtLastMark = 1) {
  return Promise.resolve().then(() => {
    const now = new Date();
    const diff = now - lastMark;
    if (count === 1) {
      console.log('total_iterations, iterations_per_second, memory_usage');
    } else if (now - lastMark >= 1000) {
      console.log(`${count}, ${(count - countAtLastMark) / (diff / 1000)}, ${process.memoryUsage().rss}`);

      lastMark = now;
      countAtLastMark = count;
    }

    return times === count
      ? Promise.resolve()
      : loop(times, lastMark, count + 1, countAtLastMark);
  });
}

console.log('==== BEGIN ====');
console.log();

loop(1000000000, new Date()).then(() => {
  console.log();
  console.log('==== DONE ====');
});
