function Promise_all(promises) {
    return new Promise((resolve, reject) => {
        let results = [];
        let completedCount = 0;
  
        if (promises.length === 0) {
        resolve(results);
        }
  
        promises.forEach((promise, index) => {
            Promise.resolve(promise)
            .then(
                value => {
                    results[index] = value;
                    completedCount++;
                    if (completedCount === promises.length) {
                    resolve(results);
                    }
                },
                error => {
                    reject(error); // Ngay lập tức bị từ chối khi có lỗi
                }
            );
        });
    });
}


const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});
const promise4 = new Promise((resolve, reject) => {
  setTimeout(reject, 200, 'bar');
});

Promise_all([promise1, promise2, promise3])
    .then(values => {
        console.log('Tất cả đã hoàn thành:', values);
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });

Promise_all([promise1, promise2, promise4])
    .then(values => {
        console.log('Tất cả đã hoàn thành:', values);
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });

  