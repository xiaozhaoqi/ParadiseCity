

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.log(err.message);
    },
  },
};

