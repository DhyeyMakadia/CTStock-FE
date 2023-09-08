import request from "../api";

export const CommonService = {
  GetClassifiedStocks: (): Promise<any> => {
    const response = request.get("/classified_stocks", {headers: {}})
    return response
  }
}