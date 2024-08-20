export function addScriptToHead(url: string) {
  const script = document.createElement('script');
  script.defer = true;
  script.src = url;
  document.getElementsByTagName('head')[0].insertAdjacentElement('afterbegin', script);
}
