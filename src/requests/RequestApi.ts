import { BASE_URL, checkStatus, delay, parseJSON } from "../utility/fetchUtilities";
import { Request } from "./Request";

let url = `${BASE_URL}/requests`;

export const requestAPI = {
  list(): Promise<Request[]> {
    return fetch(`${url}?_sort=name&_order=asc`).then(delay(600)).then(checkStatus).then(parseJSON);
  },

  find(id: number): Promise<Request> {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
  },

  post(request: Request) {
    return fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON);
  },

  put(request: Request) {
    return fetch(`${url}/${request.id}`, {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(checkStatus);
    // .then(parseJSON);
  },

  submitForReview(request: Request) {
    return fetch(`${url}/review/${request.id}`, {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(checkStatus);
  },

  approveRequest(request: Request) {
    return fetch(`${url}/approve/${request.id}`, {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(checkStatus);
  },

  rejectRequest(request: Request) {
    return fetch(`${url}/reject/${request.id}`, {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(checkStatus);
  },

  delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" }).then(checkStatus);
  },
};

//copied
