
//DeleteTask

function deleteAPI(index) {
    let deleteCnfb = document.getElementById("deleteCnf");
    deleteCnfb.onclick = function () {
      var javaS = fetch(
        "https://crudcrud.com/api/f4ee531b63c341f8bf3608af2bac86ff/crud"
      );
      javaS
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          var id = response[index]._id;
          var javaS = fetch(
            `https://crudcrud.com/api/f4ee531b63c341f8bf3608af2bac86ff/crud/${id}`,
            {
              method: "delete",
            }
          );
          javaS
            .then((response) => response.json())
            .then((data) => console.log(data));
            showAlertsAdd("User Deleted Sucessfully !!")
          getAPI();
        });
      getAPI();
    };
    getAPI();
  };
  getAPI()
  deleteAPI()