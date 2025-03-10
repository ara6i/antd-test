import React, { useState } from "react";
import { Modal, Button, Typography, Checkbox, Space, Flex } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useScheduledService from "../../hooks/useScheduledService";

const { Title, Text } = Typography;

const ScheduledServiceModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    checkedList,
    handleCheck,
    selectAll,
    sendDataToBackend,
    loading,
    boldedOptions,
  } = useScheduledService();

  const handleAddData = async () => {
    await sendDataToBackend();
    setIsModalOpen(false);
  };

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Button type="primary" size="large" onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={400}
        centered
      >
        <Title
          level={4}
          style={{
            fontWeight: 600,
            display: "block",
          }}
        >
          Create Scheduled Service :
        </Title>
        <Text
          type="secondary"
          style={{
            fontSize: 16,
            fontWeight: 600,
            display: "block",
            marginBottom: 20,
            color: "#3C8DBC",
          }}
        >
          Safety Inspection & Brake Test
        </Text>
        <Text>Do you want to:</Text>

        {/* Checkboxes - Column Layout */}
        <Flex vertical gap="middle" style={{ marginTop: 30 }}>
          <Checkbox.Group
            options={boldedOptions}
            value={checkedList}
            onChange={handleCheck}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
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
      </Modal>
    </Flex>
  );
};

export default ScheduledServiceModal;
