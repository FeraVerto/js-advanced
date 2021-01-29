console.log('lesson 2');

// Lexical environment
// http://jsflow.org/docs/lex-env/

//// Closure
// https://learn.javascript.ru/closure
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Closures
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%B7%D0%B0%D0%BC%D1%8B%D0%BA%D0%B0%D0%BD%D0%B8%D1%8F-%D0%B2-javascript-%D1%80%D0%B0%D0%B7-%D0%B8-%D0%BD%D0%B0%D0%B2%D1%81%D0%B5%D0%B3%D0%B4%D0%B0-c211805b6898
// https://www.youtube.com/watch?v=pahO5XjnfLA

//// Сurrying
// https://learn.javascript.ru/currying-partials
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%BA%D0%B0%D1%80%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B2-javascript-5ec4a1d88827

// Pattern Module
// https://habr.com/ru/company/ruvds/blog/419997/

// Recursion
// https://learn.javascript.ru/recursion
// https://www.youtube.com/watch?v=Kuq6oIN3PH0
// Задачи на замыкания


// Task 01
// Реализовать функцию sum которая суммирует 2 числа следующим образом sum(3)(6) === 9


let sum = (a: number) => {
  return function(b: number) {
    return a + b;
  };
};

sum(3)(6);

// Task 02
// Реализовать функцию makeCounter которая работает следующим образом:
// const counter = makeCounter();
// counter(); // 1
// counter(); // 2
// const counter2 = makeCounter();
// counter2(); // 1
// counter(); // 3

let makeCounter = () => {
  let count = 1;
  return function a() {
    return count++;
  };
};

const counter = makeCounter();
console.log(counter());
console.log(counter());

const counter2 = makeCounter();
console.log(counter2());
console.log(counter());

// Task 03
// Переписать функцию из Task 02 так, что бы она принимала число в качестве аргумента и это число было стартовым значением счетчика
// и возвращала следующий объект методов:
// increase: +1
// decrease: -1
// reset: установить счетчик в 0;
// set: установить счетчик в заданное значение;

let makeCounter1 = (a: number) => {
  let count = a;
  return {
    increase: () => ++count,
    decrease: () => --count,
    reset: () => count = 0,
    set: () => count = a,
  };
};

//почему не работает count++, count--
//При использовании префиксной нотации сначала происходит изменение переменной, а потом возврат.
//При использовании постфиксной нотации — наоборот: сначала возврат, а потом изменение переменной.

let counter1 = makeCounter1(4);
console.log(counter1.increase());//5
console.log(counter1.decrease());//4
console.log(counter1.reset());//0
console.log(counter1.set());//4


// Task 04*
// Реализовать функцию superSum которая принимает число в качестве аргумента, которое указывает на количество слагаемых
// и что бы корректно работали следующие вызовы:
// 1) superSum(0) //0
// 2) superSum(3)(2)(5)(3) //10
// 3) superSum(3)(2)(5,3) //10
// 4) superSum(3)(2,5,3) //10
// 5) superSum(3)(2,5)(3) //10
// 6) superSum(3)(2,5)(3,9) //10

// P.S. типизируйте только аргументы, а при вызове функции используйте @ts-ignore

function superSum(num: number) {
  if (num === 0) return 0;
  if (num === 1) return (n: number) => n;

  let _arguments: number[] = [];

  function helper(...args: number[]) {
    _arguments = [..._arguments, ...args];
    if (_arguments.length >= num) {
      _arguments.length = num;
      return _arguments.reduce((acc, number) => acc + number);
    } else {
      return helper;
    }
  }

  return helper;
}

//переписать через хвостовую рекурсию

//@ts-ignore
console.log(superSum());
/*function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}*/


// Task 05
// решить все задачи по рекурсии которые даны в конце статьи https://learn.javascript.ru/recursion
// на замыкания

//Напишите функцию sumTo(n), которая вычисляет сумму чисел 1 + 2 + ... + n.

let sumTo = (n: number): number => {
  return n === 1 ? n : n + sumTo(n - 1);
};

sumTo(3);
sumTo(100);

let sumTo1 = (n: number) => {
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    sum += i;
  }
  return sum;
};

sumTo1(100);

//a_n=a_1 + (n-1)d
let sumTo2 = (n: number) => {
  return ((n + 1) / 2) * (n);
};
sumTo2(100);


//Вычислить факториал
let getFactorial = (n: number): number => {
  return n === 1 ? n : n * getFactorial(n - 1);
};

getFactorial(5);

//Числа Фибоначчи(n-е чисто фибоначчи)
let getFib = (a: number) => {
  let arr = [1, 1];
  for (let i = 1; i <= a; i++) {
    let a = arr[i - 1] + arr[i];
    arr.push(a);
  }
  return arr[a - 1];
};

getFib(77);

/*function fib(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}*/

/*
let t0 = performance.now();
let result = getFib(77);
let t1 = performance.now();
console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to generate:', result);
*/


let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};

/*let printList = (list) => {
printList(list);*/


// just a plug
export default () => {
};