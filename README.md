# @diegoh/api-middleware-response-time

![](https://github.com/diegoh/api-middleware-response-time/workflows/Test/badge.svg) ![](https://github.com/diegoh/api-middleware-response-time/workflows/Security/badge.svg) ![](https://github.com/diegoh/api-middleware-response-time/workflows/Publish/badge.svg)

Sets `X-Response-Time` header to the ctx object.

## Usage

### Example

```js
const responseTime = require('@diegoh/api-middleware-response-time');
const Koa = require('koa');

const app = new Koa();
app.use(responseTime());
```

## Development

1. Create a new branch from `master` with a name relevant to the changes you're making. `git branch -b my-new-feature-description`
2. Push the branch and open a Pull Request (PR).
3. Request a code review.
4. **Squash merge** your commits and keep things tidy.

### Unit Tests

`npm run test:unit`

### Coverage

`npm run test:coverage`

### Lint

`npm run lint` or `npm run lint-fix` to automatically fix any linting issues.

### CI/CD

This project uses GitHub actions for CI/CD.
The following secrets are required to publish this package.

- `NPM_TOKEN`
