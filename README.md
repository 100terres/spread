# @100terres/spread

Ergonomic conditional spread.

<p>
  <a href="https://www.npmjs.com/package/@100terres/spread">
    <img
      alt="@100terres/spread npm's version badge."
      src="https://img.shields.io/npm/v/@100terres/spread.svg"
    />
  </a>
  <a href="LICENSE">
    <img
      alt="@100terres/spread is released under the MIT license."
      src="https://img.shields.io/badge/license-MIT-blue.svg"
    />
  </a>
</p>

## Why?

Instead of using an if statement with `Object.assign`.

```js
function buildConfig(host, isSecure) {
  const config = { host, protocol: "http" };

  if (isSecure) {
    Object.assign(config, { ssl: true, protocol: "https" });
  }

  return config;
}
```

Instead of using a ternary operator wrapped in parentheses, which either returns
the object to spread or an empty object literal.

```js
const buildConfig = (host, isSecure) => ({
  host,
  protocol: "http",
  ...(isSecure ? { ssl: true, protocol: "https" } : {}),
});
```

You can use this easy-to-read utility.

```js
import spread from "@100terres/spread";

const buildConfig = (host, isSecure) => ({
  host,
  protocol: "http",
  ...spread({ ssl: true, protocol: "https" }).if(isSecure),
});
```

See the [usage section](#usage) for more examples.

## Getting Started

Install `@100terres/spread` using the package manager of your choosing, import
it and start using it!

### Using npm

```bash
npm install @100terres/spread
```

### Using pnpm

```bash
pnpm add @100terres/spread
```

### Using yarn

```bash
yarn add @100terres/spread
```

## Usage

### Overview

| Examples                             | Description                                              |
| ------------------------------------ | -------------------------------------------------------- |
| `spread(object).if(condition)`       | Returns `object` when `condition` is truthy              |
| `spread(object).unless(condition)`   | Returns `object` when `condition` is falsy               |
| `spread(array).if(condition)`        | Returns `array` when `condition` is truthy               |
| `spread(array).unless(condition)`    | Returns `array` when `condition` is falsy                |
| `spread(callback).if(condition)`     | Returns value from `callback` when `condition` is truthy |
| `spread(callback).unless(condition)` | Returns value from `callback` when `condition` is falsy  |

**Disclaimer**

If the condition isn't met the function returns an empty array. Since an empty
array can be spread into both objects and arrays, nothing is added in either
case.

### With `if` method

It returns the object passed if the condition is truthy.

```ts
import spread from "@100terres/spread";

// { foo: "bar", baz: "qux" }
const a = {
  foo: "bar",
  ...spread({ baz: "qux" }).if(true),
};

// { foo: "bar" }
const b = {
  foo: "bar",
  ...spread({ baz: "qux" }).if(false),
};
```

### With `unless` method

It returns the object passed if the condition is falsy. In this example, we'll
use an array, instead of an object.

```ts
import spread from "@100terres/spread";

// [ "foo", "bar" ]
const a = ["foo", "bar", ...spread(["baz", "qux"]).unless(true)];

// [ "foo", "bar", "baz", "qux" ]
const a = ["foo", "bar", ...spread(["baz", "qux"]).unless(false)];
```

### With a callback

It conditionally invokes the callback.

```js
import spread from "@100terres/spread";

// It will also log "Hello World!"
// { foo: "bar", baz: "qux" }
const a = {
  foo: "bar",
  ...spread(() => {
    console.log("Hello World!");

    return { baz: "qux" };
  }).if(true),
};

// It won’t log "Hello World!"
// { foo: "bar" }
const b = {
  foo: "bar",
  ...spread(() => {
    console.log("Hello World!");

    return { baz: "qux" };
  }).if(false),
};
```

### JSX example

It can increase the readability of your JSX code.

```jsx
import spread from "@100terres/spread";

const SubmitButton = (props) => {
  const { isSubmitting } = props;

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      {...spread({ className: "is-loading" }).if(isSubmitting)}
    >
      Submit
    </button>
  );
};
```

## License

Licensed under the [MIT license](LICENSE).

## Acknowledgements

[Mathieu Mazy](https://github.com/TiuSh) is the original author of the utility
itself.

I've created, published, and maintained `@potloc/spready` package, but I no
longer work at Potloc, and I've lost access to the repo, so I've decided to
bring it back to life under `@100terres/spread`.
