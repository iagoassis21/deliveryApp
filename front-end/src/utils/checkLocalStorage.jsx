const checkLocalStorage = (param) => {
  if (JSON.parse(localStorage.getItem(`${param}`))) {
    return localStorage.setItem(`${param}`, JSON.stringify({'passa o carrinho aqui' })
  };
}