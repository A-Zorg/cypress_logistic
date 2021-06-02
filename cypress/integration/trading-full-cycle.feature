Feature: full cycle trading

  Scenario: Creation of Buying Demand
    Given I open the Trading application
     And clear created "SALES OFFERS"
     And clear created "BUYING DEMANDS"
     And I create -"New buying demand"-
     And Login as user #"2"
     And I open the Trading application
     And I search created BUYING DEMAND
     And I start NEGOTIATION
     And I fill in NEGOTIATION fields: 10, "2", "asdasd", "false"
     And I check "BUYER" company: "xChange"
     And Login as user #"1" and open current DEAL
     And I will update OFFER price on: 5
     And I check "SELLER" company: "K+N Belgium"
     And Login as user #"2" and open current DEAL
     And I will update OFFER price on: -5
    When Login as user #"1" and open current DEAL
     And I confirm the offer
     And Login as user #"2" and open current DEAL
     And I confirm the offer
    Then I should see the message: "Binding contract accepted"
     And I will check offer confirmation data in the chat





