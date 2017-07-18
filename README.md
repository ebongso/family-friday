# family-friday
* This application allows users to enter employee names one by one into the system. There should be at least 3 employees in the system. A lunch group can then be generated. 
* The employee names are stored in the Local Storage (if detected). Everytime the system is refreshed or restarted, it will load the employee names from the Local Storage into the system.
* Employee names are shuffled then divided into groups when the "Generate Lunch Groups" button is clicked.
* Simple test cases are available in /public/js/tests.js. They are commented out in index.html, but can be run as needed.

## Installation:
1. After cloning the repo, run `cd family-friday`
2. Run `npm install`
3. Run `node app.js`
4. Go to your browser and navigate to `http://localhost:3000`

## Future enhancements:
1. This node.js server is set up so that mongodb can be added to store the employee names as a permanent backup.
2. Logging needs to be added.
3. Babel can be added to convert the js files for older browsers' compatibility.
4. Min and Max fields can be added to the UI if there's a need to change the table size in the future.
5. Employee name removal can be added.
6. Clear all employee names can be added.
7. Show all employee names (without groups) can be added.
8. Show total of employee names can be added.