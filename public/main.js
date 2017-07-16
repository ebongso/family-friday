'use strict';

(() => {
  let names = [];

  //When starting up, the app will load data and show employees.
  let init = () => {
    load();
    showEmployees();
  };

  //Load from localStorage first. 
  //If not available, get data from the database.
  let load = () => {
    if(localStorage) {
      const family = localStorage.getItem('family');
      if(family && family !== null) {
        names = family.split(';');
      }
    } else {
      console.log('Cannot find the local storage. Accessing DB...');
    }
  };

  //Show the total number of employees and employee names.
  let showEmployees = () => {    
    let span = document.createElement('span');
    span.appendChild(document.createTextNode('Total: ' + names.length + ' employees'));
    let ol = document.createElement('ol');
    ol.setAttribute('id', 'employeeDisplay');
    names.forEach(n => {      
      ol.appendChild(createLi(n));
    });
    document.getElementById('showEmployeeNames').appendChild(span);
    document.getElementById('showEmployeeNames').appendChild(ol);
  };

  //Add employees to storage
  let addToStorage = (newEmployeeName) => {
    if(localStorage) {
      localStorage.setItem('family', localStorage.getItem('family') + ';' + newEmployeeName);
      console.log(localStorage.getItem('family'));
    } else {
      console.log('Cannot find the local storage. Store to DB...');
    }
  };

  //When the 'Add Employee' button is clicked, store/display the name and clear the field
  let addEmployeeClickEvent = () => {
    const employeeName = document.getElementById('employeeName').value;
    addToStorage(employeeName);
    
    document.getElementById('employeeDisplay').appendChild(createLi(employeeName));
    document.getElementById('employeeName').value = '';
  };

  init();
  document.getElementById('addEmployee').addEventListener('click', addEmployeeClickEvent);
})();