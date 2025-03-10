import { useState } from "react";
import axios from "axios";
import { message } from "antd";

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
  const [messageApi, contextHolder] = message.useMessage();

  const handleCheck = (checkedValues: string[]) => {
    setCheckedList(checkedValues);
  };

  const selectAll = () => {
    setCheckedList(checkedList.length === options.length ? [] : options);
  };

  const sendDataToBackend = async () => {
    if (checkedList.length === 0) {
      messageApi.warning("Please select at least one option ⚠️");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        API_URL,
        { selectedOptions: checkedList },
        { headers: { "Content-Type": "application/json" } }
      );

      messageApi.success("Data successfully sent! ✅");
      console.log("Response:", response.data);
      setCheckedList([]);
    } catch (error) {
      messageApi.error("Error sending data ❌");
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
    contextHolder,
  };
};

export default useScheduledService;
