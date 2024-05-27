import { create } from "zustand";
import axios from "axios";
const BaseURL = `http://localhost:9000`;

const FeatureStore = create((set) => ({
  FeatureList: null,
  FeatureListRequest: async () => {
    let res = await axios.get(`${BaseURL}/api/v1/FeaturesList`);
    if (res.data["status"] === "success") {
      set({ FeatureList: res.data["data"] });
    }
  },
  LegalDetails: null,
  LegalDetailsRequest: async (type) => {
    set({ LegalDetails: null });
    let res = await axios.get(`${BaseURL}/api/v1/LegalDetails/${type}`);
    if (res.data["status"] === "success") {
      set({ LegalDetails: res.data["data"] });
    }
  },
}));

export default FeatureStore;
