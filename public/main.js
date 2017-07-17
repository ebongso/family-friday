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

  //Time to shuffle names and divide them into lunch groups!
  let generateLunchGroupsClickEvent = () => {
    const shuffledNames = shuffleNames();
    const groups = divideIntoGroups(shuffledNames, [], 0, 0, shuffledNames.length);
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

  //Divide the names already shuffled into groups recursively.
  //It returns the groups in an array containing semi-colon-separated names in each element.
  let divideIntoGroups = (shuffledNames, groups, group, lastPos, totalNames) => {
    if(totalNames > 0) {
      //Each condition checks ahead to ensure there's still more than 3 people left for each group.
      if(totalNames - MAX >= MIN || totalNames - MAX === 0) {
        lastPos += MAX;
        groups = createGroup(shuffledNames, lastPos, MAX, groups, group);
        totalNames -= MAX;
        group++;
      } else if(totalNames - MID >= MIN || totalNames - MID === 0) {
        lastPos += MID;
        groups = createGroup(shuffledNames, lastPos, MID, groups, group);
        totalNames -= MID;
        group++;
      } else if(totalNames - MIN >= MIN || totalNames - MIN === 0) {
        lastPos += MIN;
        groups = createGroup(shuffledNames, lastPos, MIN, groups, group);
        totalNames -= MIN;
        group++;
      }
      //Recursively call the function with the rest of the names.
      return divideIntoGroups(shuffledNames, groups, group, lastPos, totalNames);
    } else { //no more names left
      return groups;
    }
  };

  //Create the group by limit, so each group has the specified number of people in it.
  let createGroup = (shuffledNames, lastPos, limit, groups, group) => {
    for(let i = lastPos - limit; i < lastPos; i++) {
      groups[group] = (groups[group] ? groups[group] + ';' : '') + shuffledNames[i];
    }
    return groups;
  }

  //When starting up, the app will load data and show employees.
  let init = () => {
    loadEmployees();
    showEmployees();
    document.getElementById('addEmployee').addEventListener('click', addEmployeeClickEvent);
    document.getElementById('generateLunchGroups').addEventListener('click', generateLunchGroupsClickEvent);
  };

  init();
})();