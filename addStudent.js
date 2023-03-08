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
    "https://crudcrud.com/api/f4ee531b63c341f8bf3608af2bac86ff/crud"
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
  const res = await fetch('https://crudcrud.com/api/f4ee531b63c341f8bf3608af2bac86ff/crud')   
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
              "https://crudcrud.com/api/f4ee531b63c341f8bf3608af2bac86ff/crud",
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
