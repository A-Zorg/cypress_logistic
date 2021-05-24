Feature: Check the negotiation
  # Enter feature description here

  Scenario: start negotiation
    Given I open the Trading application
     And I search OFFER with the possibility of negotiations
     And I fill in NEGOTIATION fields: 10, "3", "text for comment", "true"