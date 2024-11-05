const toCapitalCase = text => {
  if (!text) {
    return '';
  }
  return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
};

const toLowerCase = text => {
  if (!text) {
    return '';
  }
  return text.toLowerCase();
};

const toUpperCase = text => {
  if (!text) {
    return '';
  }
  return text.toUpperCase();
};

export {toCapitalCase, toLowerCase, toUpperCase};
