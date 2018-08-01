const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
        name: 'Thomas',
        age: 30
    });
    // reject('Something went wrong');
  }, 1500)
});

console.log('before');

promise.then((data) => {
  console.log('1', data);
  return 'Chained promise'   // can choose to return nothing
}).then((data) => {
  setTimeout(() => {
    console.log('should be some data', data);
  }, 1500)
}).catch((e) => {
  console.log('error:', e);
}); 

console.log('after');

// Promise chaining

console.log('before 2');

promise.then((data) => {
  console.log('1', data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('This is my other promise');
      // reject('Something went wrong');
    }, 2500)
  });   // can choose to return nothing
}).then((data) => {
    console.log(data);
}).catch((e) => {
  console.log('error:', e);
}); 

console.log('after 2');