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
    
    // Now add each script properly
    scripts.forEach(oldScript => {
      const newScript = document.createElement('script');
      
      // Copy all attributes
      Array.from(oldScript.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      
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
  // Debounce the execution to prevent multiple rapid calls
  if ((window as any).adLoadTimeout) {
    clearTimeout((window as any).adLoadTimeout);
  }

  (window as any).adLoadTimeout = setTimeout(() => {
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
  }, 500); // Wait 500ms before executing to prevent multiple loads
};