import { createMockContext } from '@shopify/jest-koa-mocks';
import { DefaultContext, Next } from 'koa';
import setup from './index';

describe('src/index', () => {
  let middleware: (ctx: DefaultContext, next: Next) => {};
  let ctx: DefaultContext;
  const headerName = 'X-Response-Time';

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    ctx = createMockContext();
    middleware = setup();
  });

  it('calls next()', async () => {
    const next = jest.fn();
    await middleware(ctx, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('sets X-Response-Time header', async () => {
    const next = jest.fn();
    await middleware(ctx, next);
    const actual = Number.parseInt(ctx.response.get(headerName), 10);
    expect(actual).toBeGreaterThanOrEqual(0);
  });

  describe('handling errors', () => {
    it('sets X-Response-Time header', async () => {
      const next = jest.fn();
      next.mockImplementation(() => {
        throw new Error('errr!');
      });

      try {
        await middleware(ctx, next);
        throw new Error('Should have thrown');
      } catch (err) {
        expect(err.message).toBe('errr!');
      }

      const actual = Number.parseInt(ctx.response.get(headerName), 10);

      expect(actual).toBeGreaterThanOrEqual(0);
    });
  });
});
