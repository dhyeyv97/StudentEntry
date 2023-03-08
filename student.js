console.log("Welcome To Student Forms");
getAPI()

// Get the Add Student modal
var modalAdd = document.getElementById("exampleModal");
var modalEdit = document.getElementById("exampleModalEdit")

//Get the button that opens the Edit modal
var addBtn = document.getElementById("addRecord");

$("#addRecord").click(function () {
  modalAdd.style.display = "block";
});

 // Get the modal
 var modalSuccess = document.getElementById("myModalSuccess");

 // Get the button that opens the modal
 var btn = document.getElementById("myBtn");
 
 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];
 
 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
   if (event.target == modalSuccess) {
     modalSuccess.style.display = "none";
   }
 }
 
var CA1 = document.getElementById("closeSub");
var CA2 = document.getElementById("closebtn");

var CE1 = document.getElementById("closeEd");
var CE2 = document.getElementById("edClose");

CA1.onclick = function () {
  modalAdd.style.display = "none";
};
CA2.onclick = function () {
  modalAdd.style.display = "none";
};

CE1.onclick = function () {
  modalEdit.style.display = "none";
};
CE2.onclick = function () {
  modalEdit.style.display = "none";
};

CA1.addEventListener("click", function () {
  $(".gen").prop("checked", false)
  $(".sub").prop("checked", false)
  nameAdd.value = "";
  emAdd.value = "";
  dateAdd.value = "";
  rAdd.value = 0
  specialize.value = opNone.value
  clearErrors()
});

CA2.addEventListener("click", function () {
  $(".gen").prop("checked", false)
  $(".sub").prop("checked", false)
  nameAdd.value = "";
  emAdd.value = "";
  dateAdd.value = "";
  rAdd.value = 0
  specialize.value = opNone.value
  clearErrors()
});

CE1.addEventListener("click", function () {
  $( ".gene" ).prop( "checked", false )
  $(".sube1").prop("checked", false)
  $(".sube2").prop("checked", false)
  $(".sube3").prop("checked", false)
  nameEdit.value = "";
  emEdit.value = "";
  dateEdit.value = "";
  rEdit.value = 0
  specializeE.value  = opNoneE.value
  clearErrors()
});

CE2.addEventListener("click", function () {
  $( ".gene" ).prop( "checked", false )
  $(".sube1").prop("checked", false)
  $(".sube2").prop("checked", false)
  $(".sube3").prop("checked", false)
  nameEdit.value = "";
  emEdit.value = "";
  dateEdit.value = "";
  rEdit.value = 0
  specializeE.value  = opNoneE.value
  clearErrors()
});


//  //for alert messages
 function showAlertsAdd(message){
  $("#successAlert").text(message)
  modalSuccess.style.display = "block";


  setTimeout( function() {
   modalSuccess.style.display = "none";
}, 2000 )
}

//clear errors
function clearErrors() {
  errors = document.getElementsByClassName("formError");
  for (let item of errors) {
    item.innerHTML = "";
  }
}


//Set Error
function setError(id, error) {
  element = document.getElementById(id);
  element.getElementsByClassName("formError")[0].innerHTML = error;
}



//get the data
function getAPI() {
  var javaS = fetch(
    "https://crudcrud.com/api/7ecd9eacc6914f05941e0de016a1898c/crud"
  )
  javaS
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      let datas = response;
      var html = "";
      var table = document.getElementById("table");
      datas.forEach((item, index) => {
        html += `
              <tr>
              <th scope="row">${index + 1}</th>
              <td>${item.name}</td>
              <td>${item.email}</td>
              <td>${item.dob}</td>
              <td>${item.gender}</td>
              <td>${item.subject}</td>
              <td>${item.specialize}</td>
              <td>${item.sports}</td>
              <td>
                  <button id="editRecord"  onclick = "editAPI(${index})" type="button" class="btn btn-info btn-edit mx-2">
                      Edit
                  </button>
                  <button type="button" onclick ="deleteAPI(${index})" data-bs-toggle="modal" data-bs-target="#deleteModal" class="btn btn-danger btn-del">
                      Delete
                  </button>
              </td>
          </tr>
       
               `;
        table.innerHTML = html;
      });
    });
}
getAPI();



// Submit form

 async function submit() {
  var returnval = true;
  let obj; 
  const res = await fetch('https://crudcrud.com/api/7ecd9eacc6914f05941e0de016a1898c/crud')   
  obj = await res.json();

  var lastElement;
  lastElement = await obj[obj.length - 1].email
  console.log(lastElement)

  //  console.log(emailFound)
  submit1.onclick = await function(e) {
    getAPI()
    submit()
    e.preventDefault()
    //Defining the regex
    var letters = /^[A-Za-z -]+$/;
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

     clearErrors()

     let nameErr = nameAdd.value == ""
     let emErr = emAdd.value == ""
     let dateErr = dateAdd.value == ""
     let genErr = !$("input[name='gender']:checked").val()
     let subErr = !$("input[type=checkbox][name=subject]:checked").val()
     let speErr = specialize.value === opNone.value
     let ranErr = rAdd.value == 0
     let nameErr1 = !nameAdd.value.match(letters)
     let emErr1 = !emAdd.value.match(validRegex)

     var emailFound;
     emailFound =  obj.find(function (element) {
      return element.email === emAdd.value;
     })

     var emailFounds = emailFound && lastElement
      console.log(emailFounds)


      clearErrors()
      if (nameErr || emErr || dateErr || genErr || subErr || speErr || ranErr || nameErr1 || emErr1 || emailFounds) {
 
       if (nameErr || nameErr1) {
         if (nameErr) {
           setError("name", "*Please Enter the Name")
           returnval = false;
         } if (nameErr1) {
           setError("name", "*Please Enter Valid Name")
           returnval = false;
         }
       }
 
       if (emErr || emErr1 ||emailFounds) {

         if (emErr) {
           setError("email", "*Please Enter the Email")
           returnval = false;
         } 
         if (emailFounds) {
          setError("email", "*This Email Address Already Exists")
          returnval = false
        }
        if (!emAdd.value.match(validRegex)) {
          setError("email", "*Please Enter Valid Email")
          returnval = false;
        }

          
       } 

       if (dateAdd.value == "") {
         setError("date", "*Please Enter the Date")
         returnval = false;
       }
        if (genErr) {
         setError("gender", "*Please Select the Gender")
         returnval = false;
       } 
       if (subErr) {
         setError("subject", "*Please Select the Subjects")
         returnval = false;
       } if (speErr) {
         setError("special", "*Please Select the Specialization")
         returnval = false;
       }  
       if (ranErr) {
         setError("range", "*Please Select the Range")
         returnval = false;
       }
     } 
       else {
           showAlertsAdd("User Added Sucessfully !!")
            modalAdd.style.display = "none";

            var yourArray = [];
            $("input[type=checkbox][name=subject]:checked").each(function () {
              yourArray.push($(this).val());
            })

            //date format 
            function format(inputDate) {
              let date, month, year;
              date = inputDate.getDate();
              month = inputDate.getMonth() + 1;
              year = inputDate.getFullYear();
              date = date.toString().padStart(2, "0");
              month = month.toString().padStart(2, "0");
              return `${date}/${month}/${year}`;
            }

            var formData = {
              name: nameAdd.value,
              email: emAdd.value,
              dob: format(new Date(dateAdd.value)),
              gender: $("input[name='gender']:checked").val(),
              subject: yourArray + "",
              specialize: specialize.value,
              sports: rAdd.value + "%"
            }
            console.log(formData)
            var javaS =  fetch(
              "https://crudcrud.com/api/7ecd9eacc6914f05941e0de016a1898c/crud",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              }
            )
              .then((res) => res.json())
              // .then((data) => console.log(data))
              .catch((error) => console.log(error));

               $(".gen").prop("checked", false)
               $(".sub").prop("checked", false)
               nameAdd.value = "";
               emAdd.value = "";
               dateAdd.value = "";
               rAdd.value = 0
               specialize.value = opNone.value;
          // }
          getAPI();
        // });
      // }
    }
    getAPI()
  
}
$("#addRecord").click(function () {
  modalAdd.style.display = "block"

})
}
submit()
getAPI()

//editTask


function editAPI(index) {
  var javaS = fetch(
    "https://crudcrud.com/api/7ecd9eacc6914f05941e0de016a1898c/crud"
  )
  javaS
    .then((response) => {
      return response.json();
    })
    .then((response) => {

      console.log(response[index].sports)
      var date1 = response[index].dob;
      date1 = date1.split("/").reverse().join("-");
      var range1 = response[index].sports
      newRange= range1.slice(0, range1.length - 1);
      console.log(typeof response[index].sports)
      var genResult = (function () {
        if (response[index].gender === "Male") {
          return $(".gene1").prop("checked", true)
        } else {
          return $(".gene2").prop("checked", true)
        }
      })()
      var subResults = (function () {

        let subResponse = response[index].subject
        let mathSub = subResponse.includes("Maths")
        let sciSub = subResponse.includes("Science")
        let engSub = subResponse.includes("English")

        if (mathSub || sciSub || engSub) {
          if (mathSub & sciSub & engSub) {
            $(".sube1").prop("checked", true)
            $(".sube2").prop("checked", true)
            $(".sube3").prop("checked", true)
            return false
          } else if (mathSub && sciSub) {
            $(".sube1").prop("checked", true)
            $(".sube2").prop("checked", true)
            return false
          } else if (mathSub && engSub) {
            $(".sube1").prop("checked", true)
            $(".sube3").prop("checked", true)
            return false
          } else if (sciSub && engSub) {
            $(".sube2").prop("checked", true)
            $(".sube3").prop("checked", true)
            return false
          } 
          else if (mathSub) {
            $(".sube1").prop("checked", true)
            return false
          }
          else if (sciSub) {
           $(".sube2").prop("checked", true)
            return false
          }
          else if (engSub) {
          $(".sube3").prop("checked", true)
            return false
          }
          else {
            console.log("Error")
          }
          return false
        }
      })()      
      nameEdit.value = response[index].name;
      emEdit.value = response[index].email;
      dateEdit.value = date1;
      // response[index].gender = genResult
      // response[index].subject = $(".sube3").prop("checked", true)
      specializeE.value = response[index].specialize
      // response[index].sports = rEdit.value
      rEdit.value = newRange 
    })

    $(".sube1").prop("checked", false)
    $(".sube2").prop("checked", false)
    $(".sube3").prop("checked", false)

  modalEdit.style.display = "block"


  var returnval = true;
  save1.onclick = async function () {
    let response; 
    const res = await fetch('https://crudcrud.com/api/7ecd9eacc6914f05941e0de016a1898c/crud')   
    response = await res.json();
  

    function format(inputDate) {
      let date, month, year;
      date = inputDate.getDate();
      month = inputDate.getMonth() + 1;
      year = inputDate.getFullYear();
      date = date.toString().padStart(2, "0");
      month = month.toString().padStart(2, "0");
      return `${date}/${month}/${year}`;
    }

    var letters = /^[A-Za-z -]+$/;
    var nums = /^[0-9]+$/;
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    clearErrors()
    let nameErr = nameEdit.value == ""
    let emErr = emEdit.value == ""
    let dateErr = dateEdit.value == ""
    let genErr = !$("input[name='gendere']:checked").val()
    let subErr = !$("input[type=checkbox][name=subjecte]:checked").val()
    let speErr = specializeE.value === opNoneE.value
    let ranErr = rEdit.value == 0
    let nameErr1 = !nameEdit.value.match(letters)
    let emErr1 = !emEdit.value.match(validRegex)

    var emailFound = response.find(function (element) {
      return ( element.email === emEdit.value  && !(response[index].email === emEdit.value))  });
      console.log(emailFound);
    
    if(nameErr || emErr || dateErr || genErr || subErr || speErr || ranErr || nameErr1 || emErr1 || emailFound ) { 

      if (nameErr || nameErr1) { 
        if (nameErr){
      setError("nameE", "*Please Enter the Name")  
      returnval = false;
    } if (nameErr1) {
      setError("nameE", "*Please Enter Valid Name")
      returnval = false;
    }
      }

      if (emErr || !emEdit.value.match(validRegex) || emailFound) { 
        if (emErr){
      setError("emailE", "*Please Enter the Email")  
      returnval = false;
    } 
    if (emailFound) {
      setError("emailE", "*This Email Address Already Exists")
      returnval = false
      }
    if (!emEdit.value.match(validRegex)) {
      setError("emailE", "*Please Enter Valid Email")
      returnval = false;
    }
      }

    if (emEdit.value == "") {
      setError("emailE", "*Please Enter the Email") 
      returnval = false;
    } if (dateEdit.value == "") {
      setError("dateE", "*Please Enter the Date")   
      returnval = false;
    } if (!$("input[name='gendere']:checked").val()) {
      setError("genderE", "*Please Select the Gender")   
      returnval = false;
    } if (!$("input[type=checkbox][name=subjecte]:checked").val()) {
      setError("subjectE", "*Please Select the Subjects")   
      returnval = false;
    } if (specializeE.value === opNoneE.value) {
      setError("specialE", "*Please Select the Specialization")    
      returnval = false;
    } if (rEdit.value == 0) {
      setError("rangeE", "*Please Select the Range")      
      returnval = false;
    }
  } else {  
         showAlertsAdd("User Updated Sucessfully !!")
         modalEdit.style.display = "none"

         var yourArray = [];
         $("input[type=checkbox][name=subjecte]:checked").each(function () {
           yourArray.push($(this).val());
         })

         var id = response[index]._id;

         const updatenewdata = {
          name: nameEdit.value,
          email: emEdit.value,
          dob: format(new Date(dateEdit.value)),
          gender: $("input[name='gendere']:checked").val(),
          subject: yourArray + "",
          specialize: specializeE.value,
          sports: rEdit.value + "%"
          }

          console.log(updatenewdata);
         var javaS = fetch(
          `https://crudcrud.com/api/7ecd9eacc6914f05941e0de016a1898c/crud/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatenewdata),
          }
          ).then((response) => {
          console.log(response, "check update value");
          })

          $( ".gene" ).prop( "checked", false )
          $(".sube1").prop("checked", false)
          $(".sube2").prop("checked", false)
          $(".sube3").prop("checked", false)
          nameEdit.value = "";
          emEdit.value = "";
          dateEdit.value = "";
          rEdit.value = 0
          specializeE.value  = opNoneE.value
                getAPI()
             

      }
      getAPI();
      return returnval
  }
}



//DeleteTask

function deleteAPI(index) {
  let deleteCnfb = document.getElementById("deleteCnf");
  deleteCnfb.onclick = function () {
    var javaS = fetch(
      "https://crudcrud.com/api/7ecd9eacc6914f05941e0de016a1898c/crud"
    );
    javaS
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        var id = response[index]._id;
        var javaS = fetch(
          `https://crudcrud.com/api/7ecd9eacc6914f05941e0de016a1898c/crud/${id}`,
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




