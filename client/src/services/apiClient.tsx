import { IBuildForm } from "src/contexts/PartsListContext";
import { IApprovalForm } from "src/pages/UserRow";

class ApiClient {
  // specify class variables along with their types
  accessToken: string;
  refreshToken: string;
  LOCAL_STORAGE_AUTH_KEY: string;
  baseUrl:string;
  headers: {
    "Content-Type": string;
    Authorization: string | "";
  };

  constructor(baseUrl:string) {
    this.accessToken = "null";
    this.refreshToken = "null";
    this.LOCAL_STORAGE_AUTH_KEY = "donut_pcs_local_storage_tokens_key";
    this.headers = {
      "Content-Type": "application/json",
      Authorization: "",
    };
    this.baseUrl = baseUrl
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
    // if api call does not require a requestBody then exlclude the "body" attribute
    if (Object.keys(requestBody).length === 0) {
      requestInit = {
        method: method,
        headers: this.headers,
      };
    } else {
      requestInit = {
        method: method,
        headers: this.headers,
        body: JSON.stringify(requestBody),
      };
    }
    let requestUrl : string = this.baseUrl + endpoint
    try {
      const response = await fetch(requestUrl, requestInit);
      return await response.json();
    } catch (error: any) {
      console.error(error.response);
    }
  }

  async getUsers(usersParam: string) {
    return await this.apiRequest({
      endpoint: `/users/${usersParam}`,
      method: "GET",
      requestBody: {},
    });
  }

  async activateUser(approvalForm: IApprovalForm, userId: number) {
    return await this.apiRequest({
      endpoint: `/users/activate/${userId}`,
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
      endpoint: `/users/cart/${itemId}`,
      method: "PUT",
      requestBody: {},
    });
  }
  // adjust quantity of item already in shopping cart
  // doubles as delete 
  async editItemQuantity(desiredQuantity:number, itemId:number){
    return await this.apiRequest({
      endpoint: `/users/cart/${itemId}`,
      method: "PATCH",
      requestBody: {
        quantity:desiredQuantity
      },
    });
  }
  // takes in a build partlist and checks for any compatibility issues
  // among the parts
  async validateBuild(buildForm:IBuildForm){
    return await this.apiRequest({
      endpoint: `/items/builds/compatibility`,
      method: "POST",
      requestBody: buildForm
    });
  }
}

export default new ApiClient("http://localhost:8000");