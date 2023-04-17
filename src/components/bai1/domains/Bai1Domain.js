import { useRef, useEffect } from "react";
import A03Bai1ContextService from "../services/Bai1ContextService";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { AxiosAPI } from "../../../core/common/AxiosAPI";
import UseCommon from "../../../core/hooks/UseCommon";
import _ from "lodash";
import dayjs from "dayjs";

export function A03Bai1Domain() {
  const [context, contextService] = A03Bai1ContextService();
  const contextRef = useRef(context);
  const navigate = useNavigate();
  const common = UseCommon();

  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  const initDomain = async () => {
    const contextData = {
      infoCard: await getInfo(),
      dataTable: await getOders(),
      oderDetail: null,
    };
    await contextService.initContext(contextData);
  };
  const getInfo = async () => {
    try {
      common?.backdrop(true);
      let response = await AxiosAPI({
        method: "get",
        url: process.env.REACT_APP_API_URL + `/card/1`,
        data: null,
      });
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      common?.backdrop(false);
    }
  };
  const getOders = async () => {
    try {
      common?.backdrop(true);
      let response = await AxiosAPI({
        method: "get",
        url: process.env.REACT_APP_API_URL + `/getAllOrders`,
        data: null,
      });
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      common?.backdrop(false);
    }
  };
  const addOders = async (params) => {
    try {
      common?.backdrop(true);
      let dataInput = {
        orderNumber: params?.orderNumber,
        companyID: params?.companyID,
        quantity: params?.quantity,
        product: params?.product,
        status: "Người bán đang chuẩn bị",
        card: {
          id: 1,
          name: "Lý Mạnh Huy",
          cardType: "credit Card",
          cardNumber: "123456",
          cvc: "100",
          due: "15/04/2024",
        },
      };
      let response = await AxiosAPI({
        method: "post",
        url: process.env.REACT_APP_API_URL + `/orders`,
        data: dataInput,
      });
      message.success("Thêm mới thành công");
    } catch (error) {
      console.log(error);
    } finally {
      common?.backdrop(false);
    }
  };
  const getOderById = async (id) => {
    try {
      common?.backdrop(true);
      let response = await AxiosAPI({
        method: "get",
        url: process.env.REACT_APP_API_URL + `/orders/${id}`,
        data: null,
      });
      contextRef.current.oderDetail = response;
      await contextService.updateContext(contextRef.current);
    } catch (error) {
      console.log(error);
    } finally {
      common?.backdrop(false);
    }
  };
  const checkInventory = async (params) => {
    try {
      common?.backdrop(true);
      let dataInput = {
        quantity: params?.quantity,
        name: params?.product,
      };
      let response = await AxiosAPI({
        method: "post",
        url: process.env.REACT_APP_API_URL + `/checkInventory`,
        data: dataInput,
      });
      if (response == false) {
        message.error("Số lượng còn lại trong kho không đủ");
      }
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      common?.backdrop(false);
    }
  };

  //------------------- navigation ----------------------
  function logOut() {
    navigate("/");
  }
  const domainInterface = useRef({
    initDomain,
    getOderById,
    logOut,
    addOders,
    checkInventory,
  });
  return [context, domainInterface.current];
}

export default A03Bai1Domain;
