# redux-saga

## 소개

redux-saga는 redux-thunk 다음으로 가장 많이 사용되는 라이브러리입니다.

redux-thunk의 경우엔 함수를 디스패치할 수 있게 만들어 주는 미들웨어 였습니다. redux-saga의 경우엔, 액션을 모니터링하고 있다가, 특정 액션이 발생하면 이에 따라 특정 작업을 하는 방식으로 사용합니다. 여기서 특정 작업이란, 자바스크립트를 실행하는 것 일수도 있고, 다른 액션을 디스패치 하는 것 일수도 있고, 현재 상태를 불러오는 것 일수도 있습니다.

redux-saga는 redux-thunk로 못하는 다양한 작업들을 처리 할 수 있습니다. 

	1. 비동기 작업을 할 떄 기존 요청을 취소 처리 할 수 있습니다.
 	2. 특정 액션이 발생했을 때 이에 따라 다른 액션이 디스패치 되게끔 하거나, 자바스크립트 코드를 실행 할 수 있습니다.
 	3. 웹소켓을 사용하는 경우 Channel 이라는 기능을 사용하여 더욱 효율적으로 코드를 관리 할 수 있습니다 [(참고)](https://medium.com/@pierremaoui/using-websockets-with-redux-sagas-a2bf26467cab)
	4. API 요청이 실패했을 때 재요청하는 작업을 할 수 있습니다.

redux-saga는 다양한 상황에 쓸 수 있는 만큼, 제공되는 기능도 많고, 사용방법도 진입장벽이 꽤나 큽니다. 자바스크립트 초심자라면 생소할만한 [Generator](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Generator) 문법을 사용하는데요, 이 문법을 이해하지 못하면 redux-saga를 배우는 것이 매우 어려우니, 이 문법부터 작동방식을 이해해보도록 하겠습니다.

## Generator 문법 배우기

이 문법의 핵심 기능은 함수를 작성 할 떄 함수를 특정 구간에 멈춰놓을 수도 있고, 원할 때 다시 돌아가게 할 수도 있습니다. 그리고 결과값을 여러번 반환 할 수도 있습니다.

예를 들어서 다음과 같은 함수가 있다고 가정해봅시다.

~~~react
function weirdFunction() {
  return 1;
  return 2;
  return 3;
  return 4;
  return 5;
}
~~~

사실 함수에서 값을 여러번에 걸쳐서 반환하는 것은 불가능합니다. 이 함수는 호출 할 때마다 무조건 1을 반환하게 될 것입니다.

하지만, 제너레이터 함수를 사용하면 함수에서 값을 순차적으로 반환할 수 있습니다. 함수의 흐름을 도중에 멈춰놓았다가 나중에 이어서 진행 할 수도 있습니다.

크롬 개발자 도구의 콘솔에서 다음 함수를 한번 작성해보세요.

~~~react
function* generatorFunction() {
    console.log('안녕하세요?');
    yield 1;
    console.log('제너레이터 함수');
    yield 2;
    console.log('function*');
    yield 3;
    return 4;
}
~~~

제너레이터 함수를 만들 때에는 `function*` 이라는 키워드를 사용합니다.

제너레이터 함수를 호출했을때는 한 객체가 반환되는데요, 이를 제너레이터라고 부릅니다.

함수를 작성한 뒤에는 다음 코드를 사용해 제너레이터를 생성해보세요.

~~~ react
const generator = generatorFunction();
~~~

제너레이터 함수를 호출한다고 해서 해당 함수 안의 코드가 바로 시작되지는 않습니다. `generator.next()` 를 호출해야만 코드가 실행되며, `yield`를 한 값을 반환하고 코드의 흐름을 멈춥니다.

코드의 흐름이 멈추고 나서 `generator.next()` 를 다시 호출하면 흐름이 이어서 다시 시작됩니다.

![img](https://i.imgur.com/wkAaazv.gif)

제너레이터 함수의 또 다른 예시를 알아볼까요? `next` 를 호출 할 때 인자를 전달하여 이를 제너레이터 함수 내부에서 사용 할 수도 있습니다.

~~~ 
function* sumGenerator() {
    console.log('sumGenerator이 시작됐습니다.');
    let a = yield;
    console.log('a값을 받았습니다.');
    let b = yield;
    console.log('b값을 받았습니다.');
    yield a + b;
}
~~~

![img](https://i.imgur.com/ruuoSJN.gif)

### Generator로 액션 모니터링하기

redux-saga는 액션을 모니터링 할 수 있다고 소개했었는데요, Generator를 통해 모니터링이 어떻게 이루어지는지 예시 코드를 작성해보면서 배워보도록 하겠습니다.

다음 코드를 크롬 개발자 도구 콘솔에 적어보세요.

```javascript
function* watchGenerator() {
    console.log('모니터링 시작!');
    while(true) {
        const action = yield;
        if (action.type === 'HELLO') {
            console.log('안녕하세요?');
        }
        if (action.type === 'BYE') {
            console.log('안녕히가세요.');
        }
    }
}
```

이제 제너레이터 함수를 호출하여 제너레이터를 만들고, next() 를 호출해보겠습니다.

![img](https://i.imgur.com/DHHeDXA.gif)

redux-saga에서는 이러한 원리로 액션을 모니터링하고, 특정 액션이 발생했을때 우리가 원하는 자바스크립트 코드를 실행시켜준답니다.