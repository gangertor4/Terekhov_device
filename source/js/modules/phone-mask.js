const element = document.querySelectorAll('.phone');
const maskOptions = {
  mask: '+{7}(000)000-00-00',
};

element.forEach((el) => {
  const mask = IMask(el, maskOptions);
});
