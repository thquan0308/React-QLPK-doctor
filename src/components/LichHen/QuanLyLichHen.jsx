import {
    Col,
    Row,
    Space,
    Table,
    Tag,
    Tooltip,
    Modal,
    Button,
    Input,
} from "antd";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { findAllLichHenByDoctor } from "../../services/doctorAPI";
import ViewLichHen from "./ViewLichHen";
// import { updateTrangThaiDaKham } from "../../services/apiDoctor";
import SimpleForm from "./SimpleForm";
import React from "react";

const QuanLyLichHen = () => {
    const [dataOrder, setDataOrder] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loadingOrder, setLoadingOrder] = useState(false);
    const [sortQuery, setSortQuery] = useState("sort=createdAt&order=desc");

    const [openViewDH, setOpenViewDH] = useState(false);
    const [dataViewDH, setDataViewDH] = useState(null);
    const user = useSelector((state) => state.accountDoctor.user._id);
    //

    const findAllOrder = async () => {
        setLoadingOrder(true);
        let query = `page=${current}&limit=${pageSize}`;
        if (sortQuery) {
            query += `&${sortQuery}`;
        }
        // Thêm tham số tìm kiếm vào query nếu có
        if (user) {
            query += `&idDoctor=${encodeURIComponent(user)}`;
        }
        let res = await findAllLichHenByDoctor(query);
        console.log("res his order: ", res);
        if (res && res.data) {
            setDataOrder(res.data?.findOrder);
            setTotal(res.data?.totalOrder);
        }
        setLoadingOrder(false);
    };

    useEffect(() => {
        findAllOrder();
    }, [user, current, pageSize, sortQuery]);

    const onChange = (pagination, filters, sorter, extra) => {
        console.log(">> check: pagination", pagination);

        // nếu thay dổi trang: current
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current); // ví dụ "5" -> 5
            }
        }

        // nếu thay đổi tổng số phần tử
        if (pagination && pagination.current) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize); // ví dụ "5" -> 5
            }
        }

        if (sorter && sorter.field) {
            const sortOrder = sorter.order === "ascend" ? "asc" : "desc"; // Determine sort order
            const newSortQuery = `sort=${sorter.field}&order=${sortOrder}`;
            if (newSortQuery !== sortQuery) {
                setSortQuery(newSortQuery); // Only update if sort query changes
            }
        }

        window.scrollTo({ top: 80, behavior: "smooth" });
    };

    //-----------------------------
    // const handleUpdateStatus = async (record) => {
    //     try {
    //         if (!record || !record._id) {
    //             message.error("Không tìm thấy lịch hẹn!");
    //             return;
    //         }

    //         console.log("Đang cập nhật trạng thái cho lịch hẹn:", record._id);

    //         // Gọi API để cập nhật trạng thái
    //         const response = await updateTrangThaiDaKham(record._id);

    //         // Log toàn bộ response để kiểm tra chi tiết
    //         console.log("API Response:", response);
    //         window.location.reload();
    //         // Kiểm tra phản hồi từ API
    //         if (response.status === 200) {
    //             message.success("Cập nhật trạng thái thành công!");

    //             // Gọi lại findAllOrder để tải lại danh sách
    //             findAllOrder();
    //         } else {
    //             message.error("Cập nhật trạng thái thất bại!");
    //         }
    //     } catch (error) {
    //         console.error("Error in handleUpdateStatus:", error);
    //         message.error("Có lỗi xảy ra khi cập nhật trạng thái!");
    //     }
    // };

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (text, record, index) => (
                <span>{index + 1 + (current - 1) * pageSize}</span>
            ),
            width: 100,
        },
        {
            title: "Bệnh nhân",
            dataIndex: "benhnhan",
            key: "benhnhan",
            render: (text, record) => (
                <span style={{ fontWeight: "bold" }}>
                    {record?.patientName}
                </span>
            ),
            // width: 100
        },
        {
            title: "Ngày đặt lịch",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text, record) => {
                return (
                    // <>{moment(record.createdAt).format('DD-MM-YYYY  (hh:mm:ss)')}</>
                    <>
                        {moment(record.createdAt)
                            .tz("Asia/Ho_Chi_Minh")
                            .format("DD-MM-YYYY (HH:mm:ss)")}
                    </>
                );
            },
            sorter: true,
        },
        {
            title: (
                <span style={{ justifyContent: "center", display: "flex" }}>
                    Trạng thái
                </span>
            ),
            key: "status",
            dataIndex: "status",
            render: (text, record) => {
                const getStatusTagForTinhTrangDonHang = (status) => {
                    if (status === "Không Hủy") {
                        return {
                            color: "green",
                            icon: <CheckCircleOutlined />,
                        }; // khong huy
                    }
                    return {
                        color: "red",
                        icon: <ExclamationCircleOutlined />,
                    }; // da huy
                };

                const getStatusTagForTinhTrangThanhToan = (status) => {
                    return status === "Chưa đặt lịch"
                        ? { color: "red", icon: <ExclamationCircleOutlined /> }
                        : { color: "green", icon: <CheckCircleOutlined /> }; // "Đã Thanh Toán"
                };

                const donHangTag = getStatusTagForTinhTrangDonHang(
                    record.trangThaiHuyDon
                );
                const thanhToanTag = getStatusTagForTinhTrangThanhToan(
                    record.trangThai
                );
                return (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        {record.trangThaiHuyDon === "Không Hủy" ? (
                            <>
                                <Tag
                                    color={thanhToanTag.color}
                                    icon={thanhToanTag.icon}
                                >
                                    {record.trangThai}
                                </Tag>
                            </>
                        ) : (
                            <Tag
                                color={donHangTag.color}
                                icon={donHangTag.icon}
                            >
                                {record.trangThaiHuyDon}
                            </Tag>
                        )}
                    </div>
                );
            },
        },
        {
            title: "Thông tin",
            dataIndex: "total",
            key: "total",
            render: (text, record) => {
                return (
                    <>
                        <span>Đã đặt lịch: {record.tenGioKham} </span> <br />
                        <span>Ngày: {record.ngayKhamBenh} </span> <br />
                        <span>
                            Tổng{" "}
                            <span style={{ color: "red" }}>
                                {Math.ceil(record.giaKham).toLocaleString()} VNĐ
                            </span>{" "}
                        </span>
                    </>
                );
            },
        },
        {
            title: "Chức năng",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip
                        title="Xem chi tiết lịch hẹn này"
                        color={"green"}
                        key={"green"}
                    >
                        <FaEye
                            size={23}
                            style={{
                                color: "green",
                                fontWeight: "bold",
                                cursor: "pointer",
                                fontSize: "18px",
                            }}
                            onClick={() => {
                                console.log("record: ", record);
                                setOpenViewDH(true);
                                setDataViewDH(record);
                            }}
                        />
                    </Tooltip>

                    {/* <Tooltip
                        title="Cập nhật ghi chú bệnh án"
                        color="green"
                        key="green"
                    >
                        <Button
                            icon={
                                <CheckCircleOutlined
                                    style={{ color: "green" }}
                                />
                            }
                            onClick={() => handleOpenModal(record._id)} // Gọi hàm mở modal với id lịch hẹn
                        >
                            Cập nhật ghi chú
                        </Button>
                    </Tooltip> */}
                </Space>
            ),
        },
    ];

    return (
        <>
            <Row>
                <Col xs={24} sm={12} md={24} span={24}>
                    <Table
                        onChange={onChange}
                        pagination={{
                            current: current,
                            pageSize: pageSize,
                            showSizeChanger: true,
                            total: total,
                            showTotal: (total, range) => {
                                return (
                                    <div>
                                        {" "}
                                        {range[0]}-{range[1]} trên {total} lịch
                                        hẹn
                                    </div>
                                );
                            },
                        }}
                        //  pagination={false}  // Tắt phân trang mặc định của Table

                        loading={loadingOrder}
                        columns={columns}
                        dataSource={dataOrder}
                    />
                </Col>

                <ViewLichHen
                    openViewDH={openViewDH}
                    dataViewDH={dataViewDH}
                    setOpenViewDH={setOpenViewDH}
                    setDataViewDH={setDataViewDH}
                />
            </Row>
        </>
    );
};
export default QuanLyLichHen;
