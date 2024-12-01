Feature: User joins the box via invite link

Scenario: User joins the box via link  successfuly
Given main user create box and invite users by invite link
When user1 follows the invite link
When user1 confirms his participation
When user1 logs in as "<login>" and "<password>"
# When user logs in with table
# | login                       | password |
# | tigranka+testmain@gmail.com | test1234 |
When user1 creates a member card
Then user1 is on his Dashboard Page

Examples:
    | login | password |
    | tigranka+test1@gmail.com  | test1234  |

