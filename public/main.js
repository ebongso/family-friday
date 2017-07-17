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
      const moreFamily = localStorage.getItem('family') + ';' + newEmployeeName;
      localStorage.setItem('family', moreFamily);
      names = moreFamily.split(';');
    } else {
      document.getElementById('message').innerHTML = 'Cannot find the local storage.';
    }
  };

  //When the 'Add Employee' button is clicked, store/display the name and clear the field
  let addEmployeeClickEvent = () => {
    const employeeName = document.getElementById('employeeName').value;
    addToStorage(employeeName);
    
    document.getElementById('employeeName').value = '';
    document.getElementById('message').innerHTML = employeeName + ' has been added!';
  };

  //Time to shuffle names and divide them into lunch groups!
  let generateLunchGroupsClickEvent = () => {
    const shuffledNames = group.shuffleNames(names);
    const groups = group.divide(shuffledNames, [], 0, 0, shuffledNames.length);
  };

  //When starting up, the app will load data and show employees.
  let init = () => {
    loadEmployees();
    document.getElementById('addEmployee').addEventListener('click', addEmployeeClickEvent);
    document.getElementById('generateLunchGroups').addEventListener('click', generateLunchGroupsClickEvent);
  };

  init();
})();