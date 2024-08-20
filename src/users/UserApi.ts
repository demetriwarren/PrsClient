import {
    BASE_URL,
    checkStatus,
    delay,
    parseJSON,
  } from "../utility/fetchUtilities";
  import { User } from "./User";
  
  let url = `${BASE_URL}/users`;
  
  export const userAPI = {
    list(): Promise<User[]> {
      return fetch(`${url}?_sort=name&_order=asc`)
        .then(delay(600))
        .then(checkStatus)
        .then(parseJSON);
    },
  
    find(id: number): Promise<User> {
      return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
    },
  
    post(user: User) {
      return fetch(`${url}`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(checkStatus)
        .then(parseJSON);
    },
  
    put(user: User) {
      return fetch(`${url}/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(checkStatus);
      // .then(parseJSON);
    },
  
    delete(id: number) {
      return fetch(`${url}/${id}`, { method: "DELETE" }).then(checkStatus);
    },
  };

  //copied