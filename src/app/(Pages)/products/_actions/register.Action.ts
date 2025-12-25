export async function registerUser(body: {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}) {
  const response = await fetch(
    'https://ecommerce.routemisr.com/api/v1/auth/signup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();
  return data;
}
