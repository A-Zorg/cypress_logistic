Feature: trading search

#  Scenario Outline: check searching of the "Trading" page
#    Given I open the Trading application
#     And I select searching type "<button>"
#     And I fill text to the "search location" field: "<location>"
#     And I fill text to the "container type" field: "<container_type>"
#     And I select condition: "<condition>"
#     And I select company: "<company>"
#    When click Search button
#    Then "<result>" search result should contain: "<location>-<abbreviation_type>"
#
#      Examples:
#      | button               | location| container_type  | abbreviation_type | condition     | company       | result |
#      |  Find sales offers   | AJMAN   | 20 Side door    | 20SD              | Brand new     | xChange   |  all   |
#      |  Find buying demands | DUBAI   | 20 Open top     | 20OT              | Brand new     | Any company   |  all   |

#  Scenario Outline: check "sort by" filter
#      Given I open the Trading application
#       And I select searching type "<button>"
#       And I sort by "<vector>" "<type_sort>"
#       And I check sorting by "<vector>" <type_sort>
#    Examples:
#      | button               | type_sort | vector  |
#      | Find sales offers    | price     | Lowest  |
#      | Find buying demands  | price     | Lowest  |
#      | Find sales offers    | price     | Highest |
#      | Find buying demands  | price     | Highest |
#      | Find sales offers    | quantity  | Highest |
#      | Find buying demands  | quantity  | Highest |
#      | Find sales offers    | quantity  | Lowest  |
#      | Find buying demands  | quantity  | Lowest  |
#      | Find sales offers    | Newest    | null    |
#      | Find buying demands  | Newest    | null    |

  Scenario: check "sort by" filter
      Given I open the Trading application
       And I select searching type "Find buying demands"
      When I click "Load more" button
      Then I compare qty of the rows before and after clicking "Load more"