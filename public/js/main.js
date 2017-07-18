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
      document.getElementById('message').innerHTML = 'Cannot find the local storage.';
    }
  };

  //Add employees to storage
  let addToStorage = (newEmployeeName) => {
    if(localStorage) {
      const family = localStorage.getItem('family');
      const moreFamily = (family && family !== null) ? family + ';' + newEmployeeName : newEmployeeName;
      localStorage.setItem('family', moreFamily);
      names = moreFamily.split(';');
    } else {
      document.getElementById('message').innerHTML = 'Cannot find the local storage.';
    }
  };
  
  //Store/display the name and clear the field
  let addEmployee = () => {
    const employeeName = document.getElementById('employeeName').value.trim();
    if(employeeName !== '') {
      addToStorage(employeeName);
    
      document.getElementById('employeeName').value = '';
      document.getElementById('message').innerHTML = employeeName + ' has been added!';
    } else {
      document.getElementById('message').innerHTML = 'Please enter a name';      
    }
  };

  //The 'Add Employee' button is clicked
  let addEmployeeClickEvent = () => {
    addEmployee();
  };

  //After entering the employee name, detect the keyup event
  let addEmployeeKeyUpEvent = (e) => {
    if(e.keyCode === 13) { //the Enter key is pressed
      addEmployee();
    }
  };

  //Time to shuffle names and divide them into lunch groups!
  let generateLunchGroupsClickEvent = () => {
    if(names.length < MIN) {
      document.getElementById('message').innerHTML = `Please add at least ${MIN} employees`;
    } else {
      const shuffledNames = group.shuffleNames(names);
      const groups = group.divide(shuffledNames, [], 0, 0, shuffledNames.length);
      

      document.getElementById('groups').innerHTML = group.generateDisplay(groups);
      $('#groups').fadeIn('slow');
    }
  };

  //When starting up, the app will load data and show employees.
  let init = () => {
    loadEmployees();
    document.getElementById('addEmployee').addEventListener('click', addEmployeeClickEvent);
    document.getElementById('generateLunchGroups').addEventListener('click', generateLunchGroupsClickEvent);
    document.getElementById('employeeName').addEventListener('keyup', addEmployeeKeyUpEvent);
  };

  init();
})();