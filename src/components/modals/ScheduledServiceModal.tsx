import React, { useState } from "react";
import {
  Modal,
  Button,
  Card,
  Typography,
  Checkbox,
  Space,
  Flex,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useScheduledService from "../../hooks/useScheduledService";

const { Title, Text } = Typography;

const ScheduledServiceModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, contextHolder] = message.useMessage();
  const {
    checkedList,
    handleCheck,
    selectAll,
    sendDataToBackend,
    loading,
    options,
  } = useScheduledService();

  const handleAddData = async () => {
    await sendDataToBackend();
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Button
          type="primary"
          size="large"
          onClick={() => setIsModalOpen(true)}
        >
          Open Modal
        </Button>

        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          centered
          width={400}
        >
          <Card>
            <Title level={4}>Create Scheduled Service :</Title>
            <Text
              type="secondary"
              style={{
                fontSize: 16,
                fontWeight: 500,
                display: "block",
                marginBottom: 10,
                color: "#3C8DBC",
              }}
            >
              Safety Inspection & Brake Test
            </Text>
            <Text>Do you want to:</Text>

            {/* Checkboxes - Column Layout */}
            <Flex vertical gap="small" style={{ marginTop: 10 }}>
              <Checkbox.Group
                options={options}
                value={checkedList}
                onChange={handleCheck}
                style={{ display: "flex", flexDirection: "column" }}
              />
            </Flex>

            {/* Buttons */}
            <Space style={{ marginTop: 20 }}>
              <Button type="primary" onClick={handleAddData} loading={loading}>
                Add Data
              </Button>
              <Button icon={<PlusOutlined />} onClick={selectAll}>
                Select All
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </Space>
          </Card>
        </Modal>
      </Flex>
    </>
  );
};

export default ScheduledServiceModal;
