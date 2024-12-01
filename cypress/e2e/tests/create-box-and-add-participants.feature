Feature: Main user create box

Scenario: User logs in sucessfuly and create a box
Given main user is on secret santa login page
When main user logs in as "<login>" and "<password>"
When main user is on dashboard page
When main user create box
When box is created
When main user click button Добавить участников
When main user copies the invite link
When main user adds participant from created boxPage by hand
When main user creates a member card for himself


Examples:
    | login | password |
    | tigranka+testmain@gmail.com  | test1234  |
    