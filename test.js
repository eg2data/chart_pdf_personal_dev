import { subscribe, exportDatas } from './subscriber-simple.js';

// async, await

// subscribe(exportData);

// function exportData(data) {
//     console.log(typeof data)
//     // return data; // 아니 왜.. console.log는 되는데 return은 안되는건지 이해가 안되네..
// }

subscribe()

// console.log(test) // 이건 안 돼. 시간차가 있어야, 읽을 수 있음
// const test = exportDatas();를 여기서 먼저 하고 아래서 test 불러도. 마찬가지. 없으니까.

const test = exportDatas();
console.log("test1",test)




////// 비동기, 비동기에 대한 이해가 부족해서 생기는 문제인가보다 음..
//
// 아니.. 사람들은 consume한 데이터 사용 안해? 걍 consume만 해? 뭐지?


// let test = subscribe(exportData);
// console.log(test)

// 와.. 이거 왜???
// console에는 찍히는데, 이걸 왜 가져오질 못하지 지금?
// 즉, 함수의 return값을 변수에 담아서 사용하는게 왜 안돼 지금?

// 그래도 일단 한 단계 넘어왔다
// 저거 빼먹을 수 있는 방법을 고민하자. 오케이!!!!!!!!!!!!!!!!!!!!!!!!
//

// const test = subscribe(exportData)
// console.log(test)

// const test = exportData("a");
// console.log(test)

// 비동기 처리 =>
// 현재 정황상 비동기. 이것의 코드도 아예 비동기로 바꿔서, 그렇게 받아보는 건 어떨까 하는게 찬영이 idea
// 받는 쪽이서만. 그러니까, test.js에서만.
// 강좌 보고 적용해보기.

// socket -- zoom..









