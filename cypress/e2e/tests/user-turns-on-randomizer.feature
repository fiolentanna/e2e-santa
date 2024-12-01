Feature: Main user starts randomizer

Scenario: Main user creates box, adds participants, users adds to box, main user starts randomizer and after deletes box
Given main user is on login page
When main user logs in successfully
When main user is on dashboard page
When main user clicks the Create Box button
When main user fills in the box name field
When main user clears the box ID field and fills it with new text
When main user selects icon 6
When main user activates the gift price setting toggle
When main user sets the minimum gift amount
When main user sets the maximum gift amount
When main user selects the Euro currency
When box is created, the main user is on the box page
When main user clicks the Add members button
When main user copies the invitation link
When main user adds manual invitation for user 2
When main user creates his own card for the box
When user1 follows the invitation link
When user1 clicks on the Create Member Card button
When user1 clicks button Sign in
When user1 logs in successfully
When user1 clicks on Create Member Card
When user1 writes wishes
When user1 successfully created his card
When user3 follows the invitation link
When user3 clicks on the Create Member Card button
When user3 clicks button Sign in
When user3 logs in successfully
When user3 clicks on Create Member Card
When user3 writes wishes
When user3 successfully created his card
When user3 follows the invitation link
When user2 is on login page
When user2 logs in successfully
When user2 finds the box and clicks on his unverified card on the Boxes page
When user2 confirms card creation
When user2 selects icon 12
When user2 writes wishes
When user2 successfully created his card
When main user is on login page
When main user logs in successfully to start randomizer
When main user clicks the Boxes button in the header
When main user finds the box and clicks on it
When main user clicks the button Go to the randomizer
When main user clicks the Run randomizer button and confirms his actions
When the main user receives confirmation that the randomizer was successfully run
Then main user deletes box


