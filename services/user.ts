export const fetchUser = async (id: string) => {
  const response = await fetch(`/api/user/${id}`);
  const data = await response.json();
  return data;
};

export const createUser = async () => {
  const response = await fetch("/api/user/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const fetchUsers = async(page: number = 1) => {
  const response = await fetch(`/api/user?page=${page}`);
  const data = await response.json();
  return data;
}
