// https://github.com/typicode/json-server#routes Here you can find information on how to sort, order or search the API resource
var employeesAPI = "http://rest.vedinas.ro/employees?_limit=5";
//

function deserializeResponse(response) {
    // .json() does JSON.parse behind the scenes
    return response.json();
}

function createEmployeeElement(employee) {
    // console.log(employee);

    // <li class="employee">
    //   <div class="name">John Snow</div>
    //   <p><span>Age: 27</span> <span>Salary: 27</span></p>
    //   <button class="remove">X</button>
    // </li>

    // var employeeElementTemplate = `
    //   <div class="name">${employee.name}</div>
    //   <p><span>Age: ${employee.age}</span> <span>Salary: ${employee.salary}</span></p>
    //   <button class="remove">X</button>
    // `

    var employeeElement = document.createElement("li");
    employeeElement.dataset.id = employee.id;
    employeeElement.classList.add("employee");

    var employeeNameElement = document.createElement("div");
    employeeNameElement.classList.add("name");
    employeeNameElement.innerText = employee.name;

    var pElement = document.createElement("p");
    // var pInnerHtml = '<span>Age: ' + employee.age + '</span> <span>Salary: ' + employee.salary + '</span>';
    //<span>Age: 27</span> <span>Salary: 27</span>

    var pInnerHtml2 = "";
    pInnerHtml2 += "<span>Age: ";
    pInnerHtml2 += employee.age;
    pInnerHtml2 += "</span> <span>Salary: ";
    pInnerHtml2 += employee.salary;
    pInnerHtml2 += "</span>";

    // template literals
    var pInnerHtml3 = `<span>Age: ${employee.age}</span> <span>Salary: ${employee.salary}</span>`;

    pElement.innerHTML = pInnerHtml3;

    var removeElement = document.createElement("button");
    removeElement.classList.add("remove");
    removeElement.innerText = "X";

    removeElement.addEventListener("click", removeEmployee);

    employeeElement.appendChild(employeeNameElement);
    employeeElement.appendChild(pElement);
    employeeElement.appendChild(removeElement);

    return employeeElement;
}

function listEmployees(employees) {
    console.log(employees);
    var agendaElement = document.querySelector(".agenda");
    for (var i = 0; i < employees.length; i++) {
        var employeeElement = createEmployeeElement(employees[i]);
        agendaElement.appendChild(employeeElement);
    }
}

function getEmployees() {
    // We GET employees from API
    fetch(employeesAPI).then(deserializeResponse).then(listEmployees);
}

function addEmployee() {
    var employeeName = document.querySelector('input[name="name"]');
    var employeeAge = document.querySelector('input[name="age"]');
    var employeeSalary = document.querySelector('input[name="salary"]');
    // get name from input
    // get age from input
    // get salary from input
    // create employee object

    fetch(employeesAPI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: employeeName.value,
                age: employeeAge.value,
                salary: employeeSalary.value,
            }),
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonResp) {
            console.log(jsonResp);

            var employee = {
                name: employeeName.value,
                age: employeeAge.value,
                salary: employeeSalary.value,
            };
            var employeeElement = createEmployeeElement(employee);
            employeeElement.dataset.id = jsonResp.id;
            var agendaElement = document.querySelector(".agenda");
            agendaElement.appendChild(employeeElement);
        });

    // POST employeesAPI employee
}

function removeEmployee(event) {
    // take event.target // remove button
    // get remove button parent .parent()
    // var id = dataset.id from parent https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
    // remove parent .remove()
    // DELETE `employeeAPI/${id}`

    var employeeElement = event.target.parentElement;
    var id = employeeElement.dataset.id;
    console.log(id);
    employeeElement.remove();

    // fetch(employeesAPI, {
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             name: employee.name,
    //             age: employee.age,
    //             salary: employee.salary,
    //         }),
    //     })
    //     .then(function(response) {
    //         return response.json();
    //     })
    //     .then(function(jsonResp) {
    //         console.log(jsonResp);
    //     });

    // var formData = new FormData();
    // formData.removeElement();
    // formData.removeElement();
    // formData.removeElement();

    // return fetch(employeesAPI, {
    //     method: "DELETE",
    //     body: formData,
    // }).then((response) => response.json());
}

// When the page is finished loading this function is called
function onDOMLoad() {
    // we call getEmployees function
    // to easely get to the function hold ctrl and click on the function name
    getEmployees();

    var addEmployeeElement = document.querySelector(".add");
    addEmployeeElement.addEventListener("click", addEmployee);
}

// DOMContentLoaded is triggered when DOM load is complete
// On page load fetch employess from API
document.addEventListener("DOMContentLoaded", onDOMLoad);

// "how then works behind the scenes"
/*
var cbs = [
  function one(data) {
    console.log('one', data);'
    return 'from one'
  },
  function two(data) {
    console.log('two', data);
    return 'from two'
  },
  function three(data) {
    console.log('three', data);
  },
];

var ourData = 'initial data';
for (var i = 0; i < cbs.length; i++) {
  var currentCB = cbs[i];
  ourData = currentCB(ourData);
}
*/