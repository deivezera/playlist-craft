// const baseURL = "http://server-nodejs.cit.byui.edu:3000/";
async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export default class ExternalServices {
  constructor(category) {

  }

}
