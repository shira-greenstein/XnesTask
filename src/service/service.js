const url = "http://localhost:5000/api/values";

//Customers

export async function postCustomer(customer) {
  //   const token = JSON.parse(localStorage.getItem("TOKEN"));
  return await fetch(
    `http://localhost:5000/api/values/XnesController/AddCustomer`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    }
  ).then(response => response)
  ;
}

export async function getCitiesService() {
  return await fetch(
    `http://localhost:5000/api/values/XnesController/GetCities `,
    {
      method: "get"
    }
  )
    .then(response => response.json())
    .then(data => data);
}

export async function getCustomers() {
  return await fetch(
    `http://localhost:5000/api/values/XnesController/GetCustomers `,
    {
      method: "get"
    }
  )
    .then(response => response.json())
    .then(data => data)
    .catch(err => err);
}

export async function getBank() {
  return await fetch(
    "https://www.xnes.co.il/ClosedSystemMiddlewareApi/api/generalinformation"
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data.Data;
    });
}
