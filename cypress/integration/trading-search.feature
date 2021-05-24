Feature: trading search

  Scenario Outline: check searching of the "Trading" page
    Given I open the Trading application
     And I select searching type "<button>"
     And I fill text to the "search location" field: "<location>"
     And I fill text to the "container type" field: "<container_type>"
     And I select condition: "<condition>"
     And I select company: "<company>"
    When click Search button
    Then "<result>" search result should contain: "<location>-<abbreviation_type>"

      Examples:
      | button               | location| container_type   | abbreviation_type | condition     | company       | result |
      |  Find sales offers   | HAMBURG | 40 High cube (HC)| 40HC              | Cargo worthy  | Any company   |  none  |
      |  Find buying demands | HAMBURG | 40 High cube (HC)| 40HC              | Cargo worthy  | InviCont      |  all   |

