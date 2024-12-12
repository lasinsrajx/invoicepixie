export const executeAdCode = (container: HTMLElement, adCode: string) => {
  console.log('Executing ad code in container:', container.id);
  
  if (!adCode || !container) {
    console.log('Missing ad code or container, skipping execution');
    return;
  }

  try {
    // Clear existing content
    container.innerHTML = '';
    
    // Create a wrapper div to isolate the ad content
    const wrapper = document.createElement('div');
    wrapper.className = 'ad-wrapper';
    
    // Set the ad code
    wrapper.innerHTML = adCode;
    
    // Get all scripts from the wrapper
    const scripts = Array.from(wrapper.getElementsByTagName('script'));
    
    // Remove scripts from wrapper (we'll re-add them properly)
    scripts.forEach(script => script.remove());
    
    // Add the wrapper to container first
    container.appendChild(wrapper);
    
    // Now add each script properly with error handling
    scripts.forEach(oldScript => {
      const newScript = document.createElement('script');
      
      // Copy all attributes
      Array.from(oldScript.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      
      // Add crossorigin attribute for better error handling
      newScript.crossOrigin = 'anonymous';
      
      // Add error handling
      newScript.onerror = (error) => {
        console.error(`Error loading ad script in ${container.id}:`, error);
      };
      
      // Add load handler
      newScript.onload = () => {
        console.log(`Script loaded successfully in ${container.id}`);
      };
      
      // Copy inline script content if any
      if (oldScript.textContent) {
        newScript.textContent = oldScript.textContent;
      }
      
      // Add the script to document head for proper execution
      document.head.appendChild(newScript);
    });
    
    console.log(`Ad code execution completed for ${container.id}`);
  } catch (error) {
    console.error(`Error executing ad code in ${container.id}:`, error);
  }
};

export const loadAndExecuteAds = () => {
  // Clear any existing timeouts
  if ((window as any).adLoadTimeout) {
    clearTimeout((window as any).adLoadTimeout);
  }

  // Add a delay before loading ads to ensure DOM is ready
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
  }, 1000); // Increased delay to 1 second to ensure DOM is ready
};