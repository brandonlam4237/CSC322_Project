import axios from "axios"
import { IApprovalForm } from "src/pages/UserRow"

class ApiClient {
  // specify class variables along with their types
  accessToken:string
  refreshToken:string
  LOCAL_STORAGE_AUTH_KEY:string

  constructor(){
     this.accessToken = "null"
     this.refreshToken = "null"
     this.LOCAL_STORAGE_AUTH_KEY = "donut_pcs_local_storage_tokens_key"
  }

  setTokens(tokens:{access:string, refresh:string}){
    this.accessToken = tokens.access
    this.refreshToken = tokens.refresh
    localStorage.setItem(this.LOCAL_STORAGE_AUTH_KEY, JSON.stringify(tokens));
  }

  async apiRequest({endpoint, method, data = {} }:{endpoint:string, method:string, data:any}) : Promise<any> {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "",
    };
    if (this.accessToken !== "null") {
        headers[`Authorization`] = `Bearer ${this.accessToken}`;
    }
    try {
        const res = await axios({ url:endpoint, method, data, headers });
        return { data: res.data, error: null };
    } catch (error:any) {
          console.error(error.response);          
    }
  }

  async getUsers(usersParam:string) {
    return await this.apiRequest({endpoint:`users/${usersParam}`, method:"GET", data:{}})
  }

  // not working at the moment
  async activateUser({approvalForm, userId}: {approvalForm:IApprovalForm, userId:number} ) {
    let data = {
      is_active:approvalForm.is_active,
      memo:approvalForm.memo
    }
    return await this.apiRequest({endpoint:`users/activate/${userId}`, method:"PATCH", data})
  }
}

export default new ApiClient()