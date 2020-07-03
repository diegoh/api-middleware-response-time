# @diegoh/api-middleware-response-time

![Build](https://github.com/diegoh/api-middleware-response-time/workflows/Build/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Package Version](https://img.shields.io/npm/v/@diegoh/api-middleware-response-time)

Koa middleware to set `X-Response-Time` header.

## Usage

### Example

```js
const Koa = require('koa');
const responseTime = require('@diegoh/api-middleware-response-time');

const app = new Koa();
app.use(responseTime());
```

## Development

1. Create a new branch from `master` with a name relevant to the changes you're making. `git branch -b my-new-feature-description`
2. Push the branch and open a Pull Request (PR).
3. Request a code review.

### Unit Tests

`npm run test:unit`

### Coverage

`npm run test:coverage`

### Lint

`npm run lint` or `npm run lint:fix` to automatically fix any linting issues.
