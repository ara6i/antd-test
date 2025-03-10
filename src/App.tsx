import { ConfigProvider } from "antd";
import "./App.css";
import ScheduledServiceModal from "./components/modals/ScheduledServiceModal";

function App() {
  return (
    <ConfigProvider>
      <ScheduledServiceModal />
    </ConfigProvider>
  );
}

export default App;
