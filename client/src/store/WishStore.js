import { create } from "zustand";
import axios from "axios";
const BaseURL = `http://localhost:9000`;
import Cookies from "js-cookie";

const WishStore = create((set) => ({
  isWishSubmit: false,
  WishSaveRequest: async (productID) => {
    try {
      let token = Cookies.get("token");
      set({ isWishSubmit: true });
      let res = await axios.post(`${BaseURL}/api/v1/SaveWishList`, {
        productID: productID,
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data["status"] === "success";
    } catch (e) {
      return e;
    } finally {
      set({ isWishSubmit: false });
    }
  },

  WishList: null,
  WishCount: 0,
  WishListRequest: async () => {
    try {
      let token = Cookies.get("token");
      let res = await axios.get(`${BaseURL}/api/v1/WishList`, {
        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
      });
      set({ WishList: res.data["data"] });
      set({ WishCount: res.data["data"].length });
    } catch (e) {
      return e;
    }
  },

  RemoveWishListRequest: async (productID) => {
    try {
      let token = Cookies.get("token");
      set({ WishList: null });
      await axios.delete(`${BaseURL}/api/v1/RemoveWishList`, {
        productID: productID,
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      return e;
    }
  },
}));

export default WishStore;
