Feature: User joins the box in the box

Scenario: User confirms of invitation in the box
Given main user creates box and adds participant from created boxPage by hand
When user2 goes to login page
When user2 logs in as "<login>" and "<password>"
When user2 goes to boxes page
When user2 finds unconfirmed usercard in the box
When user2 creates a member card
Then user2 is on his Dashboard Page

Examples:
    | login | password |
    | tigranka+test2@gmail.com  | test1234  |

