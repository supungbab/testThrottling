const DoubleLinkedList = require('./testLinkedListArray');


class Throttler {
  constructor(maxConcurrency) {
    this.maxConcurrency = maxConcurrency;
    this.activeCount = 0;
    this.queue = new DoubleLinkedList();
  }

  async run(asyncFunction) {
    return new Promise(async (resolve, reject) => {
      const task = async () => {
        try {
          const t = +new Date();
          await asyncFunction();
          const result = new Date() - t;
          resolve(result);
        } catch (error) {
          reject(error);
        }

        this.activeCount--;
        if (this.queue.length > 0) {
          const nextTask = this.queue.shift();
          nextTask();
        }
      };

      if (this.activeCount >= this.maxConcurrency) {
        this.queue.push(task);
      } else {
        this.activeCount++;
        task().then();
      }
    });
  }
}
const sleep = time => new Promise(res => setTimeout(res, time));

function createAsyncFunctions() {
  return [() => sleep(200), () => sleep(500), () => sleep(400), () => sleep(500)];
}

(async () => {
  const asyncFunctions = createAsyncFunctions();
  // createAsyncFunctions 는 [sleep(n), sleep(n), sleep(n), sleep(n)] 로 가정한다.
  const maxConcurrency = 2;
  const throttler = new Throttler(maxConcurrency);

  console.time('done');
  const result = await Promise.all([
    throttler.run(asyncFunctions[0]), // asyncFunction[0]: 200ms
    throttler.run(asyncFunctions[1]), // asyncFunction[1]: 500ms
    throttler.run(asyncFunctions[2]), // asyncFunction[2]: 400ms
    throttler.run(asyncFunctions[3]), // asyncFunction[3]: 500ms
  ]);
  console.log(result);
  console.timeEnd('done');
})();

