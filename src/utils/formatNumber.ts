const formatNumber = (n: number) => {
  const val = Math.round(Number(n) * 100) / 100;
  const part1 = val.toString().split('.')[0];
  let part2 = val.toString().split('.')[1];
  if (!part2) part2 = '.00';
  else if (part2.length === 1) part2 = `.${part2}0`;
  else part2 = `.${part2}`;

  const num = part1.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + part2;

  return num;
};

export default formatNumber;
