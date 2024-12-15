export const executeAdCode = (container: HTMLElement, adCode: string) => {
  console.log('Executing ad code in container:', container.id);
  
  if (!adCode || !container) {
    console.log('Missing ad code or container, skipping execution');
    return;
  }

  try {
    // Clear existing content
    container.innerHTML = '';
    
    // Create a wrapper div for the ad
    const adWrapper = document.createElement('div');
    adWrapper.className = 'ad-wrapper';
    container.appendChild(adWrapper);
    
    // Add the AdSense code
    adWrapper.innerHTML = adCode;
    
    // Try to push the ad
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } else {
        console.log('AdSense not initialized yet');
      }
    } catch (e) {
      console.log('Error pushing ad:', e);
    }
    
    console.log(`Ad code execution completed for ${container.id}`);
  } catch (error) {
    console.error(`Error executing ad code in ${container.id}:`, error);
  }
};

export const loadAndExecuteAds = () => {
  if ((window as any).adLoadTimeout) {
    clearTimeout((window as any).adLoadTimeout);
  }

  (window as any).adLoadTimeout = setTimeout(() => {
    try {
      const settings = localStorage.getItem("adminSettings");
      const topAdCode = localStorage.getItem("adminTopAdCode");
      const bottomAdCode = localStorage.getItem("adminBottomAdCode");
      
      console.log('Loading ads with settings:', settings);
      
      if (topAdCode) {
        const topContainer = document.getElementById('top-ad-container');
        if (topContainer) {
          executeAdCode(topContainer, topAdCode);
        }
      }
      
      if (bottomAdCode) {
        const bottomContainer = document.getElementById('bottom-ad-container');
        if (bottomContainer) {
          executeAdCode(bottomContainer, bottomAdCode);
        }
      }
    } catch (error) {
      console.error('Error in loadAndExecuteAds:', error);
    }
  }, 1000);
};