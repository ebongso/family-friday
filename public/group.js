'use strict';

let group = (() => {
  //Based on Fisher-Yates shuffle algorithm, a random number is generated
  //then the array element at the current position is swapped with the random number'.
  let shuffleNames = (names) => {
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
  let divide = (shuffledNames, groups, group, lastPos, totalNames) => {
    if(totalNames > 0) {
      //Each condition checks ahead to ensure nobody is left out or eats alone.
      for(let i = MAX; i >= MIN; i--) {
        if(totalNames - i >= MIN || totalNames - i === 0) {
          lastPos += i;
          groups = create(shuffledNames, lastPos, i, groups, group);
          totalNames -= i;
          group++;
          break;
        }
      }
      //Recursively call the function with the rest of the names.
      return divide(shuffledNames, groups, group, lastPos, totalNames);
    } else { //no more names left
      return groups;
    }
  };

  //Create the group by limit, so each group has the specified number of people in it.
  let create = (shuffledNames, lastPos, limit, groups, group) => {
    for(let i = lastPos - limit; i < lastPos; i++) {
      groups[group] = (groups[group] ? groups[group] + ';' : '') + shuffledNames[i];
    }
    return groups;
  }

  return {
    divide: divide,
    shuffleNames: shuffleNames
  }
})();