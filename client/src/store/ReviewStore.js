import { create } from "zustand";
const BaseURL = `http://localhost:9000`;
import Cookies from "js-cookie";
import axios from "axios";

const ReviewStore = create((set) => ({
  isReviewSubmit: false,
  ReviewFormData: { des: "", rating: "5", productID: "" },
  ReviewFormOnChange: (name, value) => {
    set((state) => ({
      ReviewFormData: {
        ...state.ReviewFormData,
        [name]: value,
      },
    }));
  },

  ReviewSaveRequest: async (PostBody) => {
    try {
      let token = Cookies.get("token");
      set({ isReviewSubmit: true });
      let res = await axios.post(`${BaseURL}/api/v1/CreateReview`, PostBody, {
        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
      });
      return res.data["status"] === "success";
    } catch (e) {
      return e;
    } finally {
      set({ isReviewSubmit: false });
    }
  },
}));

export default ReviewStore;
