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

export const fetchUsers = async() => {
  const response = await fetch('/api/user');
  const data = await response.json();
  return data;
}
