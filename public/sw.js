// Only document navigations need an offline fallback. API responses stay out of Cache Storage.
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || request.mode !== "navigate" ||
      new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(fetch(request).catch(() => new Response(
    '<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>오프라인 · Ubique Prayer</title><main><h1>인터넷 연결을 확인해 주세요</h1><p>연결이 복구되면 페이지를 새로고침해 주세요.</p><a href="/">홈으로 다시 접속</a></main></html>',
    { status: 503, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } },
  )));
});
