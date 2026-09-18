const { test, expect } = require('@playwright/test');



test ('Register & login Playwright Test', async ({ browser }) => {
    
    const context = await browser.newContext(); 
    const page = await context.newPage(); 

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login'); 
    console.log(await page.title());

    const registerLink = page.locator('p.login-wrapper-footer-text');
    const userFirstName =  page.locator('#firstName');
    const userLastName =  page.locator('#lastName');
    const userEmail =  page.locator('#userEmail');
    const userPhoneNumber = page.locator('#userMobile');
    const maleRadioBtn = page.locator("//input[@value='Male']");
    const userPassword = page.locator('#userPassword');
    const userConfirmPassword = page.locator('#confirmPassword');
    const checkBox = page.locator("//input[@type='checkbox']");
    const registerButton = page.locator('[name="login"]')
    const registrationSuccessValidation = page.locator('h1:has-text("Account Created Successfully")');
    const navToLoginFromReg = page.locator(':text-is("Login")');
    const loginButton = page.locator("#login");


    const singleItemName = page.locator(".card-body b");

    // console.log(await registerLink.textContent());
    // console.log(await registerLink.innerText());

    // await registerLink.click();

    // await userFirstName.fill("BeautyBujjy")
    // await userLastName.fill ("Heyya")
    // await userEmail.fill("thecoolbeautybujjy@gmail.com");
    // await userPhoneNumber.fill("7402191727");
    // await maleRadioBtn.click();
    // await userPassword.fill("Arun@!234");
    // await userConfirmPassword.fill("Arun@!234");
    // await checkBox.click();
    // await registerButton.click();

    // console.log(await registrationSuccessValidation.textContent());

    // await navToLoginFromReg.click();

    await userEmail.fill("thecoolbeautybujjy@gmail.com");
    await userPassword.fill("Arun@!234");
    await loginButton.click();
    
     //await page.waitForLoadState('networkidle'); // This will wait until there are no network connections for at least 500 ms. This is useful to ensure that the page has fully loaded and all network requests have completed before proceeding with the test.
     await singleItemName.first().waitFor(); // This will wait until the first element matching the locator is attached to the DOM and has a non-empty text content. This is useful to ensure that the element is fully loaded and ready for interaction before proceeding with the test.
     const allProductTitles = await singleItemName.allTextContents();
     console.log(allProductTitles);

});

test.only('Event Management in EventHub', async ({ browser }) => {
    const context = await browser.newContext(); 
    const page = await context.newPage();
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    console.log(await page.title());

    const userEmail = page.locator('#email');
    const userPassword = page.locator('#password');
    const loginButton = page.locator('#login-btn');
    const eventsTabHeaderButton = page.locator(':text-is("Events")');
    const newEventButton = page.locator(':text-is("Add New Event")');
    const newEventHeader = page.locator('h2:has-text("+ New Event")');
    const eventTitleInput = page.getByLabel('Title*');
    const eventDescriptionInput = page.getByRole('textbox', { name: 'Describe the event…' });
    const eventLocation = page.getByLabel('City*');
    const eventVenue = page.locator('#venue');
    const eventDateTime = page.locator("//input[@id='event-date-&-time']");
    const eventPrice = page.locator("//input[@id='price-($)']");
    const eventTotalNoSeats = page.locator('#total-seats');
    const addEventButton = page.getByRole('button', { name: '+ Add Event' });
    const eventCreatedToastMessage = page.getByText('✓Event created!×');
    const eventParticipantName = page.getByRole('textbox', { name: 'Full Name*' });
    const eventParticipantEmail = page.getByRole('textbox', { name: 'Email*' });
    const eventParticipantPhoneNumber = page.getByRole('textbox', { name: 'Phone Number*' });
    const eventTicketBookingButton = page.locator('button:has-text("Confirm Booking")');
    const eventBookingSuccessMessage = page.getByRole('heading', { name: 'Booking Confirmed! 🎉' })
    const viewEventBookingButton = page.getByRole('button', { name: 'View My Bookings' });
    const eventBookingCard = page.getByTestId('booking-card');
    const viewEventBookingDetail = page.getByRole('button', { name: 'View Details' });
    const eventBookingStatus = page.getByText('confirmed');
    const createdEventCard = page.locator('#event-card').filter({hasText:"Playwright Event creation assignment"});
    const eventBookTicketButton = createdEventCard.getByRole('link', { name: 'Book Now' });
    const totalSeats = 100;
    

await userEmail.fill("arunprasadh.s@gmail.com");
    await userPassword.fill("Arun@7274");
    await loginButton.click();
    await expect(eventsTabHeaderButton).toBeVisible();
    await eventsTabHeaderButton.click();
    await newEventButton.click();
    await expect(newEventHeader).toBeVisible();
    await eventTitleInput.fill("Playwright Event creation assignment");
    await eventDescriptionInput.fill("This is a test event created using Playwright automation.");
    await eventLocation.fill("Bangalore");
    await eventVenue.fill("DLF Woodland Heights");
    await eventDateTime.fill("2026-10-30T10:00");
    await eventPrice.fill("50");
    await eventTotalNoSeats.fill("100");
    await addEventButton.click();
    await expect(eventCreatedToastMessage).toContainText('Event created', {timeout: 5000 });
    await eventsTabHeaderButton.click();
    const createdEvent = createdEventCard.getByRole('heading', { name: 'Playwright Event creation assignment' });
    await expect(createdEvent).toBeVisible();
    console.log(await createdEvent.textContent());

    await scrollUntilVisible(page, eventBookTicketButton);

    await expect(eventBookTicketButton).toBeVisible();
    await eventBookTicketButton.click();
    await expect(eventParticipantName).toBeVisible();
    
    await eventParticipantName.fill("Arunprasadh");
    await eventParticipantEmail.fill("arunprasadh.s@gmail.com");
    await eventParticipantPhoneNumber.fill("7402112979");
    await eventTicketBookingButton.click();
    await expect(eventBookingSuccessMessage).toBeVisible();
    await expect(eventBookingSuccessMessage).toContainText('Booking Confirmed', {timeout: 5000 });
    await expect(viewEventBookingButton).toBeVisible();
    await viewEventBookingButton.click();
    await expect(eventBookingCard).toBeVisible();
    await expect(viewEventBookingDetail).toBeVisible();
    await viewEventBookingDetail.click();
    await expect(eventBookingStatus).toBeVisible();
    await expect(eventBookingStatus).toContainText('confirmed', {timeout: 5000 });
    await eventsTabHeaderButton.click();
    await scrollUntilVisible(page, createdEventCard);
    await expect(createdEventCard).toBeVisible();
    await expect(createdEventCard).toContainText(totalSeats-1 +" seats available", {timeout: 5000 });
    console.log(totalSeats-1 +" seats available");

});





async function scrollUntilVisible(page, locator, options = {}) {
    const {
        maxAttempts = 20,
        scrollAmount = 700,
        waitTime = 300
    } = options;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        if (await locator.count() > 0 && await locator.isVisible()) {
            const isInViewport = await locator.evaluate((element) => {
                const bounds = element.getBoundingClientRect();

                return (
                    bounds.top >= 0 &&
                    bounds.left >= 0 &&
                    bounds.bottom <= window.innerHeight &&
                    bounds.right <= window.innerWidth
                );
            });

            if (isInViewport) {
                return;
            }

            await locator.scrollIntoViewIfNeeded();
            return;
        }

        await page.mouse.wheel(0, scrollAmount);
        await page.waitForTimeout(waitTime);
    }

    throw new Error(
        `Locator was not found after ${maxAttempts} scroll attempts`
    );
}