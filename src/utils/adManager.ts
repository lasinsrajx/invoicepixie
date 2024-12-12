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
    
    // First inject the non-script content
    const contentWithoutScripts = adCode.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    adWrapper.innerHTML = contentWithoutScripts;

    // Extract script tags
    const scriptMatch = adCode.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);
    if (!scriptMatch) {
      console.log('No script tags found in ad code');
      return;
    }

    // Load scripts sequentially
    scriptMatch.forEach((scriptCode) => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = scriptCode;
      const originalScript = tempDiv.querySelector('script');
      
      if (originalScript) {
        const newScript = document.createElement('script');
        
        // Copy all attributes from original script
        Array.from(originalScript.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });

        // Add required attributes for proper loading
        newScript.async = true;
        newScript.defer = true;
        newScript.setAttribute('data-cfasync', 'false');
        
        // Copy inline script content if present
        if (originalScript.textContent) {
          newScript.textContent = originalScript.textContent;
        }

        // Append script to document body
        document.body.appendChild(newScript);
      }
    });
    
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
      const topAdCode = localStorage.getItem("adminTopAdCode");
      const bottomAdCode = localStorage.getItem("adminBottomAdCode");
      
      console.log('Loading top ad code:', topAdCode);
      console.log('Loading bottom ad code:', bottomAdCode);
      
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
  }, 1500); // Wait for 1.5 seconds to ensure DOM is ready
};