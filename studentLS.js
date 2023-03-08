console.log("Welcome To Student Forms");
showtask();

// Get the Add Student modal
var modalAdd = document.getElementById("exampleModal");

//Get the button that opens the Edit modal
var addBtn = document.getElementById("addRecord");

$("#addRecord").click(function () {
  modalAdd.style.display = "block";
});

var CA1 = document.getElementById("closeSub");
var CA2 = document.getElementById("closebtn");

// When the user clicks on <span> (x), close the modal
CA1.onclick = function () {
  modalAdd.style.display = "none";
};
CA2.onclick = function () {
  modalAdd.style.display = "none";
};

// Submit form

let submitBtn = document.getElementById("submit1");
let genderVal = document.getElementById("genders").value;
let subjectVal = document.getElementById("subjects").value;


submitBtn.addEventListener("click", function () {
  let genderVal = document.getElementById("genders").checked;
  let subjectVal = document.getElementById("subjects").value;
     //Defining the regex
     var letters = /^[A-Za-z -]+$/;
     let nums = /^[0-9]+$/;
     let validRegex =
       /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
   

  if (nameAdd.value == "" || !nameAdd.value.match(letters) ) {
    alert("Name Cannot be blank");
    return false;
  } else if (emAdd.value == "" || !emAdd.value.match(validRegex) ) {
    alert("Email Cannot be blank");
    return false;
  } else if ((dateAdd.value == "" )) {
    alert("Date Cannot be blank");
    return false;
  } else if (!($("input[name='gender']:checked").val())){
    alert("Please Select Gender")
    return false
  } else if (!($("input[type=checkbox][name=subject]:checked").val())){
    alert("Please Select Subject")
    return false;
  } else if (specialize.value === opNone.value ) {
    alert("Please Select Specialization")
    return false;
  } else if (rAdd.value == 50 ) {
    alert("Please Select Range")
    return false;
  } else {
    modalAdd.style.display = "none"
    var yourArray = [];
    $("input[type=checkbox][name=subject]:checked").each(function () {
      yourArray.push($(this).val());
    });


    function format(inputDate) {
        let date, month, year;
      
        date = inputDate.getDate();
        month = inputDate.getMonth() + 1;
        year = inputDate.getFullYear();
      
          date = date
              .toString()
              .padStart(2, '0');
      
          month = month
              .toString()
              .padStart(2, '0');
      
        return `${date}/${month}/${year}`;
      }
 
    let tasks = {
      name: nameAdd.value,
      email: emAdd.value,
      dob: format(new Date( dateAdd.value)),
      gender: $("input[name='gender']:checked").val(),
      subject: yourArray + "",
      specialize: specialize.value,
      sports: rAdd.value + "%",
    };
  
    let webtask = localStorage.getItem("localtask");
  
    if (webtask == null) {
      taskObj = [];
    } else {
      taskObj = JSON.parse(webtask);
    }
    taskObj.push(tasks);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
  }

});

function showtask() {
  let webtask = localStorage.getItem("localtask");
  if (webtask == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(webtask);
  }
  let thtml = "";
  let table = document.getElementById("table");

  taskObj.forEach((item, index) => {

    thtml += ` 
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
            <button id="editRecord" type="button" class="btn btn-info btn-edit mx-2">
                Edit
            </button>
            <button type="button" class="btn btn-danger btn-del">
                Delete
            </button>
        </td>
    </tr>
   
        `
  });

  table.innerHTML = thtml;
}
