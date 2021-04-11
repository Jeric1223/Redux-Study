`useSelector` 의 두번째 파라미터는 `equalityFn` 인데요,

```javascript
equalityFn?: (left: any, right: any) => boolean
```

이전 값과 다음 값을 비교하여 `true`가 나오면 리렌더링을 하지 않고 `false`가 나오면 리렌더링을 합니다.

`shallowEqual`은 react-redux에 내장되어있는 함수로서, 객체 안의 가장 겉에 있는 값들을 모두 비교해줍니다.

여기서 겉에 있는 값이란, 만약 다음과 같은 객체가 있다면

```javascript
const object = {
  a: {
    x: 3,
    y: 2,
    z: 1
  },
  b: 1,
  c: [{ id: 1 }]
}
```

가장 겉에 있는 값은 `object.a`, `object.b`, `object.c` 입니다. `shallowEqual` 에서는 해당 값들만 비교하고 `object.a.x` 또는 `object.c[0]` 값은 비교하지 않습니다.