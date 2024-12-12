export const executeAdCode = (container: HTMLElement, adCode: string) => {
  console.log('Executing ad code in container:', container.id);
  
  if (!adCode || !container) {
    console.log('Missing ad code or container, skipping execution');
    return;
  }

  try {
    // Clear existing content
    container.innerHTML = '';
    
    // First inject the non-script content
    const contentWithoutScripts = adCode.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    container.innerHTML = contentWithoutScripts;

    // Extract script tags
    const scriptMatch = adCode.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);
    if (!scriptMatch) {
      console.log('No script tags found in ad code');
      return;
    }

    // Load scripts sequentially with proper initialization
    const loadScripts = async () => {
      for (const scriptCode of scriptMatch) {
        await new Promise((resolve) => {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = scriptCode;
          const originalScript = tempDiv.querySelector('script');
          
          if (originalScript) {
            const newScript = document.createElement('script');
            
            // Copy all attributes from original script
            Array.from(originalScript.attributes).forEach(attr => {
              newScript.setAttribute(attr.name, attr.value);
            });

            // Ensure proper script loading
            newScript.async = true;
            newScript.defer = true;
            
            // Add error handling attributes
            newScript.setAttribute('crossorigin', 'anonymous');
            newScript.setAttribute('data-cfasync', 'false');
            
            // Copy inline script content if present
            if (originalScript.textContent) {
              newScript.textContent = originalScript.textContent;
            }

            // Handle script loading
            newScript.onload = () => {
              console.log(`Script loaded successfully in ${container.id}`);
              setTimeout(resolve, 100); // Small delay to ensure initialization
            };
            
            newScript.onerror = (error) => {
              console.error(`Error loading ad script in ${container.id}:`, error);
              console.error('Script src:', newScript.src);
              console.error('Script attributes:', Array.from(newScript.attributes).map(attr => `${attr.name}=${attr.value}`).join(', '));
              resolve(null);
            };

            // Append script to document body instead of container
            document.body.appendChild(newScript);
          } else {
            resolve(null);
          }
        });
      }
    };
    
    loadScripts().catch(error => {
      console.error('Error loading ad scripts:', error);
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
  }, 2000); // Increased to 2 seconds to ensure DOM and all resources are ready
};