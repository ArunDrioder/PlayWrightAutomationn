
1. //---------- LOCATORS IN PLAYWRIGHT -----------

// If Id is present
// css -> tagname#id (or) #id

// If class attribute is present
// css -> tagname.class (or) .class

// Write css based on any Attribute
// css -> [attribute='value']

// Write Css with traversing from Parent to child
// css -> parenttagname >> childtagname

// If needs to write the locator based on text
// text=""


2. //-----METHODS TO RUN THE TESTS IN PLAYWRIGHT-----

// npx playwright test
// npx playwright test --headed
// npx playwright test --ui
// npx playwright test tests/fileName.spec.js
//