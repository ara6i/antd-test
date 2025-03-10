import { JSX, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast from react-toastify

const API_URL = "https://jsonplaceholder.typicode.com/posts";

type BoldedOption = {
  label: JSX.Element;
  value: string;
};

const useScheduledService = () => {
  const options = [
    "Add Task Types",
    "Add SubTask Types",
    "Add Work Carried Out",
    "Add Reasons for Failure",
    "Add Reasons for Monitoring",
  ];

  const boldedOptions: BoldedOption[] = options.map((option) => {
    const parts = option.split("Add ");
    return {
      label: (
        <>
          Add
          <span style={{ fontWeight: "bold" }}> {parts[1]}</span>
        </>
      ),
      value: option,
    };
  });

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
      warning();
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        API_URL,
        { selectedOptions: checkedList },
        { headers: { "Content-Type": "application/json" } }
      );

      success();
      console.log("Response:", response.data);
      setCheckedList([]);
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
    boldedOptions,
  };
};

export default useScheduledService;
