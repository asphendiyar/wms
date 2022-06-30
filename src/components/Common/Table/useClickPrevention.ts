import { useEffect, useRef } from "react";
import { requestTimeout } from "./requestTimeout";

const noop = () => {};

const useCancelableScheduledWork = () => {
  const cancelCallback = useRef(noop);
  const registerCancel = (fn: () => void) => (cancelCallback.current = fn);
  const cancelScheduledWork = () => cancelCallback.current();

  useEffect(() => {
    return cancelScheduledWork;
  }, []);

  return [registerCancel, cancelScheduledWork];
};

type UseClickPreventionParams<HandlerArgs> = {
  onClick?: (args: HandlerArgs) => void;
  onDoubleClick?: (args: HandlerArgs) => void;
  delay: number;
};
export const useClickPrevention = <HandlerArgs>({
  onClick,
  onDoubleClick,
  delay = 300,
}: UseClickPreventionParams<HandlerArgs>) => {
  const [registerCancel, cancelScheduledWork] = useCancelableScheduledWork();

  const handleClick = (args: HandlerArgs) => {
    // @ts-ignore
    cancelScheduledWork();
    onClick &&
      requestTimeout<HandlerArgs>(onClick, delay, registerCancel, args);
  };

  const handleDoubleClick = (args: HandlerArgs) => {
    // @ts-ignore
    cancelScheduledWork();
    onDoubleClick && onDoubleClick(args);
  };

  return [handleClick, handleDoubleClick];
};
