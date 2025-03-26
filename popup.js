document.addEventListener('DOMContentLoaded', function() {
  const fallbackToggle = document.getElementById('fallbackToggle');
  const currentService = document.getElementById('currentService');
  const resetButton = document.getElementById('resetButton');
  
  chrome.storage.local.get(['useFallback', 'fallbackUntil'], function(data) {
    const currentTime = new Date().getTime();
    
    fallbackToggle.checked = data.useFallback || false;
    
    if (data.useFallback && data.fallbackUntil && currentTime < data.fallbackUntil) {
      currentService.textContent = 'Claude (fallback)';
      
      const endTime = new Date(data.fallbackUntil);
      const hours = endTime.getHours().toString().padStart(2, '0');
      const minutes = endTime.getMinutes().toString().padStart(2, '0');
      const statusMessage = document.getElementById('statusMessage');
      statusMessage.innerHTML += `<br>Fallback active until: ${hours}:${minutes}`;
    } else {
      currentService.textContent = 'ChatGPT';
    }
  });
  
  fallbackToggle.addEventListener('change', function() {
    if (fallbackToggle.checked) {
      // Set fallback for 6 hours
      const sixHoursFromNow = new Date().getTime() + (6 * 60 * 60 * 1000);
      chrome.storage.local.set({
        useFallback: true,
        fallbackUntil: sixHoursFromNow
      });
      currentService.textContent = 'Claude (fallback)';
    } else {
      chrome.storage.local.set({
        useFallback: false
      });
      currentService.textContent = 'ChatGPT';
    }
  });
  
  // Reset button
  resetButton.addEventListener('click', function() {
    chrome.storage.local.set({
      useFallback: false,
      fallbackUntil: null
    });
    fallbackToggle.checked = false;
    currentService.textContent = 'ChatGPT';
    
    // Update status message
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.innerHTML = 'Currently using: <span id="currentService">ChatGPT</span>';
  });
}); 