export async function getUserByIdData(id?: string, token?: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/UserApi/GetUsers?id=${id}`,
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

export async function createUserData(data: any, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/UserApi/InsertUser`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    let errorData = "";
    if (res.headers.get("content-type")?.includes("application/json")) {
      errorData = await res.json();
    }
    throw new Error(
      `Failed to create user: ${res.status} ${res.statusText} ${errorData}`
    );
  }

  return res.json();
}

export async function editUserData(id: string, data: any, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/UserApi/UpdateUser`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    let errorData = "";
    if (res.headers.get("content-type")?.includes("application/json")) {
      errorData = await res.json();
    }
    throw new Error(
      `Failed to edit user: ${res.status} ${res.statusText} ${errorData}`
    );
  }

  return res.json();
}
export async function deleteUserData(id: string, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/UserApi/DeleteUser?id=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

//personal

export async function createPersonalData(data: any, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/PersonnelApi/InsertPersonnel`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    let errorData = "";
    if (res.headers.get("content-type")?.includes("application/json")) {
      errorData = await res.json();
    }
    throw new Error(
      `Failed to create user: ${res.status} ${res.statusText} ${errorData}`
    );
  }

  return res.json();
}

export async function editPersonnelData(data: any, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/PersonnelApi/UpdatePersonnel`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    let errorData = "";
    if (res.headers.get("content-type")?.includes("application/json")) {
      errorData = await res.json();
    }
    throw new Error(
      `Failed to edit user: ${res.status} ${res.statusText} ${errorData}`
    );
  }

  return res.json();
}

//CLIENT FETCH
export async function createClientData(data: any, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/ClientApi/InsertClient`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    let errorData = "";
    if (res.headers.get("content-type")?.includes("application/json")) {
      errorData = await res.json();
    }
    throw new Error(
      `Failed to create user: ${res.status} ${res.statusText} ${errorData}`
    );
  }

  return res.json();
}

export async function editClientData(data: any, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/ClientApi/UpdateClient`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    let errorData = "";
    if (res.headers.get("content-type")?.includes("application/json")) {
      errorData = await res.json();
    }
    throw new Error(
      `Failed to edit user: ${res.status} ${res.statusText} ${errorData}`
    );
  }

  return res.json();
}

//CREATE MATERIAL

export async function createMaterialData(data: any, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/MaterialApi/InsertMaterial`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    let errorData = "";
    if (res.headers.get("content-type")?.includes("application/json")) {
      errorData = await res.json();
    }
    throw new Error(
      `Failed to create user: ${res.status} ${res.statusText} ${errorData}`
    );
  }

  return res.json();
}

export async function editMaterialData(data: any, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/MaterialApi/UpdateMaterial`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    let errorData = "";
    if (res.headers.get("content-type")?.includes("application/json")) {
      errorData = await res.json();
    }
    throw new Error(
      `Failed to edit user: ${res.status} ${res.statusText} ${errorData}`
    );
  }

  return res.json();
}

//activity

export async function createActivityData(data: any, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/ActivityApi/InsertActivity`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    let errorData = "";
    if (res.headers.get("content-type")?.includes("application/json")) {
      errorData = await res.json();
    }
    throw new Error(
      `Failed to create user: ${res.status} ${res.statusText} ${errorData}`
    );
  }

  return res.json();
}

export async function editActivityData(data: any, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/ActivityApi/UpdateActivity`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    let errorData = "";
    if (res.headers.get("content-type")?.includes("application/json")) {
      errorData = await res.json();
    }
    throw new Error(
      `Failed to edit user: ${res.status} ${res.statusText} ${errorData}`
    );
  }

  return res.json();
}

export async function getActivityTokenData(token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/ActivityApi/GetActivities`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    console.log("No JSON content found in response");
    return [];
  }
}

export async function getActivityEnclosure(token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/EnclosureApi/GetEnclosures`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    console.log("No JSON content found in response");
    return [];
  }
}

export const postEnclosureData = async (token: string, enclosure: any) => {
  console.log(enclosure, "enclosure");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/EnclosureApi/InsertEnclosure`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(enclosure),
    }
  );

  if (!response.ok) {
    console.log("Response headers:", response.headers);
    console.log("Response body:", await response.text());
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export async function getEnclosureData(token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/EnclosureApi/GetEnclosures`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.log("Failed to fetch data enclosure");
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    console.log("No JSON content found in response");
    return [];
  }
}

export async function deleteEnclosureData(token: string, id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/EnclosureApi/DeleteEnclosure?id=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("API response:", res);

  if (!res.ok) {
    throw new Error("Failed to enclosure ");
  }

  const data = await res.json();
  return data;
}

//client

export async function getClientResponseData(token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/ClientApi/GetClients?identifier=all&value=true`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    console.log("No JSON content found in response");
    return [];
  }
}

//QUOTE
export const postQuoteData = async (token: string, quote: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/QuoteApi/InsertQuote`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(quote),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};

export async function getQuoteData(token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/QuoteApi/GetQuotes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.log("Failed to fetch data quote");
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    console.log("No JSON content found in response");
    return [];
  }
}
