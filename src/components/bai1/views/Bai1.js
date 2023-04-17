import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Image,
  InputNumber,
  message,
  Modal,
  Radio,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Bai1Domain from "../domains/Bai1Domain";
import _ from "lodash";
import { EyeOutlined, WarningFilled } from "@ant-design/icons";
import moment from "moment/moment";
import AddOder from "./AddOder";

export function Bai1() {
  const [form] = Form.useForm();
  const [context, domain] = Bai1Domain();
  const [data, setData] = useState();

  //--------------------------useEffect -------------
  useEffect(() => {
    domain.initDomain();
  }, []);

  useEffect(() => {
    setData(context?.dataTable);
  }, [context?.dataTable]);

  //-------------------------- modal -----------------
  const [open, setOpen] = useState(false);
  async function onCancel() {
    setOpen(false);
  }

  async function onOpen() {
    await form.validateFields();
    setOpen(true);
  }

  async function update() {
    setOpen(false);
    let params = await form.getFieldsValue(true);
    await domain.update(params);
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      fixed: "left",
      width: 100,
      render: (record, value, index) => index + 1,
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "orderNumber",
      key: "orderNumber",
      width: 300,
    },
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      width: 300,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 300,
    },
    {
      title: "Công ty",
      dataIndex: "companyID",
      key: "companyID",
      width: 300,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 300,
      render: (value) => formatStatus(value),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 200,
      render: (_, record, index) => (
        <Space size="middle">
          <Tooltip
            title="Xem chi tiết đơn hàng"
            color="#1677ff"
            onClick={(e) => OpenOderInfo(record?.id)}
          >
            <a>
              <EyeOutlined />
            </a>
          </Tooltip>
        </Space>
      ),
    },
  ];

  //--------------------------------------------
  const [openOderInfo, setOpenOderInfo] = useState(false);
  async function OpenOderInfo(id) {
    await domain.getOderById(id);
    setOpenOderInfo(true);
  }
  //--------------------------------------------
  const [openOderAdd, setOpenOderAdd] = useState(false);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Row style={{ height: 10 }}></Row>
      <Modal
        open={openOderAdd}
        width={800}
        footer={[]}
        onCancel={(e) => setOpenOderAdd(false)}
      >
        <AddOder
          context={context}
          domain={domain}
          setOpenOderAdd={setOpenOderAdd}
        />
      </Modal>
      <Modal
        open={open}
        width={800}
        footer={[]}
        onCancel={(e) => setOpen(false)}
      >
        <CardDetail context={context} domain={domain} setOpen={setOpen} />
      </Modal>
      <Modal
        open={openOderInfo}
        width={800}
        footer={[]}
        onCancel={(e) => setOpenOderInfo(false)}
      >
        <OderInfo
          context={context}
          domain={domain}
          setOpenOderInfo={setOpenOderInfo}
        />
      </Modal>
      <Row span={24}>
        <Col span={1} />
        <Col span={22}>
          <Form
            labelCol={{ span: 6 }}
            layout="horizontal"
            style={{ width: "100%" }}
            title="Form"
            form={form}
          >
            <Card
              title={
                <Space style={{ width: "100%" }}>
                  <div>Danh sách đơn hàng</div>
                  <Button type="primary" onClick={(e) => onOpen()}>
                    Thông tin cá nhân
                  </Button>
                  <Button type="primary" onClick={(e) => setOpenOderAdd(true)}>
                    Đặt hàng
                  </Button>
                </Space>
              }
            >
              <Row>
                <Table
                  columns={columns}
                  dataSource={data}
                  style={{ minHeight: "50vh" }}
                  scroll={{
                    x: "100%",
                    y: "50vh",
                  }}
                />
              </Row>
            </Card>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

function formatStatus(value) {
  switch (value) {
    case "Người bán đang chuẩn bị":
      return <Tag color="warning">Người bán đang chuẩn bị</Tag>;
    case "Hàng đã đến kho":
      return <Tag color="processing">Hàng đã đến kho</Tag>;
    case "Đơn hàng bị hủy":
      return <Tag color="error">Đơn hàng bị hủy</Tag>;
    case "Đã nhận hàng":
      return <Tag color="success">Đã nhận hàng</Tag>;
    default:
      return <Tag color="default">{value}</Tag>;
  }
}

function CardDetail({ context }) {
  const { infoCard } = context || {};
  return (
    <Card title="Thông tin thẻ tín dụng">
      <Col offset={2} span={20}>
        <Row gutter={24}>
          <Col span={5}>Tên chủ sở hữu:</Col>
          <Col offset={1} span={18}>
            {infoCard?.name}
          </Col>
        </Row>
        <Divider />
        <Row gutter={24}>
          <Col span={5}>Loại thẻ:</Col>
          <Col offset={1} span={18}>
            {infoCard?.cardType}
          </Col>
        </Row>
        <Divider />

        <Row gutter={24}>
          <Col span={5}>Số thẻ:</Col>
          <Col offset={1} span={18}>
            {infoCard?.cardNumber}
          </Col>
        </Row>
        <Divider />

        <Row gutter={24}>
          <Col span={5}>CVC:</Col>
          <Col offset={1} span={18}>
            {infoCard?.cvc}
          </Col>
        </Row>
        <Divider />

        <Row gutter={24}>
          <Col span={5}>Ngày hết hạn:</Col>
          <Col offset={1} span={18}>
            {infoCard?.due}
          </Col>
        </Row>
      </Col>
    </Card>
  );
}
function OderInfo({ context }) {
  const { oderDetail } = context || {};
  return (
    <Card title="Thông tin đơn hàng">
      <Col offset={2} span={20}>
        <Row gutter={24}>
          <Col span={8}>Mã đơn hàng:</Col>
          <Col offset={1} span={14}>
            {oderDetail?.orderNumber}
          </Col>
        </Row>
        <Divider />
        <Row gutter={24}>
          <Col span={8}>Người đặt hàng:</Col>
          <Col offset={1} span={14}>
            {oderDetail?.card?.name}
          </Col>
        </Row>
        <Divider />
        <Row gutter={24}>
          <Col span={8}>Loại sản phẩm:</Col>
          <Col offset={1} span={14}>
            {oderDetail?.orderNumber}
          </Col>
        </Row>
        <Divider />
        <Row gutter={24}>
          <Col span={8}>Công ty:</Col>
          <Col offset={1} span={14}>
            {oderDetail?.companyID}
          </Col>
        </Row>
        <Divider />
        <Row gutter={24}>
          <Col span={8}>Số lượng mua:</Col>
          <Col offset={1} span={14}>
            {oderDetail?.quantity}
          </Col>
        </Row>
        <Divider />
        <Row gutter={24}>
          <Col span={8}>Tình trạng đơn hàng:</Col>
          <Col offset={1} span={14}>
            {formatStatus(oderDetail?.status)}
          </Col>
        </Row>
        <Divider />
      </Col>
    </Card>
  );
}
