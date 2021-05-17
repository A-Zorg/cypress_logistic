Feature: check of new sales offer and buying demand

  Scenario Outline: Creation of Sales Offer
    Given click Trading icon on the MainBar
     And click button -"New sales offer"-
    When fill the field -location- with "<location>"
     And fill the field -condition- with "<condition>"
     And fill the field -type- with "<offer_type>"
     And fill the field -from year- with "<from_year>"
     And fill the field -to year- with "<to_year>"
     And click the button " Next step "
     And fill the field -target price- with "<price>"
     And fill the field -quantity- with "<qty>"
     And fill the field -valid for- with "<valid>"
     And click the button " Next step "
     And fill the field -comment- with "<comment>"
     And select image file with path-name "<file_path>"
     And click the button " Publish sales offer "
    Then check created "SALES OFFER" with prev parameters:"<price>", "<location>", "<qty>", "<offer_type>", "<condition>", " <from_year>-<to_year> "
     And to TRADING page
  Examples:
      | location | condition | offer_type | from_year | to_year | price | qty | valid | comment        | file_path      |
      |  DUBAI   | Brand new | 20 Open top| 2020      | 2021    | 12    | 32  | 1 year| enter some text| cont_image.jpg |
      |  AJMAN   | Brand new |20 Side door| 2009      | 2018    | 67    | 2   |1 month| enter some text| cont_image.jpg |


  Scenario Outline: Creation of Buying Demand
    Given click Trading icon on the MainBar
     And click button -"New buying demand"-
    When fill the field -location- with "<location>"
     And fill the field -condition- with "<condition>"
     And fill the field -type- with "<offer_type>"
     And fill the field -from year- with "<from_year>"
     And fill the field -to year- with "<to_year>"
     And click the button " Next step "
     And fill the field -target price- with "<price>"
     And fill the field -quantity- with "<qty>"
     And fill the field -valid for- with "<valid>"
     And click the button " Next step "
     And fill the field -comment- with "<comment>"
     And click the button " Publish buying demand "
    Then check created "BUYING DEMAND" with prev parameters:"<price>", "<location>", "<qty>", "<offer_type>", "<condition>", " <from_year>-<to_year> "
     And to TRADING page

  Examples:
      | location | condition | offer_type | from_year | to_year | price | qty | valid | comment        |
      |  DUBAI   | Brand new | 20 Open top| 2020      | 2021    | 12    | 32  | 1 year| enter some text|
      |  AJMAN   | Brand new |20 Side door| 2009      | 2018    | 67    | 2   |1 month| enter some text|