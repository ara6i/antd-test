import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast from react-toastify

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const useScheduledService = () => {
  const options = [
    "Task Types",
    "SubTask Types",
    "Work Carried Out",
    "Reasons for Failure",
    "Reasons for Monitoring",
  ];

  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const success = () => {
    toast.success("Data successfully sent! ✅");
  };

  const warning = () => {
    toast.warn("Please select at least one option ⚠️");
  };

  const handleCheck = (checkedValues: string[]) => {
    setCheckedList(checkedValues);
  };

  const selectAll = () => {
    setCheckedList(checkedList.length === options.length ? [] : options);
  };

  const sendDataToBackend = async () => {
    if (checkedList.length === 0) {
      warning(); // Show warning if no options are selected
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        API_URL,
        { selectedOptions: checkedList },
        { headers: { "Content-Type": "application/json" } }
      );

      success(); // Show success message
      console.log("Response:", response.data);
      setCheckedList([]); // Reset checked list
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    checkedList,
    handleCheck,
    selectAll,
    sendDataToBackend,
    loading,
    options,
  };
};

export default useScheduledService;
