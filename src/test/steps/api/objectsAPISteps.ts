import { When, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { ObjectsService } from "../../../apiService/objectsService";
import { hooks } from "../web/hooks";

const objectService = new ObjectsService();

When("I request to get all objects", async () => {
  await objectService.getAllObjects();
});

Then("the response status code should be {int}", async (statusCode: number) => {
  expect(objectService.response.status()).toEqual(statusCode);
});

Then("the response objects must have the following fields", async (dataTable) => {
  const fields = dataTable.raw().flat();
  const requestBody = JSON.parse(await objectService.response.text());

  requestBody.forEach((json: any) => {
    fields.forEach((field: any) => {
      expect(json).toHaveProperty(field);
    });
  });
});

When("I request to create a new product with the following details", async (table: any) => {
  const productDetails = table.hashes()[0];
  const requestBody = {
    name: productDetails.name,
    data: JSON.parse(productDetails.data),
  };

  await objectService.createObject(requestBody);

  // Extract and store the ID of the newly created object.
  const id = JSON.parse(await objectService.response.text()).id;

  hooks.context.save("objectId", id);
});

Then("the response must contain the product details", async (table: any) => {
  const productDetails = table.hashes()[0];

  await objectService.response.body().then((object: any) => {
    // Validate that the response object matches the expected details.
    object.name = productDetails.name;
    object.data = JSON.parse(productDetails.data);
    expect(object.id).not.toBeNull();
    expect(object.createdAt || object.updatedAt).not.toBeNull();
  });
});

When("I request to get single object with id {int}", async (id: number) => {
  await objectService.getObjectById(id);
});

Then("the response object id must be {string}", async (id: string) => {
  const responseBody = JSON.parse(await objectService.response.text());
  expect(responseBody[0].id).toEqual(id);
});

When("I request to delete the object", async () => {
  await objectService.deleteObject(hooks.context.get("objectId"));
});

When("I request to delete the object with id {string}", async (invalid_id: string) => {
  await objectService.deleteObject(invalid_id);
  hooks.context.save("objectId", invalid_id);
});

Then("the response must have a {string} message", async (messageType: string) => {
  const responseBody = JSON.parse(await objectService.response.text());

  if (messageType === "error") {
    expect(responseBody.error).toEqual("Object with id = " + hooks.context.get("objectId") + " doesn't exist.");
  } else if (messageType === "confirmation") {
    expect(responseBody.message).toEqual("Object with id = " + hooks.context.get("objectId") + " has been deleted.");
  } else {
    throw new Error(`Unsupported message type: ${messageType}`);
  }
});

When("I request to update the object with the following details", async (table: any) => {
  const productDetails = table.hashes()[0];
  const requestBody = {
    name: productDetails.name,
    data: JSON.parse(productDetails.data),
  };
  await objectService.updateObject(hooks.context.get("objectId"), requestBody);
});

When("I request to partial update the object with the following details", async (table: any) => {
  const productDetails = table.hashes()[0];
  await objectService.partialUpdateObject(hooks.context.get("objectId"), productDetails);

  // Validate that the response contains an 'updatedAt' timestamp.
  const responseBody = JSON.parse(await objectService.response.text());
  expect(responseBody).toHaveProperty("updatedAt");
});
