const nests = {
    "Nest A": { scalpel: "Nest B" },
    "Nest B": { scalpel: "Nest C" },
    "Nest C": { scalpel: "Nest C" }
};

function anyStorage(nest, key) {
return new Promise((resolve, reject) => {
    // Giả lập việc truy xuất dữ liệu với thời gian trễ
    setTimeout(() => {
    if (nests[nest] && nests[nest][key]) {
        resolve(nests[nest][key]);
    } else {
        reject(new Error("Không tìm thấy khóa"));
    }
    }, 300);
});
}
  
// sử dụng async/await
async function locateScalpel_async(nest) {
    let currentNest = nest;
    while (true) {
        let nextNest = await anyStorage(currentNest, "scalpel");
        if (nextNest === currentNest) {
        return currentNest;
        }
      currentNest = nextNest;
    }
}

// ko sử dụng async/await
function locateScalpel(nest) {
    function findScalpel(currentNest) {
        return anyStorage(currentNest, "scalpel").then(nextNest => {
            if (nextNest === currentNest) {
            return currentNest;
            } else {
            return findScalpel(nextNest);
            }
        });
    }
  
    return findScalpel(nest);
}


locateScalpel_async("Nest A")
    .then(location => { 
        console.log("Phiên bản async/await: Con dao mổ đang ở: ", location);
    })
    .catch(error => {
        console.error("Lỗi: ", error);
    });

locateScalpel("Nest A")
    .then(location => { 
        console.log("Phiên bản Promise: Con dao mổ đang ở: ", location);
    })
    .catch(error => {
        console.error("Lỗi: ", error);
    });
  
  