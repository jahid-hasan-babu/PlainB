import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast"; // Import toast for displaying messages

const BaseURL = `https://plain-b-server.vercel.app`;

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
      // Check if the user is logged in
      let token = Cookies.get("token");
      if (!token) {
        // Show error message if not logged in
        toast.error("Please log in to add items to your cart.");
        return false;
      }

      set({ isCartSubmit: true });
      PostBody.productID = productID;
      PostBody.qty = quantity;

      let res = await axios.post(`${BaseURL}/api/v1/SaveCartList`, PostBody, {
        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
      });

      if (res.data.status === "success") {
        toast.success("Item added to cart successfully!");
        return true;
      } else {
        toast.error("Failed to add item to cart.");
        return false;
      }
    } catch (e) {
      toast.error("Error adding item to cart.");
      return false;
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
      if (!token) {
        toast.error("Please log in to view your cart.");
        return;
      }

      let res = await axios.get(`${BaseURL}/api/v1/CartList`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ CartList: res.data.data });
      set({ CartCount: res.data.data.length });

      let total = 0;
      res.data.data.forEach((item) => {
        total +=
          item.product.discount === true
            ? item.qty * parseInt(item.product.discountPrice)
            : item.qty * parseInt(item.product.price);
      });

      let vat = total * 0.05;
      let payable = vat + total;

      set({ CartTotal: total, CartVatTotal: vat, CartPayableTotal: payable });
    } catch (e) {
      toast.error("Error fetching cart list.");
    }
  },

  RemoveCartListRequest: async (cartID) => {
    try {
      let token = Cookies.get("token");
      if (!token) {
        toast.error("Please log in to remove items from your cart.");
        return;
      }

      set({ CartList: null });
      await axios.delete(`${BaseURL}/api/v1/RemoveCartList`, {
        _id: cartID,
        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
      });
      toast.success("Item removed from cart.");
    } catch (e) {
      toast.error("Error removing item from cart.");
      return e;
    }
  },

  CreateInvoiceRequest: async () => {
    try {
      let token = Cookies.get("token");
      if (!token) {
        toast.error("Please log in to proceed with checkout.");
        return;
      }

      set({ isCartSubmit: true });
      let res = await axios.get(`${BaseURL}/api/v1/CreateInvoice`, {
        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
      });

      window.location.href = res.data["data"]["GatewayPageURL"];
    } catch (e) {
      toast.error("Error creating invoice.");
      return e;
    } finally {
      set({ isCartSubmit: false });
    }
  },

  InvoiceList: null,
  InvoiceListRequest: async () => {
    try {
      let token = Cookies.get("token");
      if (!token) {
        toast.error("Please log in to view your invoices.");
        return;
      }

      let res = await axios.get(`${BaseURL}/api/v1/InvoiceList`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ InvoiceList: res.data["data"] });
    } catch (e) {
      toast.error("Error fetching invoice list.");
    }
  },

  InvoiceDetails: null,
  InvoiceDetailsRequest: async (id) => {
    try {
      let token = Cookies.get("token");
      if (!token) {
        toast.error("Please log in to view invoice details.");
        return;
      }

      let res = await axios.get(`${BaseURL}/api/v1/InvoiceProductList/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
      });
      set({ InvoiceDetails: res.data["data"] });
    } catch (e) {
      toast.error("Error fetching invoice details.");
      return e;
    }
  },
}));

export default CartStore;
