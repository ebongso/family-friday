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
    
    document.getElementById('employeeDisplay').appendChild(createLi(employeeName));
    document.getElementById('employeeName').value = '';
    document.getElementById('message').innerHTML = employeeName + ' has been added!';
  };

  let generateLunchGroupsClickEvent = () => {
    divideIntoGroups(shuffleNames());
  };

  //Based on Fisher-Yates shuffle algorithm, a random number is generated
  //then the array element at the current position is swapped with the random number'.
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

  let divideIntoGroups = (shuffledNames) => {
    let totalNames = shuffledNames.length;
    const max = 5, mid = 4, min = 3;
    let groups = [];
    let group = 0;
    let lastPos = 0;
    while(totalNames > 0) {
      if(totalNames - max >= min || totalNames - max === 0) {
        lastPos += max;
        for(let i = lastPos - max; i < lastPos; i++) {
          groups[group] = (groups[group] ? groups[group] + ';' : '') + shuffledNames[i];
        }
        totalNames -= max;
        group++;
      } else if(totalNames - mid >= min || totalNames - mid === 0) {
        lastPos += mid;
        for(let i = lastPos - mid; i < lastPos; i++) {
          groups[group] = (groups[group] ? groups[group] + ';' : '') + shuffledNames[i];
        }
        totalNames -= 4;
        group++;
      } else if(totalNames - min >= min || totalNames - min === 0) {
        lastPos += 3;
        for(let i = lastPos - min; i < lastPos; i++) {
          groups[group] = (groups[group] ? groups[group] + ';' : '') + shuffledNames[i];
        }
        totalNames -= 3;
        group++;
      }
    }
    console.log(groups.join('|'));
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