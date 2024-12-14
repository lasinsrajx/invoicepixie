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
    
    // First inject any non-script HTML content
    const contentWithoutScripts = adCode.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    adWrapper.innerHTML = contentWithoutScripts;

    // Handle scripts separately
    const scriptTags = adCode.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);
    
    if (scriptTags) {
      scriptTags.forEach((scriptTag) => {
        const scriptElement = document.createElement('script');
        
        // Extract src if present
        const srcMatch = scriptTag.match(/src=["'](.*?)["']/);
        if (srcMatch) {
          scriptElement.src = srcMatch[1];
          scriptElement.async = true;
        }
        
        // Extract inline code if present
        const inlineCode = scriptTag.replace(/<script[^>]*>|<\/script>/gi, '').trim();
        if (inlineCode && !srcMatch) {
          scriptElement.text = inlineCode;
        }
        
        // Add error handling
        scriptElement.onerror = (error) => {
          console.error(`Error loading script in ${container.id}:`, error);
          // Create a fallback container if the script fails
          const fallbackContainer = document.createElement('div');
          fallbackContainer.id = `container-${container.id}`;
          container.appendChild(fallbackContainer);
        };

        // Add load handler
        scriptElement.onload = () => {
          console.log(`Script loaded successfully in ${container.id}`);
          // Ensure container exists for the ad
          if (!document.getElementById(`container-${container.id}`)) {
            const adContainer = document.createElement('div');
            adContainer.id = `container-${container.id}`;
            container.appendChild(adContainer);
          }
        };

        // Add to document
        document.body.appendChild(scriptElement);
      });
    }
    
    console.log(`Ad code execution completed for ${container.id}`);
  } catch (error) {
    console.error(`Error executing ad code in ${container.id}:`, error);
    // Create fallback container in case of error
    const fallbackContainer = document.createElement('div');
    fallbackContainer.id = `container-${container.id}`;
    container.appendChild(fallbackContainer);
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
  }, 2000); // Increased to 2 seconds to ensure DOM and resources are ready
};