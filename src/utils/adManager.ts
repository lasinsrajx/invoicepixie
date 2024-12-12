export const executeAdCode = (container: HTMLElement, adCode: string) => {
  console.log('Executing ad code in container:', container.id);
  
  // Clear existing content
  container.innerHTML = '';
  
  // Create temporary container
  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = adCode;
  
  // Extract scripts
  const scripts = Array.from(tempContainer.getElementsByTagName('script'));
  
  // Add non-script content first
  container.innerHTML = tempContainer.innerHTML;
  
  // Re-create and execute scripts
  scripts.forEach(oldScript => {
    const newScript = document.createElement('script');
    
    // Copy attributes
    Array.from(oldScript.attributes).forEach(attr => {
      newScript.setAttribute(attr.name, attr.value);
    });
    
    // Copy inline script content
    newScript.textContent = oldScript.textContent;
    
    // Replace old script with new one
    oldScript.parentNode?.replaceChild(newScript, oldScript);
  });
  
  console.log(`Ad code execution completed for ${container.id}`);
};

export const loadAndExecuteAds = () => {
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
};