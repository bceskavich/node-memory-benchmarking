function iterate(count) {
  return Promise.resolve().then(() => count + 1);
}

async function loop(times, lastMark, count = 1) {
  console.log('==== BEGIN ====');
  console.log();

  let now;
  let diff = 0;
  let countAtLastMark = count;

  while (count < times) {
    now = new Date();
    diff = now - lastMark;
    if (count === 1) {
      console.log('total_iterations, iterations_per_second, memory_usage');
    } else if (diff >= 1000) {
      console.log(`${count}, ${(count - countAtLastMark) / (diff / 1000)}, ${process.memoryUsage().rss}`);

      lastMark = now;
      countAtLastMark = count;
    }

    count = await iterate(count);
  }

  console.log();
  console.log('==== DONE ====');
}

loop(1000000000, new Date());
