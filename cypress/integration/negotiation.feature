Feature: Check the negotiation

  Scenario Outline: start negotiation
    Given I open the Trading application
     And I search "DEMAND" with the possibility of negotiations
     And I fill in NEGOTIATION fields: <price_diff_1>, "<qty_1>", "<comment>", "<+_buying_demand>"
    When I will update OFFER conditions: <price_diff_2>, <qty_2>, <storage>, <freedays>, "<handling>"
    Then I should see the message: "Great! New offer is sent to your partner."
     And I will check the message about UPDATE in the chat
     And I will check the created negotiation in the INBOX
     But Delete created negotiation
      Examples:
      | price_diff_1 | qty_1 | comment      | +_buying_demand | price_diff_2 | qty_2 | storage | freedays | handling  |
      |  10          | 3     | comment text | true            | 25           | 2     | 3       | 2.5      | true      |

  Scenario: sending some message to the negotiation chat
    Given I open the Trading application
     And I search "DEMAND" with the possibility of negotiations
     And I fill in NEGOTIATION fields: 10, "3", "<comment>", "true"
    When I write message "124124124" in the chat
    Then I check message "124124124" in the chat
     And Delete created negotiation

   Scenario: sending some message to the negotiation chat
      Given I open the Trading application
       And I search "DEMAND" with the possibility of negotiations
       And I fill in NEGOTIATION fields: 10, "3", "<comment>", "true"
      When I upload some files to the negotiation: "cont_image.jpg" and "sample.pdf"
      Then I check that files were created: "cont_image.jpg" and "sample.pdf"
       And I delete uploaded files
       And Delete created negotiation
#
    Scenario: sending some message to the negotiation chat
        Given I open the Trading application
         And I search "DEMAND" with the possibility of negotiations
         And I fill in NEGOTIATION fields: 10, "3", "<comment>", "true"
         And I select the member on the DEAL page: "str@container-xchange.com | Stepan - xChange"
        When I confirm the offer
        Then I should see the message: "Great! New offer is sent to your partner."
         And I should see message that seller "needs to confirm"
         And I will check offer confirmation data in the chat
         And Delete created negotiation

    Scenario: pick up references
      Given I open the Trading application
       And I search "DEMAND" with the possibility of negotiations
       And I fill in NEGOTIATION fields: 10, "3", "<comment>", "true"
       And I add some pick-up references:
        | ref_name | qty | datum       | comment      |
        |  FIRST   | 2   |  10.05.2021 | some text    |
        |  SECOND  | 3   |  12.05.2021 | another text |
      And I will check message about pick up reference in the chat
      And I add containers to the created pick up references
     When I confirm the pick up references
      Then I should see the message: "Great! Release reference has been successfully confirmed"
      And I delete all containers and references
      And Delete created negotiation


      #  Scenario: clean inbox
#    Given I open the Trading application
#     And clean inbox
#  And clean inbox
#  And clean inbox
#  And clean inbox
#  And clean inbox

