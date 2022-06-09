const axios = require("axios").default;

const BDRequest = async (userEmail) => {
  try {
    response = await axios.get("http://localhost:4000/users");
    const user = await response.data.data.find(
      (item) => item.email === userEmail
    );
    const qwe = await user.name;
    const secure = "2622a1d7-a11d-4efe-9a20-5dd01cfcc27d";
    const doc_id = "bfb4b512-ba82-4ba6-ba11-6e30a2608a10";

    const apiResponse = await axios.post(
      `https://gramotadel.express/api/v1/create/?secure=${secure}&doc_id=${doc_id}&mask_name=${{
        name: qwe,
      }}`,
      {
        "Content-Type": "application/json",
      }
    );

    return user ? apiResponse.data.files[0] : false;
  } catch (error) {}
};

module.exports.BDRequest = BDRequest;
//   result: 'success',
// create_id: '582f23fc-2700-4ca0-93c0-f5f9436a98c9',
// url: 'https://embed.gramotadel.express/getform/b5b24072-6280-4ac5-9493-4e1fd0964063/582f23fc-2700-4ca0-93c0-f5f9436a98c9/',
// files: [ 'a007f638-36ac-4e68-817a-08d42af5c209' ]
