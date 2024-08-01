import { request } from "playwright/test";
import { endpoints } from "./endpoints";

interface Headers {
    "Content-Type": string;
    "Accept": string;
    [key: string]: string; // Allows for additional headers
}

const headers: Headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
};

export class ApiService {
    /**
     * Retrieves all objects from the API.
     *
     * @returns an APIResponse. The API response containing the list of objects.
     */
    async getAllObjects() {
        const response = await (await request.newContext()).get(`${endpoints.BASE_URL}`, {
            headers: headers
        });
        return response;
    }

    /**
     * Retrieves a specific object from the API by its ID.
     *
     * @param id - The unique identifier of the object to retrieve.
     * @returns an APIResponse. The API response containing the requested object.
     */
    async getObjectById(id: any) {
        const response = await (await request.newContext()).get(`${endpoints.BASE_URL}`, {
            params: { id: id },
            headers: headers
        });
        return response;
    }

    /**
     * Creates a new object in the API.
     *
     * @param data - The data to be sent in the request body. This should be an object that matches the expected structure for creating a new object.
     * @returns an APIResponse. The API response containing the newly created object.
     */
    async createObject(data: any) {
        const response = await (await request.newContext()).post(`${endpoints.BASE_URL}`, {
            data: data,
            headers: headers
        });
        return response;
    }

    /**
     * Updates an existing object in the API by its ID.
     * 
     * @param id - The unique identifier of the object to update.
     * @param data - The data to be sent in the request body. This should be an object that matches the expected structure for updating an existing object.
     * @returns an APIResponse. The API response containing the updated object.
     */
    async updateObject(id: any, data: any) {
        const response = await (await request.newContext()).put(`${endpoints.BASE_URL}/${id}`, {
            data: data,
            headers: headers
        });
        return response;
    }

    /**
     * Updates a specific object in the API by its ID using a partial update.
     *
     * @param id - The unique identifier of the object to update.
     * @param data - The data to be sent in the request body. This should be an object that
     * matches the expected structure for updating an existing object, but only includes the
     * properties that need to be updated.
     *
     * @returns an APIResponse. The API response containing the updated object.
     */
    async partialUpdateObject(id: any, data: any) {
        const response = await (await request.newContext()).patch(`${endpoints.BASE_URL}/${id}`, {
            data: data,
            headers: headers
        });
        return response;
    }

    /**
     * Deletes an object from the API by its ID.
     *
     * @param id - The unique identifier of the object to delete. This should be a non-null value.
     *
     * @returns A promise that resolves to the API response.
     */
    async deleteObject(id: any) {
        const response = await (await request.newContext()).delete(`${endpoints.BASE_URL}/${id}`, {
            headers: headers
        });
        return response;
    }
}

export const apiService = new ApiService();
