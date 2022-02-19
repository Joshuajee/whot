export function catchAsync (fn) {
    return () => {
      fn.catch();
    };
};
  