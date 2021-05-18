Feature: trading search


  Scenario Outline: check searching of the "Trading" page
    Given click Trading icon on the MainBar
     And click "<button>" button
     And input text to the "search location" field: "<location>"
     And input text to the "container type" field: "<container_type>"
     And select condition: "<condition>"
     And select company: "<company>"
    When click Search button
    Then "<result>" search result should contain: "<location>-<abbreviation_type>"

      Examples:
      | button               | location| container_type   | abbreviation_type | condition     | company       | result |
      |  Find sales offers   | HAMBURG | 40 High cube (HC)| 40HC              | Cargo worthy  | Any company   |  none  |
      |  Find buying demands | HAMBURG | 40 High cube (HC)| 40HC              | Cargo worthy  | InviCont      |  all   |

