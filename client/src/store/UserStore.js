import { create } from "zustand";
import axios from "axios";
import { getEmail, setEmail } from "../utility/utility";
import Cookies from "js-cookie";
const BaseURL = `http://localhost:9000`;

const UserStore = create((set) => ({
  isLogin: () => {
    return !!Cookies.get("token");
  },
  LoginFormData: { email: "" },
  LoginFormOnChange: (name, value) => {
    set((state) => ({
      LoginFormData: {
        ...state.LoginFormData,
        [name]: value,
      },
    }));
  },

  OTPFormData: { otp: "" },
  OTPFormOnChange: (name, value) => {
    set((state) => ({
      OTPFormData: {
        ...state.OTPFormData,
        [name]: value,
      },
    }));
  },

  UserLogoutRequest: async () => {
    let token = Cookies.get("token");
    set({ isFormSubmit: true });
    let res = await axios.get(`${BaseURL}/api/v1/UserLogout`, {
      headers: { Authorization: `Bearer ${token}` }, // Include token in headers
    });
    set({ isFormSubmit: false });
    return res.data["status"] === "success";
  },

  isFormSubmit: false,

  UserOTPRequest: async (email) => {
    set({ isFormSubmit: true });
    let res = await axios.get(`${BaseURL}/api/v1/UserOTP/${email}`);
    setEmail(email);
    set({ isFormSubmit: false });
    return res.data["status"] === "success";
  },

  VerifyLoginRequest: async (otp) => {
    try {
      set({ isFormSubmit: true });
      let email = getEmail();
      let res = await axios.get(
        `${BaseURL}/api/v1/VerifyLogin/${email}/${otp}`
      );
      set({ isFormSubmit: false });

      if (res.data.status === "success") {
        const { token } = res.data;
        const expirationTime = new Date().getTime() + 86400 * 1000;
        document.cookie = `token=${token}; expires=${new Date(
          expirationTime
        ).toUTCString()}; path=/;`;

        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    } finally {
      set({ isFormSubmit: false });
    }
  },

  ProfileForm: {
    cus_add: "",
    cus_city: "",
    cus_country: "",
    cus_fax: "",
    cus_name: "",
    cus_phone: "",
    cus_postcode: "",
    cus_state: "",
    ship_add: "",
    ship_city: "",
    ship_country: "",
    ship_name: "",
    ship_phone: "",
    ship_postcode: "",
    ship_state: "",
  },
  ProfileFormChange: (name, value) => {
    set((state) => ({
      ProfileForm: {
        ...state.ProfileForm,
        [name]: value,
      },
    }));
  },

  ProfileDetails: null,
  ProfileDetailsRequest: async () => {
    try {
      let token = Cookies.get("token");
      let res = await axios.get(`${BaseURL}/api/v1/ReadProfile`, {
        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
      });
      if (res.data["data"].length > 0) {
        set({ ProfileDetails: res.data["data"][0] });
        set({ ProfileForm: res.data["data"][0] });
      } else {
        set({ ProfileDetails: [] });
      }
    } catch (e) {
      return e;
    }
  },

  ProfileSaveRequest: async (PostBody) => {
    try {
      let token = Cookies.get("token");
      set({ ProfileDetails: null });
      let res = await axios.post(`${BaseURL}/api/v1/UpdateProfile`, PostBody, {
        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
      });
      return res.data["status"] === "success";
    } catch (e) {
      return e;
    }
  },
}));

export default UserStore;
