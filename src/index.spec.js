const assert = require('assert');
const td = require('testdouble');

describe('src/index', () => {
  let setupResponseTime;
  let responseTime;
  let ctx;

  beforeEach(() => {
    ctx = {
      set: td.function()
    };
    setupResponseTime = require('./index');
    responseTime = setupResponseTime();
  });

  afterEach(() => {
    td.reset();
  });

  it('exports a function', () => {
    assert.strictEqual(typeof responseTime, 'function');
  });

  it('calls next()', async () => {
    const next = td.function();

    await responseTime(ctx, next);
    td.verify(next());
  });

  it('sets X-Response-Time header', async () => {
    const captor = td.matchers.captor();

    const next = td.function();

    await responseTime(ctx, next);
    td.verify(ctx.set('X-Response-Time', captor.capture()));

    assert.ok(/^\d+ms$/.test(captor.values[0]));
  });

  describe('handling errors', () => {
    it('sets X-Response-Time header', async () => {
      const captor = td.matchers.captor();

      const next = td.function();

      const error = new Error('Err!!');
      td.when(next()).thenReject(error);

      try {
        await responseTime(ctx, next);
        assert.fail('should have errored');
      } catch (err) {
        assert.strictEqual(err.message, 'Err!!');
      }

      td.verify(ctx.set('X-Response-Time', captor.capture()));

      assert.ok(/^\d+ms$/.test(captor.values[0]));
    });
  });
});
