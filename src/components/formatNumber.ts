const formatNumber = (value: number) => {
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);

  if (absoluteValue < 10000) {
    return isNegative ? `-${absoluteValue.toString()}` : absoluteValue.toString();
  }

  const groups = absoluteValue.toString().split('').reverse();
  let formattedPrice = '';

  for (let i = 0; i < groups.length; i++) {
    if (i > 0 && i % 3 === 0) {
      formattedPrice += '.';
    }
    formattedPrice += groups[i];
  }

  const result = formattedPrice.split('').reverse().join('');

  return isNegative ? `-${result}` : result;
};

export default formatNumber;
