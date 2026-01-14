function getAuthUser() {
  try {
    return JSON.parse(localStorage.getItem("sb_user"));
  } catch {
    return null;
  }
}

export { getAuthUser };