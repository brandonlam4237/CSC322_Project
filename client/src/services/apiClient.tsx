import axios from "axios";
import { IApprovalForm } from "src/pages/UserRow";

class ApiClient {
  // specify class variables along with their types
  accessToken: string;
  refreshToken: string;
  LOCAL_STORAGE_AUTH_KEY: string;
  headers: {
    "Content-Type": string;
    Authorization: string | "";
  };

  constructor() {
    this.accessToken = "null";
    this.refreshToken = "null";
    this.LOCAL_STORAGE_AUTH_KEY = "donut_pcs_local_storage_tokens_key";
    this.headers = {
      "Content-Type": "application/json",
      Authorization: "",
    };
  }

  setTokens(tokens: { access: string; refresh: string }) {
    this.accessToken = tokens.access;
    this.refreshToken = tokens.refresh;
    localStorage.setItem(this.LOCAL_STORAGE_AUTH_KEY, JSON.stringify(tokens));
  }

  async apiRequest({
    endpoint,
    method,
    requestBody = {},
  }: {
    endpoint: string;
    method: string;
    requestBody: object;
  }): Promise<any> {
    if (this.accessToken !== "null") {
      this.headers[`Authorization`] = `Bearer ${this.accessToken}`;
    }
    let requestInit;

    // if request method is GET then do exlclude the "body" attribute
    if (method != "GET") {
      requestInit = {
        method: method,
        headers: this.headers,
        body: JSON.stringify(requestBody),
      };
    } else {
      requestInit = {
        method: method,
        headers: this.headers,
      };
    }

    try {
      const response = await fetch(endpoint, requestInit);
      return await response.json();
    } catch (error: any) {
      console.error(error.response);
    }
  }

  async getUsers(usersParam: string) {
    return await this.apiRequest({
      endpoint: `users/${usersParam}`,
      method: "GET",
      requestBody: {},
    });
  }

  async activateUser(approvalForm: IApprovalForm, userId: number) {
    return await this.apiRequest({
      endpoint: `users/activate/${userId}`,
      method: "PATCH",
      requestBody: {
        is_active: approvalForm.is_active,
        memo: approvalForm.memo,
      },
    });
  }

  // get shopping cart
  async getCustomerCart(){
    return await this.apiRequest({
      endpoint:"/users/cart",
      method:"GET",
      requestBody:{}
    })
  }
  // add item to shopping cart
  async addToCart(itemId:number){
    return await this.apiRequest({
      endpoint: `users/cart/${itemId}`,
      method: "PATCH",
      requestBody: {},
    });
  }
  // adjust quantity of item already in shopping cart
  // doubles as delete 
  async editItemQuantity(desiredQuantity:number, itemId:number){
    return await this.apiRequest({
      endpoint: `users/cart/${itemId}`,
      method: "PATCH",
      requestBody: {
        quantity:desiredQuantity
      },
    });
  }
}

export default new ApiClient();