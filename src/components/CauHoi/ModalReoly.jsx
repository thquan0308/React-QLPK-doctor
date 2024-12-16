import {
    Col,
    Divider,
    Form,
    Input,
    message,
    Modal,
    notification,
    Row,
    Switch,
} from "antd";
import { useEffect, useState } from "react";
import { traLoiCauHoiChoBN } from "../../services/apiDoctor";

const ModalReoly = (props) => {
    const {
        openReply,
        setOpenReply,
        dataCauHoiRep,
        setDataCauHoiRep,
        findAllOrder,
    } = props;
    const [form] = Form.useForm();
    const [loadingEditKhamxONG, setLoadingEditKhamxONG] = useState(false);
    const [checkKham, setCheckKham] = useState(false);

    const handleOk = async (values) => {
        const { _id, cauTraLoi, cauHoi, status, email, firstName, lastName } =
            values;
        console.log(
            "_id, cauTraLoi, cauHoi, status: ",
            _id,
            cauTraLoi,
            cauHoi,
            status
        );

        setLoadingEditKhamxONG(true);
        let res = await traLoiCauHoiChoBN(
            _id,
            cauTraLoi,
            cauHoi,
            status,
            email,
            firstName,
            lastName
        );
        if (res) {
            message.success(res.message);
            setOpenReply(false);
            form.resetFields();
            await findAllOrder();
        } else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message,
            });
        }
        setLoadingEditKhamxONG(false);
    };

    const onChangeCheckKham = async (checked) => {
        console.log("checked kham: ", checked);
        setCheckKham(checked);

        form.setFieldsValue({
            status: checked,
        });
    };

    useEffect(() => {
        if (dataCauHoiRep && dataCauHoiRep?._id) {
            setCheckKham(dataCauHoiRep?.status);
            const init = {
                _id: dataCauHoiRep?._id,
                email: dataCauHoiRep?.email,
                firstName: dataCauHoiRep?.firstName,
                lastName: dataCauHoiRep?.lastName,
                cauHoi: dataCauHoiRep?.cauHoi,
                cauTraLoi: dataCauHoiRep?.cauTraLoi,
                status: dataCauHoiRep?.status,
            };
            console.log("init: ", init);
            form.setFieldsValue(init);
        }
        return () => {
            form.resetFields();
            setCheckKham(false);
        };
    }, [dataCauHoiRep, openReply]);

    const cancel = () => {
        setOpenReply(false);
        setCheckKham(false);
    };

    console.log("checkKham: ", checkKham);

    return (
        // <Modal
        //     title={`Trả lời cho bệnh nhân ${dataCauHoiRep?.lastName} ${dataCauHoiRep?.firstName}`}
        //     open={openReply}
        //     onOk={() => form.submit()}
        //     width={700}
        //     maskClosable={false}
        //     loading={loadingEditKhamxONG}
        //     onCancel={cancel}
        // >
        //     {/* <Form form={form} onFinish={handleOk}>
        //         <Divider />
        //         <Row gutter={[20, 85]}>
        //             <Form.Item hidden name="_id">
        //                 <Input />
        //             </Form.Item>
        //             <Form.Item hidden name="email">
        //                 <Input />
        //             </Form.Item>
        //             <Form.Item hidden name="lastName">
        //                 <Input />
        //             </Form.Item>
        //             <Form.Item hidden name="firstName">
        //                 <Input />
        //             </Form.Item>
        //             <Col span={24} md={24} sm={24} xs={24}>
        //                 <Form.Item
        //                     layout="vertical"
        //                     label="Câu hỏi"
        //                     name="cauHoi"
        //                 >
        //                     <Input.TextArea
        //                         disabled
        //                         row={5}
        //                         style={{ height: "100px" }}
        //                     />
        //                 </Form.Item>
        //             </Col>

        //             <Col span={24} md={24} sm={24} xs={24}>
        //                 <Form.Item
        //                     layout="vertical"
        //                     label="Trả lời câu hỏi"
        //                     name="cauTraLoi"
        //                 >
        //                     <Input.TextArea
        //                         row={5}
        //                         style={{ height: "100px" }}
        //                     />
        //                 </Form.Item>
        //             </Col>

        //             <Col span={24} md={24} sm={24} xs={24}>
        //                 <Form.Item
        //                     layout="vertical"
        //                     label="Trạng thái trả lời"
        //                     name="status"
        //                 >
        //                     <Switch
        //                         style={{ width: "150px" }}
        //                         checked={checkKham} // Kiểm tra nếu trạng thái là "Đã xác nhận" để bật switch
        //                         onChange={(checked) =>
        //                             onChangeCheckKham(checked)
        //                         }
        //                         checkedChildren="Đã trả lời"
        //                         unCheckedChildren="Chưa trả lời"
        //                     />
        //                 </Form.Item>
        //             </Col>
        //         </Row>
        //     </Form> */}
        //     <br />
        // </Modal>
        <Modal
            title={`Trả lời cho bệnh nhân ${dataCauHoiRep?.firstName} ${dataCauHoiRep?.lastName}`}
            open={openReply}
            onOk={() => form.submit()}
            width={700}
            maskClosable={false}
            loading={loadingEditKhamxONG}
            onCancel={cancel}
            footer={null} // Ẩn footer mặc định
        >
            {/* Form bên trong Modal */}
            <Form form={form} onFinish={handleOk}>
                <Divider />
                <Row gutter={[20, 85]}>
                    {/* Các input ẩn */}
                    <Form.Item hidden name="_id">
                        <Input />
                    </Form.Item>
                    <Form.Item hidden name="email">
                        <Input />
                    </Form.Item>
                    <Form.Item hidden name="lastName">
                        <Input />
                    </Form.Item>
                    <Form.Item hidden name="firstName">
                        <Input />
                    </Form.Item>

                    {/* Câu hỏi */}
                    <Col span={24}>
                        <Form.Item
                            label="Câu hỏi"
                            name="cauHoi"
                            layout="vertical"
                        >
                            <Input.TextArea
                                disabled
                                rows={5}
                                style={{ height: "100px" }}
                            />
                        </Form.Item>
                    </Col>

                    {/* Trả lời câu hỏi */}
                    <Col span={24}>
                        <Form.Item
                            label="Trả lời câu hỏi"
                            name="cauTraLoi"
                            layout="vertical"
                        >
                            <Input.TextArea
                                rows={5}
                                style={{ height: "100px" }}
                            />
                        </Form.Item>
                    </Col>

                    {/* Trạng thái trả lời */}
                    <Col span={24}>
                        <Form.Item
                            label="Trạng thái trả lời"
                            name="status"
                            layout="vertical"
                        >
                            <Switch
                                style={{ width: "150px" }}
                                checked={checkKham} // Kiểm tra trạng thái trả lời
                                onChange={(checked) =>
                                    onChangeCheckKham(checked)
                                }
                                checkedChildren="Đã trả lời"
                                unCheckedChildren="Chưa trả lời"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

            {/* Thêm các nút Cancel và OK tùy chỉnh */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "20px",
                }}
            >
                <button
                    onClick={cancel}
                    style={{
                        padding: "8px 16px",
                        marginRight: "10px",
                        backgroundColor: "#f5f5f5",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Cancel
                </button>
                <button
                    onClick={() => form.submit()}
                    style={{
                        padding: "8px 16px",
                        backgroundColor: "#1890ff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    OK
                </button>
            </div>
        </Modal>
    );
};
export default ModalReoly;
