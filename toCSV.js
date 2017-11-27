const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

const gcLogRegex = /\[\d{5}:0x\S{9}\]\s+(\d+)\sms:/;
const markSweepLogRegex = /\[\d{5}:0x\S{9}\]\s+(\d+)\sms:\sMark-sweep/;

function processFile(inputFile) {
  const rl = readline.createInterface(fs.createReadStream(inputFile), new stream());

  rl.on('line', line => {
    if (gcLogRegex.test(line)) {
      if (markSweepLogRegex.test(line)) {
        const timestamp = line.match(gcLogRegex)[1];
        console.log(`MARK_SWEEP, ${timestamp}`);
      }
    } else {
      console.log(line);
    }
  });

  rl.on('close', () => process.exit(0));
}

// processFile('./outputs/redux/async_await_untranspiled_trimmed.txt');
