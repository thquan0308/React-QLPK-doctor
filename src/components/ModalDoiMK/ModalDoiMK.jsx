import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd"
import { useEffect, useState } from "react"
import { FaSave } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import bcrypt from 'bcryptjs-react';
import { fetchAllDoctorByID } from "../../services/apiDoctor"
import { doiThongTinDoctor } from "../../services/loginAPI"
import { doLogoutAction } from "../../redux/account/accountSlice"

const ModalDoiMK = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formDoiMK] = Form.useForm()    
    const [dataAccKH, setDataAccKH] = useState(null);
    const acc = useSelector(state => state.accountDoctor.user)

    console.log("dataAccKH: ", dataAccKH);

    const timDoctorById = async () => {
        let query = `_id=${acc?._id}`
        const res = await fetchAllDoctorByID(query)
        if(res && res.data) {
            setDataAccKH(res.data)
        }
    }

    useEffect(() => {
        timDoctorById()
    },[acc?._id])


    const onFinishDoiMK = async (values) => {

        const {
            _idAcc, lastName, firstName, email, password, passwordMoi
        } = values
        console.log("password: ", password);
        console.log("lastName, firstName, email, passwordMoi: ", lastName, firstName, email, passwordMoi);

        const matKhauCu = dataAccKH?.password
        console.log("mk cu: ", matKhauCu);
        
        const isMatch = await bcrypt.compare(password, matKhauCu); // So sánh password nhập vào với mật khẩu đã mã hóa        

        if (isMatch) {
            console.log("Mật khẩu cũ chính xác. Cập nhật mật khẩu mới...");

            const res = await doiThongTinDoctor(_idAcc, lastName, firstName, email, passwordMoi)
            if(res && res.data) {
                message.success(res.message)
                dispatch(doLogoutAction())
                navigate("/login-doctor");
                message.success('Yêu cầu đăng nhập lại!')
            } else {
                notification.error({ 
                    message: "Đổi thông tin thất bại!",
                    description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                    duration: 5,
                });
            }

        } else {
            notification.error({
                message: "Mật khẩu cũ không chính xác",
                description: "Vui lòng nhập lại mật khẩu cũ đúng."
            });
        }

    }


    useEffect(() => {
        if (dataAccKH) {                              
            const init = {
                _idAcc: dataAccKH?._id,                
                firstName: dataAccKH?.firstName,                
                lastName: dataAccKH?.lastName,                
                email: dataAccKH?.email,                                            
            }
            console.log("init: ", init);
            formDoiMK.setFieldsValue(init);            
        }
        return () => {
            formDoiMK.resetFields();
        }
    },[dataAccKH])    

    return (        
        <Form
            form={formDoiMK}
            layout="vertical"
            onFinish={onFinishDoiMK}                 
        >
            {/* <Divider /> */}
            <Row gutter={[20,10]}>
                <Col span={24} md={24} sm={24} xs={24}> 
                <Form.Item name="_idAcc" hidden><Input hidden /></Form.Item>                                        
                </Col>
                <Col span={12} md={12} sm={24} xs={24}>
                    <Form.Item
                        labelCol={{span: 24}}
                        label="Họ"
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập đầy đủ thông tin!',
                            },
                            {
                                required: false,
                                pattern: new RegExp(/^[A-Za-zÀ-ỹ\s]+$/),
                                message: 'Không được nhập số!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input placeholder="Nhập họ của bạn" />
                    </Form.Item>
                </Col>
                <Col span={12} md={12} sm={24} xs={24}>
                    <Form.Item
                        labelCol={{span: 24}}
                        label="Tên"
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập đầy đủ thông tin!',
                            },
                            {
                                required: false,
                                pattern: new RegExp(/^[A-Za-zÀ-ỹ\s]+$/),
                                message: 'Không được nhập số!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input placeholder="Nhập tên của bạn" />
                    </Form.Item>
                </Col>
                <Col span={24} md={24} sm={24} xs={24}>
                    <Form.Item
                        label="Email"                                        
                        name="email"                                                
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập đầy đủ thông tin!',
                            },
                            {
                                type: "email",
                                message: 'Vui lòng nhập đúng định dạng địa chỉ email',
                            },

                        ]}
                        hasFeedback
                    ><Input disabled placeholder="Nhập email của bạn" />
                    </Form.Item>
                </Col>               
                <Col span={12} md={12} sm={24} xs={24}>
                    <Form.Item
                        label="Mật khẩu cũ"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập đầy đủ thông tin!',
                            },                                                    
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder='Nhập mật khẩu cũ' />
                    </Form.Item> 
                </Col>
                <Col span={12} md={12} sm={24} xs={24}>
                    <Form.Item
                        label="Mật khẩu mới"
                        name="passwordMoi"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập đầy đủ thông tin!',
                            },                                                    
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder='Nhập mật khẩu muốn đổi mới' />
                    </Form.Item> 
                </Col>
                <Col span={24} style={{display: "flex", justifyContent: "center"}}>
                    <Button onClick={() => formDoiMK.submit()} type="primary" size="large" icon={<FaSave size={25} />}>Đổi thông tin</Button>
                </Col>
            </Row>
        </Form> 
    )
}
export default ModalDoiMK