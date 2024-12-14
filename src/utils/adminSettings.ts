// Centralized admin settings management
const ADMIN_SETTINGS_KEYS = {
  BANK_NAME: "adminBankName",
  ACCOUNT_NUMBER: "adminAccountNumber",
};

export const getAdminSettings = () => {
  console.log("Getting admin settings from storage");
  return {
    bankName: localStorage.getItem(ADMIN_SETTINGS_KEYS.BANK_NAME) || "",
    accountNumber: localStorage.getItem(ADMIN_SETTINGS_KEYS.ACCOUNT_NUMBER) || "",
  };
};

export const saveAdminSettings = (settings: {
  bankName?: string;
  accountNumber?: string;
}) => {
  console.log("Saving admin settings to storage:", settings);
  
  if (settings.bankName !== undefined) {
    localStorage.setItem(ADMIN_SETTINGS_KEYS.BANK_NAME, settings.bankName);
  }
  if (settings.accountNumber !== undefined) {
    localStorage.setItem(ADMIN_SETTINGS_KEYS.ACCOUNT_NUMBER, settings.accountNumber);
  }

  // Dispatch a custom event to notify all tabs/windows
  window.dispatchEvent(new CustomEvent('adminSettingsChanged', {
    detail: settings
  }));
};

export const subscribeToAdminSettings = (callback: (settings: ReturnType<typeof getAdminSettings>) => void) => {
  console.log("Subscribing to admin settings changes");
  
  const handleStorageChange = (e: StorageEvent) => {
    console.log("Storage change detected:", e.key);
    if (e.key?.startsWith('admin')) {
      console.log("Admin setting changed, notifying subscriber");
      callback(getAdminSettings());
    }
  };

  const handleCustomEvent = (e: CustomEvent) => {
    console.log("Admin settings custom event received:", e.detail);
    callback(getAdminSettings());
  };

  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('adminSettingsChanged', handleCustomEvent as EventListener);

  return () => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('adminSettingsChanged', handleCustomEvent as EventListener);
  };
};