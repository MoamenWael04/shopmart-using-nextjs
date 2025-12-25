export async function forgotPassword(email: string) {
  const res = await fetch(
    'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }
  );

  return res.json();
}