const GetElement = (selected) => {
  const element = document.querySelector(selected);
  if (element) return element;

  throw new Error(`Please check ${selected} selector, no such element exists.`);
};

export default GetElement;
