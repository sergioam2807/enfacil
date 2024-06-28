import { cookies } from 'next/headers';

export async function getPersonalByIdData(id?: string) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/UserApi/GetPersonnel${
      id ? `/${id}` : ''
    }`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
