export const getAdminSettings = () => {
  const defaultTopAdCode = `<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7532649863699049"
     data-ad-slot="6556707089"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`;

  const defaultBottomAdCode = `<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7532649863699049"
     data-ad-slot="4846472922"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`;

  return {
    bankName: localStorage.getItem('adminBankName') || '',
    accountNumber: localStorage.getItem('adminAccountNumber') || '',
    topAdCode: localStorage.getItem('adminTopAdCode') || defaultTopAdCode,
    bottomAdCode: localStorage.getItem('adminBottomAdCode') || defaultBottomAdCode,
    fullPageAdCode: localStorage.getItem('adminFullPageAdCode') || defaultTopAdCode,
  };
};

export const saveAdminSettings = (settings: {
  bankName: string;
  accountNumber: string;
  topAdCode?: string;
  bottomAdCode?: string;
  fullPageAdCode?: string;
}) => {
  localStorage.setItem('adminBankName', settings.bankName);
  localStorage.setItem('adminAccountNumber', settings.accountNumber);
  if (settings.topAdCode) localStorage.setItem('adminTopAdCode', settings.topAdCode);
  if (settings.bottomAdCode) localStorage.setItem('adminBottomAdCode', settings.bottomAdCode);
  if (settings.fullPageAdCode) localStorage.setItem('adminFullPageAdCode', settings.fullPageAdCode);
  
  // Store complete settings object for ads.html
  localStorage.setItem('adminSettings', JSON.stringify(settings));
  
  // Trigger any subscribers
  subscribers.forEach(callback => callback(getAdminSettings()));
};

const subscribers: Array<(settings: ReturnType<typeof getAdminSettings>) => void> = [];

export const subscribeToAdminSettings = (callback: (settings: ReturnType<typeof getAdminSettings>) => void) => {
  subscribers.push(callback);
  callback(getAdminSettings()); // Call immediately with current settings
  return () => {
    const index = subscribers.indexOf(callback);
    if (index > -1) {
      subscribers.splice(index, 1);
    }
  };
};