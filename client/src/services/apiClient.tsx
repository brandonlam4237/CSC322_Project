import { IBuildForm, IPartsListIds } from "src/contexts/PartsListContext";
import { IApprovalForm } from "src/pages/UserRow";

class ApiClient {
  // specify class variables along with their types
  accessToken: string;
  refreshToken: string;
  LOCAL_STORAGE_AUTH_KEY: string;
  baseUrl: string;
  headers: {
    "Content-Type": string;
    Authorization: string | "";
  };

  constructor(baseUrl: string) {
    this.accessToken = "null";
    this.refreshToken = "null";
    this.LOCAL_STORAGE_AUTH_KEY = "donut_pcs_local_storage_tokens_key";
    this.headers = {
      "Content-Type": "application/json",
      Authorization: "",
    };
    this.baseUrl = baseUrl;
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
  async getCustomerCart() {
    return await this.apiRequest({
      endpoint: "/users/cart",
      method: "GET",
      requestBody: {},
    });
  }
  // add item to shopping cart
  async addToCart(itemId: number) {
    return await this.apiRequest({
      endpoint: `/users/cart/${itemId}`,
      method: "POST",
      requestBody: {},
    });
  }
  // adjust quantity of item already in shopping cart
  // doubles as delete
  async editItemQuantity(desiredQuantity: number, itemId: number) {
    return await this.apiRequest({
      endpoint: `/users/cart/${itemId}`,
      method: "PATCH",
      requestBody: {
        quantity: desiredQuantity,
      },
    });
  }

  async purchaseOrder(orderAddress: string) {
    return await this.apiRequest({
      endpoint: `/users/orders`,
      method: "POST",
      requestBody: {
        address: orderAddress,
      },
    });
  }

  // --- BUILD ENDPOINTS ---
  // takes in a build partlist and checks for any compatibility issues
  // among the parts
  async validateBuild(partsList:IPartsListIds){
    return await this.apiRequest({
      endpoint: `/items/builds/compatibility`,
      method: "POST",
      requestBody: partsList
    });
  }
  // get all builds created by customers/employees/owner
  // all users
  async getAllBuilds(){
    return await this.apiRequest({
      endpoint: `/items/builds`,
      method: "GET",
      requestBody: {}
    });
  }
  // implements makebuild endpoint
  // all users
  async createBuild(buildForm:IBuildForm){
    return await this.apiRequest({
      endpoint: `/items/builds`,
      method: "POST",
      requestBody: buildForm
    });
  }
  // this function is called after createBuild
  // all users
  async setBuildVisible(buildId:number){
    return await this.apiRequest({
      endpoint: `/users/builds/visible/${buildId}`,
      method: "PATCH",
      requestBody:{}
    });
  }
  // this function is called after createBuild
  // only customer
  async checkoutBuild(buildId:number){
    return await this.apiRequest({
      endpoint: `/users/builds/checkout/${buildId}`,
      method: "POST",
      requestBody:{
        address:"sdfsdfsdf",
      }
    });
  }
// this function is called after createBuild
// all users
  async rateBuild(buildId:number, rating: number){
    return await this.apiRequest({
      endpoint: `/items/builds/rate/${buildId}`,
      method: "POST",
      requestBody:{
        rating:rating
      }
    })}

  async getOrders(){
    const customerOrders = await this.apiRequest({
      endpoint: `/users/orders`,
      method: "GET",
      requestBody: {},
    });

    if(customerOrders){
      await Promise.all(
        customerOrders.map(async (order: any) => {
          await Promise.all(
            order.items.map(async (item: any) => {
              const details = await fetch("/items/" + item.product.id);
              const detailsJSON = await details.json();
              item.product["image_url"] = detailsJSON.product.image_url;
              return item;
            })
          );
        })
      );
    }
    return customerOrders;
  }
}


export default new ApiClient("http://localhost:8000");
