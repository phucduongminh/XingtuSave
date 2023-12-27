const formatNumber = (value: number) => {
  if (value < 10000) {
    return value.toString();
  }

  const groups = value.toString().split('').reverse();
  let formattedPrice = '';

  for (let i = 0; i < groups.length; i++) {
    if (i > 0 && i % 3 === 0) {
      formattedPrice += '.';
    }
    formattedPrice += groups[i];
  }

  return formattedPrice.split('').reverse().join('');
};

export default formatNumber;
