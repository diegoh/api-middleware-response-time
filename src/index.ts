import { DefaultContext, Next } from 'koa';

const getUTCMilliseconds = (): number => new Date().getTime();

const setHeader = (ctx: DefaultContext, start: number): void => {
  const now = getUTCMilliseconds();
  const millisecondsElapsed = now - start;
  ctx.response.set('X-Response-Time', millisecondsElapsed);
};

export default () =>
  async function responseTimeMiddleware(
    ctx: DefaultContext,
    next: Next
  ): Promise<void> {
    const start = getUTCMilliseconds();

    try {
      await next();
    } finally {
      setHeader(ctx, start);
    }
  };
