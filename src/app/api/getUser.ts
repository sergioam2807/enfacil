import { cookies } from "next/headers";

export async function getUserData(id?: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/UserApi/GetUsers${id ? `/${id}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getPersonalData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(
    // "http://192.168.0.6:7194/api/PersonnelApi/GetPersonnel",
    `${process.env.NEXT_PUBLIC_BASE_URL}/PersonnelApi/GetPersonnel`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.error("Error status:", res.status);
    console.error("Error text:", await res.text());
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function deletePersonalData(id: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/UserApi/DeleteUser?id=${id}`,
    // `http://64.176.3.190:8080/api/UserApi/DeleteUser?id=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log("API response:", res);

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }

  const data = await res.json();
  return data;
}

export async function getClientData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/ClientApi/GetClients`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getProyectsData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/ProjectApi/GetProjects`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
