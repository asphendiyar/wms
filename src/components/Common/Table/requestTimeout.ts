const noop = () => {};

export const requestTimeout = <HandlerArgs>(
  fn: (args: HandlerArgs) => void,
  delay: number,
  registerCancel: (arg0: { (): void; (): void; (): void }) => void,
  args: HandlerArgs
) => {
  const start = new Date().getTime();

  const loop = () => {
    const delta = new Date().getTime() - start;

    if (delta >= delay) {
      fn(args);
      registerCancel(noop);
      return;
    }

    const raf = requestAnimationFrame(loop);
    registerCancel(() => cancelAnimationFrame(raf));
  };

  const raf = requestAnimationFrame(loop);
  registerCancel(() => cancelAnimationFrame(raf));
};
