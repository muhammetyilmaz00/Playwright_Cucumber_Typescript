import { APIContext } from "../../support/apiContext";

export const URLS = {
    BASE_URL: 'https://api.restful-api.dev/',
    OBJECTS: 'objects'
};

export class ObjectsService {
    apiContext = new APIContext(URLS.BASE_URL);
    response: any;

    /**
 * Retrieves all objects from the RESTful API.
 *
 * @remarks
 * This function sends a GET request to the API endpoint specified by `URLS.OBJECTS`.
 * The response is stored in the `response` property of the `ObjectService` instance.
 *
 * @returns {Promise<void>} A promise that resolves when the request is complete.
 */
    async getAllObjects() {
        await this.apiContext.get(URLS.OBJECTS)
        this.response = this.apiContext.response;
    }

    /**
 * Retrieves a specific object from the RESTful API by its ID.
 *
 * @remarks
 * This function sends a GET request to the API endpoint specified by `URLS.OBJECTS` with the provided `id` as a query parameter.
 * The response is stored in the `response` property of the `ObjectService` instance.
 *
 * @param {any} id - The unique identifier of the object to retrieve.
 *
 * @returns {Promise<void>} A promise that resolves when the request is complete.
 */
    async getObjectById(id: any) {
        await this.apiContext.get(`${URLS.OBJECTS}?id=${id}`)
        this.response = this.apiContext.response;
    }

    /**
 * Creates a new object in the RESTful API.
 *
 * @remarks
 * This function sends a POST request to the API endpoint specified by `URLS.OBJECTS` with the provided `data` as the request body.
 *
 * @param {any} data - The data to be sent in the request body. This should be in a format that the API expects.
 *
 * @returns {Promise<void>} A promise that resolves when the request is complete.
 * The response from the API is not stored in the `response` property of the `ObjectService` instance.
 */
    async createObject(data: any) {
        await this.apiContext.post(URLS.OBJECTS, data)
        this.response = this.apiContext.response;
    }

    /**
 * Updates an existing object in the RESTful API.
 *
 * @remarks
 * This function sends a PUT request to the API endpoint specified by `URLS.OBJECTS` with the provided `id` as a path parameter.
 * The provided `data` is sent as the request body.
 * The response from the API is stored in the `response` property of the `ObjectService` instance.
 *
 * @param {any} id - The unique identifier of the object to update.
 * @param {any} data - The data to be sent in the request body. This should be in a format that the API expects.
 *
 * @returns {Promise<void>} A promise that resolves when the request is complete.
 */
    async updateObject(id: any, data: any) {
        await this.apiContext.put(`${URLS.OBJECTS}/${id}`, data)
        this.response = this.apiContext.response;
    }

    /**
 * Updates a specific object in the RESTful API using a partial update (PATCH request).
 *
 * @remarks
 * This function sends a PATCH request to the API endpoint specified by `URLS.OBJECTS` with the provided `id` as a path parameter.
 * The provided `data` is sent as the request body.
 * The response from the API is stored in the `response` property of the `ObjectService` instance.
 *
 * @param {any} id - The unique identifier of the object to update.
 * @param {any} data - The data to be sent in the request body. This should be in a format that the API expects.
 *                      Only the provided fields will be updated in the object.
 *
 * @returns {Promise<void>} A promise that resolves when the request is complete.
 */
    async partialUpdateObject(id: any, data: any) {
        await this.apiContext.patch(`${URLS.OBJECTS}/${id}`, data)
        this.response = this.apiContext.response;
    }

    /**
 * Deletes an object from the RESTful API by its ID.
 *
 * @remarks
 * This function sends a DELETE request to the API endpoint specified by `URLS.OBJECTS` with the provided `id` as a path parameter.
 * The response from the API is stored in the `response` property of the `ObjectService` instance.
 *
 * @param {any} id - The unique identifier of the object to delete.
 *
 * @returns {Promise<void>} A promise that resolves when the request is complete.
 */
    async deleteObject(id: any) {
        await this.apiContext.delete(`${URLS.OBJECTS}/${id}`)
        this.response = this.apiContext.response;
    }
}
