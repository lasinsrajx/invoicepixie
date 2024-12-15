export const getAdminSettings = () => {
  const topAdCode = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7532649863699049"
     crossorigin="anonymous"></script>
<!-- invoice web -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7532649863699049"
     data-ad-slot="6556707089"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`;

  const bottomAdCode = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7532649863699049"
     crossorigin="anonymous"></script>
<!-- invoice web 2 -->
<ins class="adsbygoogle"
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
    topAdCode: localStorage.getItem('adminTopAdCode') || topAdCode,
    bottomAdCode: localStorage.getItem('adminBottomAdCode') || bottomAdCode,
  };
};

export const saveAdminSettings = (settings: {
  bankName: string;
  accountNumber: string;
  topAdCode?: string;
  bottomAdCode?: string;
}) => {
  localStorage.setItem('adminBankName', settings.bankName);
  localStorage.setItem('adminAccountNumber', settings.accountNumber);
  if (settings.topAdCode) localStorage.setItem('adminTopAdCode', settings.topAdCode);
  if (settings.bottomAdCode) localStorage.setItem('adminBottomAdCode', settings.bottomAdCode);
  
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
