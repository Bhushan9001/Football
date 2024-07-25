export const getAuthorizationHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return { Authorization: `${token}` };
  }
  return {};
};
