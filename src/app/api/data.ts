const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jbCIsIlN1cGVyQWRtaW4iOiJUcnVlIiwiZXhwIjoxNzEwMjEzMTM1fQ.4LhA0ACgygGrGE3Jw-KaIH29D7nvx3866L5IZli63mE";
export async function getUserData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/UserApi/GetUsers`,
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

export async function createUserData(data: any) {
  const res = await fetch(`http://64.176.3.190:8080/api/UserApi/InsertUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create user");
  }

  return res.json();
}

export async function deleteUserData(id: string, apiEndpoint: string) {
  const res = await fetch(
    // `${process.env.NEXT_PUBLIC_BASE_URL}/UserApi/DeleteUser?id=${id}`,
    `http://64.176.3.190:8080/api/${apiEndpoint}?id=${id}`,
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

export async function getPersonalData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/PersonnelApi/GetPersonnel`,
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

export async function deletePersonalData(id: string) {
  const res = await fetch(
    // `${process.env.NEXT_PUBLIC_BASE_URL}/UserApi/DeleteUser?id=${id}`,
    `http://64.176.3.190:8080/api/UserApi/DeleteUser?id=${id}`,
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
