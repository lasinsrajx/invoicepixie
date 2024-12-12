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
    
    // First append the wrapper
    container.appendChild(wrapper);
    
    // Extract only script tags from ad code
    const scriptMatch = adCode.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);
    if (!scriptMatch) {
      console.log('No script tags found in ad code');
      return;
    }
    
    // Load scripts sequentially
    const loadScripts = async () => {
      for (const scriptCode of scriptMatch) {
        const newScript = document.createElement('script');
        
        // Extract and copy script attributes
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = scriptCode;
        const originalScript = tempDiv.querySelector('script');
        
        if (originalScript) {
          Array.from(originalScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
          });
          
          // Add crossorigin attribute for better error handling
          newScript.crossOrigin = 'anonymous';
          
          // Copy inline script content if any
          if (originalScript.textContent) {
            newScript.textContent = originalScript.textContent;
          }
        }
        
        // Create a promise to handle script loading
        await new Promise((resolve) => {
          newScript.onload = () => {
            console.log(`Script loaded successfully in ${container.id}`);
            resolve(null);
          };
          
          newScript.onerror = (error) => {
            console.error(`Error loading ad script in ${container.id}:`, error);
            resolve(null); // Resolve anyway to continue with other scripts
          };
          
          // Add the script to document head
          document.head.appendChild(newScript);
        });
      }
    };
    
    // Execute scripts
    loadScripts().catch(error => {
      console.error('Error loading ad scripts:', error);
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

  // Add a longer delay before loading ads to ensure DOM is ready
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
  }, 2000); // Keep 2 second delay to ensure DOM is fully ready
};