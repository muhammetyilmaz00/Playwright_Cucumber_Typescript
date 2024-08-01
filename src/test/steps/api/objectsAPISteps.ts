import { When, Then } from "@cucumber/cucumber";
import { APIResponse, expect } from "playwright/test";
import { apiService } from "../../../apiService/apiService";

// Variables to store the response and ID of created or manipulated objects.
let response: APIResponse;
let id: any;

// Step definition for requesting all objects from the API.
When("I request to get all objects", async () => {
  response = await apiService.getAllObjects();
});

// Step definition for verifying the status code of the API response.
Then("the response status code should be {int}", async (statusCode: number) => {
  expect(response.status()).toEqual(statusCode);
});

// Step definition to check if each object in the response has a specific property.
Then("the response objects must have {string}", async (property: string) => {
  const requestBody = JSON.parse(await response.text());

  requestBody.forEach((json: any) => {
    expect(json).toHaveProperty(property);
  });
});

// Step definition for creating a new product with details from the feature file.
When("I request to add a new product with the following details", async (table: any) => {
    const productDetails = table.hashes()[0];
    const requestBody = {
      name: productDetails.name,
      data: JSON.parse(productDetails.data),
    };

    response = await apiService.createObject(requestBody);

    // Extract and store the ID of the newly created object.
    id = JSON.parse(await response.text()).id;

    // Check if the response contains a 'createdAt' timestamp.
    const responseBody = JSON.parse(await response.text());
    expect(responseBody).toHaveProperty("createdAt");
  }
);

// Step definition for verifying that the response contains specific product details.
Then("the response must contain the product details", async (table: any) => {
  const productDetails = table.hashes()[0];

  await response.body().then((object: any) => {
    // Validate that the response object matches the expected details.
    object.name = productDetails.name;
    object.data = JSON.parse(productDetails.data);
    expect(object.id).not.toBeNull();
  });
});

// Step definition for requesting a single object by ID.
When("I request to get single object with id {int}", async (id: number) => {
  response = await apiService.getObjectById(id);
});

// Step definition to check if the returned object has the expected ID.
Then("the response object id must be {string}", async (id: string) => {
  const responseBody = JSON.parse(await response.text());
  expect(responseBody[0].id).toEqual(id);
});

// Step definition for deleting an object with the stored ID.
When("I request to delete the object", async () => {
  response = await apiService.deleteObject(id);
});

// Step definition for attempting to delete an object with a specific (invalid) ID.
When("I request to delete the object with id {string}", async (invalid_id: string) => {
    response = await apiService.deleteObject(invalid_id);
    id = invalid_id;
  }
);

// Step definition to check if the response contains an error message for a failed delete operation.
Then("the response must have a error message", async () => {
  const responseBody = JSON.parse(await response.text());
  expect(responseBody.error).toEqual(
    "Object with id = " + id + " doesn't exist."
  );
});

// Step definition to verify if the response contains a confirmation message for a successful delete operation.
Then("the response must have a confirmation message", async () => {
  const responseBody = JSON.parse(await response.text());
  expect(responseBody.message).toEqual(
    "Object with id = " + id + " has been deleted."
  );
});

// Step definition for updating an object with new details.
When("I request to update the object with the following details", async (table: any) => {
    const productDetails = table.hashes()[0];
    const requestBody = {
      name: productDetails.name,
      data: JSON.parse(productDetails.data),
    };
    response = await apiService.updateObject(id, requestBody);
  }
);

// Step definition for partially updating an object with specific details.
When("I request to partial update the object with the following details", async (table: any) => {
    const productDetails = table.hashes()[0];
    response = await apiService.partialUpdateObject(id, productDetails);

    // Validate that the response contains an 'updatedAt' timestamp.
    const responseBody = JSON.parse(await response.text());
    expect(responseBody).toHaveProperty("updatedAt");
  }
);
