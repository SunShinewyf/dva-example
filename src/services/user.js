import request from "../utils/request";

export function fetch({ page }) {
  return request(`/api/users?_page=${page}&_limit=5`);
}
export function remove(id) {
  return request(`/api/users/${id}`, {
    method: "DELETE"
  });
}
export function create(user) {
    console.log(user,'1111')
  return request("/api/users", {
    method: "POST",
    body: JSON.stringify(user)
  });
}
