function* anotherGenerator() {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i) {
  yield i;
  // 在一个协程中调用另一个协程，实现协程之间的切换，
  yield* anotherGenerator(i); // 移交执行权
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next()); // { value: 10, done: false }
console.log(gen.next()); // { value: 11, done: false }
console.log(gen.next()); // { value: 12, done: false }
console.log(gen.next()); // { value: 13, done: false }
console.log(gen.next()); // { value: 20, done: false }
console.log(gen.next()); // { value: undefined, done: true }
