// content.js - Redirect from Google search to ChatGPT with Claude fallback
(function () {
  // Extract the search query from Google's URL
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("q");

  if (query) {
    chrome.storage.local.get(["useFallback", "fallbackUntil"], function (data) {
      const currentTime = new Date().getTime();

      if (
        data.useFallback &&
        data.fallbackUntil &&
        currentTime < data.fallbackUntil
      ) {
        window.location.href = `https://claude.ai/chat?q=${encodeURIComponent(
          query
        )}`;
      } else {
        window.location.href = `https://chat.openai.com/?q=${encodeURIComponent(
          query
        )}`;
      }
    });
  }
})();
