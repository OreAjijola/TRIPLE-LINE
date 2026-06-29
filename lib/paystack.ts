const PAYSTACK_API = "https://api.paystack.co";

function getSecretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) throw new Error("Missing PAYSTACK_SECRET_KEY environment variable");
  return key;
}

function authHeaders() {
  return {
    Authorization: `Bearer ${getSecretKey()}`,
    "Content-Type": "application/json",
  };
}

export interface InitializeParams {
  email: string;
  amount: number;
  currency?: string;
  reference?: string;
  metadata?: Record<string, unknown>;
}

export interface InitializeResult {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export async function initializeTransaction(params: InitializeParams): Promise<InitializeResult> {
  const res = await fetch(`${PAYSTACK_API}/transaction/initialize`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      email: params.email,
      amount: params.amount,
      currency: params.currency ?? "NGN",
      ...(params.reference && { reference: params.reference }),
      ...(params.metadata && { metadata: params.metadata }),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Paystack initialize failed: ${res.status} ${body}`);
  }

  const json = await res.json() as { status: boolean; data: InitializeResult };
  if (!json.status) throw new Error("Paystack returned status=false on initialize");
  return json.data;
}

export interface VerifyResult {
  status: string;
  reference: string;
  amount: number;
  currency: string;
  paid_at: string;
  customer: { email: string };
}

export async function verifyTransaction(reference: string): Promise<VerifyResult> {
  const res = await fetch(`${PAYSTACK_API}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${getSecretKey()}` },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Paystack verify failed: ${res.status} ${body}`);
  }

  const json = await res.json() as { status: boolean; data: VerifyResult };
  if (!json.status) throw new Error("Paystack returned status=false on verify");
  return json.data;
}
