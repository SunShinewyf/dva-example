import request from "../utils/request";

export function fetch({ page }) {
  return request(
    `http://jsonplaceholder.typicode.com/users?_page=${page}&_limit=5`
  );
}
export function remove(id) {
  return request(`http://jsonplaceholder.typicode.com/users/${id}`, {
    method: "DELETE"
  });
}
export function create(user) {
  return request("http://jsonplaceholder.typicode.com/users", {
    method: "POST",
    body: JSON.stringify(user)
  });
}

export function update(id, user) {
  return request(`http://jsonplaceholder.typicode.com/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(user)
  });
}
