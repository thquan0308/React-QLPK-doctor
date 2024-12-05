import React, { useState } from "react";
import { Modal, Input, Button, Tooltip } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const SimpleForm = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");

    // Hàm để mở Modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Hàm để đóng Modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Hàm để lưu dữ liệu (ví dụ chỉ log ra console)
    const handleSave = () => {
        console.log("Dữ liệu đã lưu:", inputValue);
        setIsModalVisible(false); // Đóng Modal
    };

    // Hàm để xử lý thay đổi trong ô nhập
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div>
            <Tooltip title="Xác nhận trạng thái" color="blue" key="blue">
                <CheckCircleOutlined
                    style={{
                        color: "blue",
                        fontSize: "20px",
                        cursor: "pointer",
                    }}
                    onClick={showModal}
                />
            </Tooltip>

            {/* Modal với form đơn giản */}
            <Modal
                title="Nhập dữ liệu"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Input
                    placeholder="Nhập dữ liệu"
                    value={inputValue}
                    onChange={handleInputChange}
                    style={{ marginBottom: 20 }}
                />
                <div style={{ textAlign: "right" }}>
                    <Button onClick={handleCancel} style={{ marginRight: 10 }}>
                        Thoát
                    </Button>
                    <Button type="primary" onClick={handleSave}>
                        Lưu
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default SimpleForm;
