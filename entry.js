(async () => {
  const key = new URLSearchParams(location.hash.slice(1)).get('key');
  history.replaceState(null, '', location.pathname);
  if (!key || !/^[A-Za-z0-9_-]{43}$/.test(key)) return;
  const status = document.getElementById('status');
  status.textContent = 'Opening the reviewer preview…';
  try {
    const response = await fetch('./origin.json?t=' + Date.now(), {cache: 'no-store'});
    if (!response.ok) throw new Error();
    const origin = (await response.json()).origin;
    if (typeof origin !== 'string' || !/^https:\/\/[a-z0-9-]+\.trycloudflare\.com$/.test(origin)) throw new Error();
    const dest = new URL('/review', origin);
    dest.hash = new URLSearchParams({key}).toString();
    location.replace(dest.href);
  } catch {
    status.textContent = 'The reviewer preview is temporarily unavailable. Reopen your invitation to try again.';
  }
})();
