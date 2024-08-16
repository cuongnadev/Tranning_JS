# Async/Await

- async/await help you write asynchronous code in a way that looks like synchronous code, making it easier to read and manage.

    - Declare a function with the async keyword, that function will always return a Promise.
    - await keyword can only be used inside async functions.
    - It stops the execution of the async function until the Promise it is waiting on is resolved or rejected.
    - If the Promise is resolved, await returns the value that the Promise resolved.
    - If the Promise is rejected, await throws an error, which you can catch using try...catch.

### Ex1:
```js
    // Hàm giả lập việc lấy dữ liệu từ API với thời gian chờ
    async function fetchData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Dữ liệu từ API");
            }, 2000); 
        });
    }

    // Hàm xử lý dữ liệu
    function processData(data) {
        console.log("Xử lý dữ liệu:", data);
    }

    async function main() {
        console.log("Bắt đầu lấy dữ liệu...");
        const data = await fetchData(); 
        processData(data); 
    }

    main();
```
```js
// Output:
Bắt đầu lấy dữ liệu...
Xử lý dữ liệu: Dữ liệu từ API
```

### Ex2:
```js
    // Hàm giả lập việc gọi API có error
    async function fetchData(url) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Giả lập một số URL sẽ gặp lỗi
                if (url === 'https://api.error.com') {
                    reject(new Error('Không thể kết nối đến ' + url));
                } else {
                    resolve(`Dữ liệu từ ${url}`);
                }
            }, 2000);
        });
    }

    async function main() {
        try {
            console.log('Bắt đầu tải dữ liệu từ API 1');
            const data1 = await fetchData('https://api.example.com/data1');
            console.log('Dữ liệu từ API 1:', data1);

            console.log('Bắt đầu tải dữ liệu từ API 2');
            const data2 = await fetchData('https://api.example.com/data2');
            console.log('Dữ liệu từ API 2:', data2);

            console.log('Bắt đầu tải dữ liệu từ API 3');
            const data3 = await fetchData('https://api.error.com'); // URL này sẽ gây lỗi
            console.log('Dữ liệu từ API 3:', data3);

            console.log('Tất cả dữ liệu đã được tải thành công');
        } catch (error) {
            console.error('Lỗi đã xảy ra:', error.message);
        }
    }

    main();
```
```js
// Output:
Bắt đầu tải dữ liệu từ API 1
Dữ liệu từ API 1: Dữ liệu từ https://api.example.com/data1
Bắt đầu tải dữ liệu từ API 2
Dữ liệu từ API 2: Dữ liệu từ https://api.example.com/data2
Bắt đầu tải dữ liệu từ API 3
Lỗi đã xảy ra: Không thể kết nối đến https://api.error.com
```