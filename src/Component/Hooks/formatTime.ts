

const format =(time: number) => {
    const newTime =
      (Math.floor(time / 1000 / 60) + "").padStart(2, "0") +
      ":" +
      ((Math.floor(time / 1000) % 60) + "").padStart(2, "0");

    return newTime;
  };
  export default format