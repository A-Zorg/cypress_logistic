Feature: trading search


  Scenario: check searching of the buying demands
    Given click Trading icon on the MainBar
#     And click
#     And input text to the "search location" field: "Hamburg"
#    And input text to the "container type" field: "20 Dry Container"
     And select condition: "Brand new"
     And select company: "Alfa Container"
     And click Search button
