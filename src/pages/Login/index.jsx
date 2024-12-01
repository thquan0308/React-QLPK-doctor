import { Button, Checkbox, Col, Divider, Form, Input, message, Modal, notification, Row } from "antd"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { doLoginAction } from "../../redux/account/accountSlice"
import { handleLoginDoctor, handleQuenPassword } from "../../services/loginAPI"


const Login = () => {

    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [openQuenMK, setOpenQuenMK] = useState(false);
    const [isLoadingDoiMK, setIsLoadingDoiMK] = useState(false)
    const [formLayMK] = Form.useForm()

    const isAuthenticated = useSelector(state => state.accountDoctor.isAuthenticated)
    console.log("isAuthenticated: ", isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to="/doctor" replace />;
    }

    useEffect(() => {
        const rememberedDoctor = localStorage.getItem("rememberedDoctor");
        if (rememberedDoctor) {
            const account = JSON.parse(rememberedDoctor);
            console.log("JSON.parse(rememberedDoctor): ",JSON.parse(rememberedDoctor));
            
            form.setFieldsValue({
                email: account.email,
                password: account.password,
                remember: true,
            });
            setRemember(true);
        }
    }, [form]);

    const onFinish = async (values) => {
        const {
            email, password
        } = values

        setIsLoading(true)
        const res = await handleLoginDoctor(email, password)

        if(res && res.data) {
            localStorage.setItem("access_tokenDoctor", res.access_token)
            dispatch(doLoginAction(res.data))            
            message.success(res.message)

            if (remember) {
                // Nếu người dùng chọn "Ghi nhớ tài khoản", lưu thông tin vào localStorage
                localStorage.setItem("rememberedDoctor", JSON.stringify({ email, password }));
            } else {
                // Nếu không chọn, xóa dữ liệu đã lưu (nếu có)
                localStorage.removeItem("rememberedDoctor");
            }

            form.resetFields()
            // window.history.back();
            navigate('/doctor');
        } else {
            notification.error({ 
                message: "Đăng nhập không thành công!",
                description:
                    res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5
            })
        }
        setIsLoading(false)
    }    

    const handleLayMK = async (values) => {
        const email_doimk = values.email; 
        console.log("email_doimk: ", email_doimk);  
    
        if (!email_doimk) {
            notification.error({ 
                message: "Lỗi", 
                description: "Vui lòng nhập email!"
            });
            return;
        }

        try {
            const res = await handleQuenPassword(email_doimk);
            console.log("res: ", res);
            
            if (res.data) {
                notification.success({
                    message: "Lấy lại mật khẩu thành công!",
                    description: res.message
                });                
            } else {
                notification.error({ 
                    message: "Lấy lại mật khẩu thất bại!",
                    description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                    duration: 5,
                });
            }
        } catch (error) {
            notification.error({ 
                message: "Lấy lại mật khẩu thất bại!",
                description: error.message,
            });
        } 
    };

    return (
        <>
        <Header/>
        <div className="rts-navigation-area-breadcrumb bg_light-1">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <div className="navigator-breadcrumb-wrapper">
                    <a>Home</a>
                    <i className="fa-regular fa-chevron-right" />
                    <a className="current">Login</a>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="section-seperator bg_light-1">
            <div className="container">
            <hr className="section-seperator" />
            </div>
        </div>

        <div className="rts-register-area rts-section-gap bg_light-1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="registration-wrapper-1">
                            <h3 className="title">Đăng nhập tài khoản của bạn</h3>
                            <Form
                            form={form}
                            className="registration-form"                                
                            layout="vertical"                                    
                            onFinish={onFinish} 
                            >
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
                                ><Input placeholder="Nhập email của bạn" />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Password không được để trống!',
                                        },  
                                        {
                                            required: false,
                                            pattern: new RegExp(/^(?!.*\s).{6,}$/),
                                            message: 'Không được nhập có dấu cách, tối thiểu có 6 kí tự!',
                                        },                                  
        
                                    ]}
                                    hasFeedback
                                    ><Input.Password onKeyDown={(e) => {
                                        console.log("check key: ", e.key);
                                        if(e.key === 'Enter') form.submit()
                                    }} placeholder="Nhập mật khẩu của bạn" />
                                </Form.Item>  

                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"                                
                                >
                                    <div style={{display: "flex", justifyContent: "space-between"}}>                                        
                                        <Checkbox
                                            checked={remember}
                                            onChange={(e) => setRemember(e.target.checked)}
                                        >Ghi nhớ tài khoản</Checkbox>

                                        <span style={{cursor: "pointer", fontWeight: "500"}} onClick={() => setOpenQuenMK(true)}>Quên mật khẩu</span>
                                    </div>
                                </Form.Item>


                                <Form.Item >                                       
                                    <Button loading={isLoading} 
                                            type="primary" 
                                            size='large'
                                            style={{border: "none", lineHeight: "10px"}}
                                            className="rts-btn btn-primary"
                                            onClick={() => form.submit()}>
                                        Đăng nhập 
                                    </Button>                                            
                                </Form.Item>
                            </Form>     

                            <Modal 
                            title="Lấy mật khẩu"
                            centered 
                            loading={isLoadingDoiMK}
                            open={openQuenMK} 
                            onOk={() => formLayMK.submit()}  
                            okText={"Lấy mật khẩu"}
                            cancelText="Huỷ"  
                            width={500}        
                            maskClosable={false}                
                            onCancel={() => {
                                setOpenQuenMK(false)
                                formLayMK.resetFields()
                            }}>
                                <Divider/>
                                <Form
                                form={formLayMK}
                                className="registration-form"                                
                                layout="vertical"                                    
                                onFinish={handleLayMK} 
                                >
                                    <Row>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Nhập Email cần lấy mật khẩu"                                        
                                                name="email"                                                
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Nhập email chính xác để lấy lại mật khẩu!',
                                                    },
                                                    {
                                                        type: "email",
                                                        message: 'Vui lòng nhập đúng định dạng địa chỉ email',
                                                    },

                                                ]}
                                                hasFeedback
                                            ><Input placeholder="Email của bạn..." />
                                            </Form.Item>                        
                                        </Col>
                                    </Row>
                                </Form>
                            </Modal> 
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer/>
        </>
    )
}
export default Login