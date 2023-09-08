import privateClient from "../privateClient";

export const CommonService = {
  GetClassifiedStocks: (): Promise<any> => {
    const response = privateClient.get("/classified_stocks/getItems")
    return response
  },
  GetAfterOrdertocks: (): Promise<any> => {
    const response = privateClient.get("/after_order_stocks/getItems")
    return response
  },
  GetPackBoxtocks: (): Promise<any> => {
    const response = privateClient.get("/pack_box_stocks/getItems")
    return response
  },
}