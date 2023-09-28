const containerServiceEl = document.querySelector('#_container-service');
if (containerServiceEl) {
  while (containerServiceEl.firstChild) {
    containerServiceEl.removeChild(containerServiceEl.lastChild);
  }

  const div = document.createElement('div');
  div.style.textAlign = 'center';
  div.style.padding = '20px';
  div.style.fontFamily = 'Roboto, sans-serif';

  const h3 = document.createElement('h3');
  h3.innerText = 'You are offline';
  h3.style.fontSize = '1.75rem';
  h3.style.fontWeight = '500';
  h3.style.fontFamily = 'Roboto, sans-serif';
  h3.style.lineHeight = '1.2';
  h3.style.margin = '0';
  h3.style.marginBottom = '0.5rem';

  const p = document.createElement('p');
  p.innerText = 'Check your internet connection.';
  p.style.fontSize = '1rem';
  p.style.fontWeight = '100';
  p.style.fontFamily = 'Roboto, sans-serif';
  p.style.lineHeight = '1.2';
  p.style.margin = '0';
  p.style.marginBottom = '0.5rem';

  div.appendChild(h3);
  div.appendChild(p);

  containerServiceEl.appendChild(div);
}
