import { ConfigProvider } from "antd";
import "./App.css";
import ScheduledServiceModal from "./components/modals/ScheduledServiceModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <ConfigProvider>
      <ToastContainer />
      <ScheduledServiceModal />
    </ConfigProvider>
  );
}

export default App;
