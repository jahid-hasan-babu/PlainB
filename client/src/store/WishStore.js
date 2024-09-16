import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const BaseURL = `https://plain-b-server.vercel.app`;

const WishStore = create((set) => ({
  isWishSubmit: false,
  WishList: null,
  WishCount: 0,

  WishSaveRequest: async (productID) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("Please log in to add items to your wish list");
        return false;
      }

      set({ isWishSubmit: true });

      const res = await axios.post(
        `${BaseURL}/api/v1/SaveWishList`,
        { productID },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.status === "success") {
        toast.success("Wish Item Added");
        return true;
      } else {
        toast.error("Failed to add item to wish list");
        return false;
      }
    } catch (e) {
      toast.error("Error adding item to wish list");
      return false;
    } finally {
      set({ isWishSubmit: false });
    }
  },

  WishListRequest: async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("Please log in to view your wish list");
        return;
      }

      const res = await axios.get(`${BaseURL}/api/v1/WishList`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ WishList: res.data.data, WishCount: res.data.data.length });
    } catch (e) {
      toast.error("Error fetching wish list");
    }
  },

  RemoveWishListRequest: async (productID) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("Please log in to remove items from your wish list");
        return;
      }

      await axios.delete(`${BaseURL}/api/v1/RemoveWishList`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { productID },
      });

      toast.success("Wish Item Removed");
      set((state) => ({
        WishList: state.WishList.filter((item) => item._id !== productID),
        WishCount: state.WishCount - 1,
      }));
    } catch (e) {
      toast.error("Error removing item from wish list");
    }
  },
}));

export default WishStore;
