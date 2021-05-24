Feature: check of new sales offer and buying demand

  Scenario Outline: Creation of Sales Offer
    Given I open the Trading application
     And I create -"New sales offer"-
    When I fill the Basic Container information in: "<location>","<condition>","<offer_type>","<from_year>","<to_year>"
     And I fill offer details in: "<price>","<qty>","<valid>"
     And I fill optional data in: "<comment>","<file_path>"
     And I fill other details in: "<radio>","<pickup_date>","<csc_date>","<prefix>","<color>"
     And I click the button " Publish sales offer "
    Then check created "SALES OFFER" with prev parameters:"<price>", "<location>", "<qty>", "<offer_type>", "<condition>", " <from_year>-<to_year> "
     And to TRADING page
  Examples:
      | location | condition | offer_type | from_year | to_year | price | qty | valid | comment        | file_path      | radio        | pickup_date| csc_date  | prefix | color  |
      |  DUBAI   | Brand new | 20 Open top| 2020      | 2021    | 12    | 32  | 1 year| enter some text| cont_image.jpg | domestic use | 14.05.2021 | 16.05.2021 | MSCU   | RAL12345 |
      |  AJMAN   | Brand new |20 Side door| 2009      | 2018    | 67    | 2   |1 month| enter some text| cont_image.jpg |domestic use|"14.05.2021" |"16.05.2021"| MSCU   |RAL12345|


  Scenario Outline: Creation of Buying Demand
    Given I open the Trading application
     And I create -"New buying demand"-
    When I fill the Basic Container information in: "<location>","<condition>","<offer_type>","<from_year>","<to_year>"
     And I fill offer details in: "<price>","<qty>","<valid>"
     And I fill optional data in: "<comment>","null"
     And I fill other details in: "<radio>","<pickup_date>","<csc_date>","<prefix>","<color>"
     And I click the button " Publish buying demand "
    Then check created "BUYING DEMAND" with prev parameters:"<price>", "<location>", "<qty>", "<offer_type>", "<condition>", " <from_year>-<to_year> "
     And to TRADING page

  Examples:
      | location | condition | offer_type | from_year | to_year | price | qty | valid | comment        | radio        | pickup_date| csc_date  | prefix | color  |
      |  DUBAI   | Brand new | 20 Open top| 2020      | 2021    | 12    | 32  | 1 year| enter some text| domestic use | 14.05.2021 | 16.05.2021 | MSCU   | RAL12345 |
      |  AJMAN   | Brand new |20 Side door| 2009      | 2018    | 67    | 2   |1 month| enter some text| domestic use | 14.05.2021 | 16.05.2021 | MSCU   | RAL12345 |