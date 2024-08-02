import { APIRequestContext, APIResponse, request } from 'playwright';

export interface RequestOptions {
    baseURL?: string;
    extraHTTPHeaders?: Record<string, string>;
  }

interface Headers {
    "Content-Type": string;
    "Accept": string;
    [key: string]: string; // Allows for additional headers
}

const headers: Headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
};

export class APIContext {
    response!: APIResponse;
  
    apiRequestContext!: APIRequestContext;

    constructor(baseURL: string) {
        this.setRequest(baseURL);
    }
  
    async setRequest(baseURL:string) {
      let options: RequestOptions = {};
      options.extraHTTPHeaders = headers;
      options.baseURL = baseURL;
      this.apiRequestContext = await request.newContext(options);
    }
  
    async get(endpoint: string){
      this.response = await this.apiRequestContext.get(endpoint, {
        failOnStatusCode: true
      });
    }
  
    async post(endpoint: string, data: any) {
      this.response = await this.apiRequestContext.post(endpoint, {
        data: data,
        failOnStatusCode: true,
      });
    }
  
    async put(endpoint: string, data?: any) {
      this.response = await this.apiRequestContext.put(endpoint, {
        data: data ? data : '',
        failOnStatusCode: true,
      });
    }

    async patch(endpoint: string, data?: any) {
        this.response = await this.apiRequestContext.patch(endpoint, {
          data: data ? data : '',
          failOnStatusCode: true,
        });
      }
  
    async delete(endpoint: string) {
      this.response = await this.apiRequestContext.delete(endpoint, {
        failOnStatusCode: false,
      });
    }
  }
  