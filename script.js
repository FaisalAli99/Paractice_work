let selectedRow = null;
var dataBase = [];
let RowID;

function onFormSubmit() {
  console.log("submitting...");
  if (true) {
    let formData = readFormData();
    if (selectedRow == null) {
      RowID = Math.floor(Math.random() * 100 + 10).toString();
      formData["ID"] = RowID;
      insertNewRecord(formData);
    } else {
      updateRecord(formData);
    }
  }
}
function readFormData() {
  let data = {};
  data["firstName"] = document.getElementById("firstName").value;
  data["lastName"] = document.getElementById("lastName").value;
  data["email"] = document.getElementById("email").value;
  data["address"] = document.getElementById("address").value;

  return data;
}

function insertNewRecord(data) {
  let table = document
    .getElementById("employeeList")
    .getElementsByTagName("tbody")[0];
  //let newRecord = table.insertRow(table.length);

  table.innerHTML += `<tr id = "${data.ID}">
                            <td>${data.firstName}</td>
                            <td>${data.lastName}</td>
                            <td>${data.email}</td>
                            <td>${data.address}</td>
                            <td><button class = "btn btn-primary" type = "button" data-toggle = "modal" data-target = "#CRUDModal" onclick = "editRecord(this)">Edit</button>
                            <button class = "btn btn-danger type = "button" onclick = "deleteRecord(this)">Delete</button></td></tr>`;
  //document.forms[0].reset();

  document.getElementById("EmpForm").reset();
  dataBase.push(data);
  //dataBase[0] = formData;
  localStorage.setItem("pastRecords", JSON.stringify(dataBase));
  //console.log(document.forms)
}

function deleteRecord(td) {
  if (!confirm("Are you sure You want to delete?")) return;
  let rowIndex;
  selectedRow = td.parentElement.parentElement;
  RowID = selectedRow.getAttribute("id");
  var row = document.getElementById(RowID);
  row.parentNode.removeChild(row);
  dataBase.forEach((obj) => {
    Object.keys(obj).forEach((objkey) => {
      if (obj[objkey] == RowID) {
        rowIndex = dataBase.indexOf(obj);
      }
    });
  });
  console.log(rowIndex);
  var removed = dataBase.splice(rowIndex, 1);
  console.log(dataBase);
  localStorage.setItem("pastRecords", JSON.stringify(dataBase));
  selectedRow = null;
}

function editRecord(td) {
  console.log("Edit Request was generated." + td);
  selectedRow = td.parentElement.parentElement;
  document.getElementById("firstName").value = selectedRow.cells[0].innerHTML;
  document.getElementById("lastName").value = selectedRow.cells[1].innerHTML;
  document.getElementById("email").value = selectedRow.cells[2].innerHTML;
  document.getElementById("address").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.firstName;
  selectedRow.cells[1].innerHTML = formData.lastName;
  selectedRow.cells[2].innerHTML = formData.email;
  selectedRow.cells[3].innerHTML = formData.address;
  RowID = selectedRow.getAttribute("id");
  dataBase.forEach((obj) => {
    Object.keys(obj).forEach((objkey) => {
      console.log(typeof RowID);
      //if (objkey === "ID") {
      if (obj[objkey] == RowID) {
        //console.log(obj[objkey])
        obj.firstName = formData.firstName;
        obj.lastName = formData.lastName;
        obj.email = formData.email;
        obj.address = formData.address;
        console.log("Updated record : " + obj.lastName);
      }
    });
  });
  selectedRow = null;
  console.log(dataBase);
  localStorage.setItem("pastRecords", JSON.stringify(dataBase));
  document.getElementById("EmpForm").reset();
  //document.forms[0].reset();
}

function search() {
  console.log("In the search  function");
  var input, filter, table, tr, td, i, j, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("employeeList");
  tr = table.getElementsByTagName("tr");
  // for(i = 1; i <tr.length; i++){
  //   td = tr[i].getElementsByTagName("td")
  //   console.log(td[i].innerHTML)
  // }
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");
    //Loop on Columns
    //console.log(td[j].nextSibling.innerHTML)
    for (j = 0; j < td.length - 1; j++) {
      //console.log (td[j]);
      if (td[j]) {
        txtValue =  td[j].innerText;
        
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          console.log("In condition")
          console.log(txtValue);
          tr[i].style.display = "";
          var rec = document.getElementById("notFound");
          rec.className = "d-none";
          break;
        } else {
          tr[i].style.display = "none";
          var rec = document.getElementById("notFound");
          rec.className = "d-block";
        }
      }
    }
  }
}

