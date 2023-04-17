import { Button, Card, Form, Input, InputNumber, Select } from "antd";
import React from "react";

export default function AddOder({ domain, setOpenOderAdd }) {
  const [form] = Form.useForm();

  const resetForm = async () => {
    await form.resetFields();
  };
  const logForm = async () => {
    await form.validateFields();
    let values = form.getFieldsValue(true);
    let check = await domain.checkInventory(values);
    if (check == true) {
      await domain.addOders(values);
      setOpenOderAdd(false);
    }
  };
  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
      style={{ width: "100%" }}
      title="Form"
      form={form}
    >
      <Card
        style={{
          width: "100%",
        }}
        title={"Thêm mới đơn hàng"}
        actions={[
          <Button htmlType="submit" onClick={logForm} type="primary">
            Thêm mới
          </Button>,
          <Button onClick={resetForm}>Làm mới</Button>,
        ]}
      >
        <Form.Item
          label="Mã đơn hàng"
          name="orderNumber"
          rules={[
            {
              required: "true",
              message: "Trường thông tin không được để trống",
            },
          ]}
        >
          <Input placeholder="Nhập thông tin" />
        </Form.Item>
        <Form.Item
          label="Công ty"
          name="companyID"
          rules={[
            {
              required: "true",
              message: "Trường thông tin không được để trống",
            },
          ]}
        >
          <Select
            placeholder="Chọn thông tin"
            options={[
              {
                label: "Mega Electronics Ltd.",
                value: "Mega Electronics Ltd.",
              },
              { label: "Shoppe", value: "Shoppe" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Sản phẩm"
          name="product"
          rules={[
            {
              required: "true",
              message: "Trường thông tin không được để trống",
            },
          ]}
        >
          <Select
            placeholder="Chọn thông tin"
            options={[
              { label: "Áo", value: "Áo" },
              { label: "Quần", value: "Quần" },
              { label: "Mũ", value: "Mũ" },
              { label: "Giày", value: "Giày" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[
            {
              required: "true",
              message: "Trường thông tin không được để trống",
            },
          ]}
        >
          <InputNumber placeholder="Nhập" />
        </Form.Item>
      </Card>
    </Form>
  );
}
