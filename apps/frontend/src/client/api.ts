const url = 'http://localhost:3000/apiv1/';

export const postAction = async (credit:string) => {
    return fetch(`${url}action/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({credit}),
        }).then((response) => response.json());
}

export const getActions = async () => {
    return fetch(`${url}action/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json());
  }

export const getCredit = async () => {
    return fetch(`${url}credit/`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    }).then((response) => response.json());
}