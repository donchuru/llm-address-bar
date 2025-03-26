(function () {
  function checkForTokenLimits() {
    const errorMessages = [
      "You've reached our limit of messages",
      "You've used your quota",
      "Free plan limit reached",
      "Please upgrade",
      "Rate limit reached",
    ];

    const pageContent = document.body.innerText;

    const hitLimit = errorMessages.some((msg) => pageContent.includes(msg));

    if (hitLimit) {
      console.log("ChatGPT token limit detected, switching to fallback");

      const sixHoursFromNow = new Date().getTime() + 6 * 60 * 60 * 1000;
      chrome.storage.local.set({
        useFallback: true,
        fallbackUntil: sixHoursFromNow,
      });

      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get("q");

      if (query) {
        window.location.href = `https://claude.ai/chat?q=${encodeURIComponent(
          query
        )}`;
      }
    }
  }

  setTimeout(checkForTokenLimits, 2000);
})();
