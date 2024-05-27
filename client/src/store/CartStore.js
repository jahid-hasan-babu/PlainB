import { create } from "zustand";
const BaseURL = `http://localhost:9000`;
import Cookies from "js-cookie";
import axios from "axios";

const CartStore = create((set) => ({
  isCartSubmit: false,
  CartForm: { productID: "", color: "", size: "" },
  CartFormChange: (name, value) => {
    set((state) => ({
      CartForm: {
        ...state.CartForm,
        [name]: value,
      },
    }));
  },
  CartSaveRequest: async (PostBody, productID, quantity) => {
    try {
      let token = Cookies.get("token");

      set({ isCartSubmit: true });
      PostBody.productID = productID;
      PostBody.qty = quantity;
      let res = await axios.post(`${BaseURL}/api/v1/SaveCartList`, PostBody, {
        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
      });
      return res.data["status"] === "success";
    } catch (e) {
      return e;
    } finally {
      set({ isCartSubmit: false });
    }
  },

  CartList: null,
  CartCount: 0,
  CartTotal: 0,
  CartVatTotal: 0,
  CartPayableTotal: 0,
  CartListRequest: async () => {
    try {
      let token = Cookies.get("token");
      let res = await axios.get(`${BaseURL}/api/v1/CartList`, {
        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
      });
      set({ CartList: res.data["data"] });
      set({ CartCount: res.data["data"].length });
      let total = 0;
      let vat = 0;
      let payable = 0;
      res.data["data"].forEach((item, i) => {
        if (item["product"]["discount"] === true) {
          total =
            total +
            parseInt(item["qty"]) * parseInt(item["product"]["discountPrice"]);
        } else {
          total =
            total + parseInt(item["qty"]) * parseInt(item["product"]["price"]);
        }
      });

      vat = total * 0.05;
      payable = vat + total;
      set({ CartTotal: total });
      set({ CartVatTotal: vat });
      set({ CartPayableTotal: payable });
    } catch (e) {
      return e;
    }
  },

  RemoveCartListRequest: async (cartID) => {
    try {
      let token = Cookies.get("token");

      set({ CartList: null });
      await axios.delete(`${BaseURL}/api/v1/RemoveCartList`, {
        _id: cartID,
        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
      });
    } catch (e) {
      return e;
    }
  },

  CreateInvoiceRequest: async () => {
    try {
      let token = Cookies.get("token");
      set({ isCartSubmit: true });
      let res = await axios.get(`${BaseURL}/api/v1/CreateInvoice`, {
        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
      });
      window.location.href = res.data["data"]["GatewayPageURL"];
    } catch (e) {
      return e;
    } finally {
      set({ isCartSubmit: false });
    }
  },

  InvoiceList: null,
  InvoiceListRequest: async () => {
    try {
      let token = Cookies.get("token");
      let res = await axios.get(`${BaseURL}/api/v1/InvoiceList`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ InvoiceList: res.data["data"] });
    } catch (e) {
      console.error("Error fetching invoice list:", e);
    }
  },

  InvoiceDetails: null,
  InvoiceDetailsRequest: async (id) => {
    try {
      let token = Cookies.get("token");
      let res = await axios.get(`${BaseURL}/api/v1/InvoiceProductList/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
      });
      set({ InvoiceDetails: res.data["data"] });
    } catch (e) {
      return e;
    }
  },
}));

export default CartStore;
