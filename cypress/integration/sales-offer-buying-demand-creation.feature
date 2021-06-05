Feature: check of new sales offer and buying demand

#  Scenario Outline: Creation of Sales Offer
#    Given I open the Trading application
#     And I create -"New sales offer"-
#    When I fill the Basic Container information in: "<location>","<condition>","<offer_type>","<from_year>","<to_year>"
#     And I fill offer details in: "<price>","<qty>","<valid>"
#     And I fill optional data in: "<comment>","<file_path>"
#     And I fill other details in: "<radio>","<pickup_date>","<csc_date>","<prefix>","<color>"
#     And I click the button " Publish sales offer "
#    Then check created "SALES OFFER" with prev parameters:"<price>", "<location>", "<qty>", "<offer_type>", "<condition>", " <from_year>-<to_year> "
#     And to TRADING page
#  Examples:
#      | location | condition | offer_type   | from_year | to_year | price | qty | valid | comment        | file_path      | radio        | pickup_date| csc_date   | prefix | color    |
#      |  DUBAI   | Brand new | 20 Open top  | 2020      | 2021    | 12    | 32  | 1 year| enter some text| cont_image.jpg | domestic use | 14.05.2021 | 16.05.2021 | MSCU   | RAL12345 |
#      |  AJMAN   | Brand new | 20 Side door | 2009      | 2018    | 67    | 2   |1 month| enter some text| cont_image.jpg | domestic use | 14.05.2021 | 16.05.2021 | MSCU   | RAL12345 |
#
#
#  Scenario Outline: Creation of Buying Demand
#    Given I open the Trading application
#     And I create -"New buying demand"-
#    When I fill the Basic Container information in: "<location>","<condition>","<offer_type>","<from_year>","<to_year>"
#     And I fill offer details in: "<price>","<qty>","<valid>"
#     And I fill optional data in: "<comment>","null"
#     And I fill other details in: "<radio>","<pickup_date>","<csc_date>","<prefix>","<color>"
#     And I click the button " Publish buying demand "
#    Then check created "BUYING DEMAND" with prev parameters:"<price>", "<location>", "<qty>", "<offer_type>", "<condition>", " <from_year>-<to_year> "
#     And to TRADING page
#
#  Examples:
#      | location | condition | offer_type | from_year | to_year | price | qty | valid | comment        | radio        | pickup_date| csc_date  | prefix | color  |
#      |  DUBAI   | Brand new | 20 Open top| 2020      | 2021    | 12    | 32  | 1 year| enter some text| domestic use | 14.05.2021 | 16.05.2021 | MSCU   | RAL12345 |
#      |  AJMAN   | Brand new |20 Side door| 2009      | 2018    | 67    | 2   |1 month| enter some text| domestic use | 14.05.2021 | 16.05.2021 | MSCU   | RAL12345 |

  Scenario Outline: check validators during creation of the new entities
    Given I open the Trading application
     And I create -"<type>"-
    Then I change <field_1> -> <value_1> & <field_2> -> <value_2> and validator:"<validator>" should "<presence>"
    Examples:
      | type               | field_1 | value_1 | field_2 | value_2  | validator                   | presence |
#      | New buying demand  | from    | 1989    | to      | 2000     | Minimal value must be 1990  |   be     |
    | New buying demand  | price    | 120    | qty      | 0     | Minimal value must be 1  |   be     |
       | New buying demand  | price    | 120    | qty      | 1     | Minimal value must be 1  |   not be     |
    | New buying demand  | price    | 120    | qty      | 1000     | Maximal value must be 999  |   be     |
    | New buying demand  | price    | 120    | qty      | 999     | Maximal value must be 999  |   not be     |

