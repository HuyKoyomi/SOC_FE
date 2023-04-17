import { useRef } from "react";
import { useDispatch, useStore } from "../../../core/store/store";
import {
  createContext,
  A03Bai1Context,
  LoginActionList,
} from "../contexts/Bai1Context";

function useA00ContextService() {
  const context = useStore()[A03Bai1Context];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    dispatcher({
      slice: A03Bai1Context,
      type: LoginActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: A03Bai1Context,
      type: LoginActionList.ResetContext,
    });
  };
  const dispatchInterface = useRef({
    initContext,
    updateContext,
    resetContext,
  });

  return [context, dispatchInterface.current];
}

export default useA00ContextService;
