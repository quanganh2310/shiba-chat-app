import { Form, Modal, Input } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../../firebase/services";

export default function RoomAddModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();
  const handleOk = () => {
    console.log({ formData: form.getFieldValue() });
    addDocument("rooms", { ...form.getFieldValue(), members: [uid] });
    form.resetFields();
    setIsAddRoomVisible(false);
  };
  const handleCancel = () => {
    setIsAddRoomVisible(false);
  };
  return (
    <div>
      <Modal
        title="Create new room"
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Room name"
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input placeholder="Enter room name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input.TextArea placeholder="Enter room description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
