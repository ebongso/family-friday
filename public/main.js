'use strict';

(() => {
  let names = [];

  //Load from localStorage first. 
  //If not available, get data from the database.
  let loadEmployees = () => {
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

  let generateLunchGroupsClickEvent = () => {
    const shuffledNames = shuffleNames();
  };

  //Based on Fisher-Yates shuffle algorithm, a random number is generated
  //then the array at the current position is swapped with the position from the random number.
  let shuffleNames = () => {
    const start = 0;
    let shuffledNames = names.slice(); //Shallow-copy the names array
    const totalNames = shuffledNames.length;
    for(let i = start; i < totalNames; i++) {
      //Generate a random number [start .. totalNames)
      const random = Math.floor(Math.random() * (totalNames - start));

      //Swap the element at the current position with the element in the random position
      const temp = shuffledNames[i];
      shuffledNames[i] = shuffledNames[random];
      shuffledNames[random] = temp;
    }
    return shuffledNames;
  };

  //When starting up, the app will load data and show employees.
  let init = () => {
    loadEmployees();
    showEmployees();
    document.getElementById('addEmployee').addEventListener('click', addEmployeeClickEvent);
    document.getElementById('generateLunchGroups').addEventListener('click', generateLunchGroupsClickEvent);
  };

  init();
})();