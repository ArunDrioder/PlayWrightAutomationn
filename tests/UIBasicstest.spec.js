const {test} = require('@playwright/test'); // This is the new way to import test and expect in Playwright 1.30.0 and later versions

test('First Playwright Test', async ()=> // This is called an anonymous function, it is a function that does not have a name. It is often used as a callback function or as an argument to another function. In this case, it is used as the second argument to the test function, which defines the test case.
{

    //javascript is asynchronous, it means that the code will not wait for the previous line to finish before moving on to the next line. This can lead to unexpected behavior if you are not careful. To handle this, you can use async/await syntax to make your code more readable and easier to understand.

    // To use async/await, you need to declare your test function as async. This allows you to use the await keyword inside the function to wait for asynchronous operations to complete before moving on to the next line of code.

}); // This is a basic test case in Playwright. You can add your test steps inside the function. For example, you can navigate to a webpage, interact with elements, and make assertions.