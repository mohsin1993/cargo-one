export const requestStateRandomizer = () =>
  new Promise((resolve, reject) => {
    // Change following to 0.5 or lower if you want to check error state
    if (Math.random() > 1) {
      setTimeout(() => {
        reject(new Error("Something went wrong. Please try again!"));
      }, 500);
    } else {
      setTimeout(() => {
        resolve(undefined);
      }, 500);
    }
  });
