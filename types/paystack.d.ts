export {};

interface PaystackSetupConfig {
  key: string;
  email?: string;
  amount?: number;
  currency?: string;
  ref?: string;
  access_code?: string;
  metadata?: Record<string, unknown>;
  callback: (response: PaystackResponse) => void;
  onClose: () => void;
}

interface PaystackHandler {
  openIframe(): void;
}

interface PaystackResponse {
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  trxref: string;
}

declare global {
  interface Window {
    PaystackPop: {
      setup(config: PaystackSetupConfig): PaystackHandler;
    };
  }
}
