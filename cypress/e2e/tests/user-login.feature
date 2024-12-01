Feature: User login on secret santa website

Scenario: User logs in sucessfuly 
Given user is on secret santa login page
When user logs in as "<login>" and "<password>"
# When user logs in with table
# | login                       | password |
# | tigranka+testmain@gmail.com | test1234 |
Then user is on dashboard page

Examples:
    | login | password |
    | tigranka+testmain@gmail.com  | test1234  |

