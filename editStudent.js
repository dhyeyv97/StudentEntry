//editTask


function editAPI(index) {
  var javaS = fetch(
    "https://crudcrud.com/api/f4ee531b63c341f8bf3608af2bac86ff/crud"
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
    const res = await fetch('https://crudcrud.com/api/f4ee531b63c341f8bf3608af2bac86ff/crud')   
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
          `https://crudcrud.com/api/f4ee531b63c341f8bf3608af2bac86ff/crud/${id}`,
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
