@regression @api @objects
Feature: Object API

  @getAllObjects
  Scenario: Get list of all objects
    When I request to get all objects
    Then the response status code should be 200
    And the response objects must have the following fields
    |id|
    |name|

  @getObjectById
  Scenario: Get single object
    # Note: The ID being requested might not exist in the backend.
    # This scenario assumes that the ID "3" exists.
    # If the ID does not exist, the test will fail due to a 404 Not Found status code.
    When I request to get single object with id 3
    Then the response status code should be 200
    And the response object id must be "3"

  @createObject
  Scenario Outline: Create an object
    When I request to create a new product with the following details
      | name   | data   |
      | <name> | <data> |
    Then the response status code should be 200
    And the response must contain the product details
      | name   | data   |
      | <name> | <data> |

    Examples:
      | name                 | data                                                                                     |
      | Apple MacBook Pro 16 | {"year": 2019, "price": 1849.99, "CPU model": "Intel Core i9", "Hard disk size": "1 TB"} |
      | Apple MacBook Pro 16 | {"year": 2019, "price": 1849.99}                                                         |

  @deleteObject
  Scenario: Delete an object
    When I request to create a new product with the following details
      | name      | data                                                                                     |
      | Apple Mac | {"year": 2019, "price": 1849.99, "CPU model": "Intel Core i9", "Hard disk size": "1 TB"} |
    Then the response status code should be 200
    When I request to delete the object
    Then the response status code should be 200
    And the response must have a "confirmation" message

  @deleteObject
  Scenario: Delete an object that does not exist
    When I request to delete the object with id "invalid_id"
    Then the response status code should be 404
    And the response must have a "error" message

  @createObject @updateObject
  Scenario: Update an object
    When I request to create a new product with the following details
      | name      | data                                                                                     |
      | Apple Mac | {"year": 2019, "price": 1849.99, "CPU model": "Intel Core i9", "Hard disk size": "1 TB"} |
    Then the response status code should be 200
    When I request to update the object with the following details
      | name      | data                                         |
      | Apple Mac | {"price": 1849.99, "Hard disk size": "1 TB"} |
    Then the response status code should be 200
    And the response must contain the product details
      | name      | data                                         |
      | Apple Mac | {"price": 1849.99, "Hard disk size": "1 TB"} |

  @createObject @partialUpdateObject
  Scenario: Partial update an object
    When I request to create a new product with the following details
      | name      | data                                                                                     |
      | Apple Mac | {"year": 2019, "price": 1849.99, "CPU model": "Intel Core i9", "Hard disk size": "1 TB"} |
    Then the response status code should be 200
    When I request to partial update the object with the following details
      | name         |
      | Apple iPhone |
    Then the response status code should be 200
    And the response must contain the product details
      | name         | data                                                                                     |
      | Apple iPhone | {"year": 2019, "price": 1849.99, "CPU model": "Intel Core i9", "Hard disk size": "1 TB"} |
