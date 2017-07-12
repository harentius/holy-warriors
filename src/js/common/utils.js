function generateSequence(start, end) {
  const arr = [];

  for (let i = start; i <= end; i++) {
    arr.push(i);
  }

  return arr;
}

export { generateSequence };
