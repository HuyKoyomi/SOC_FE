import { createSlice } from "../../../core/store/store";
import log from "../ModuleLogger";
const A03Bai1Context = "A03Bai1Context";
const tag = A03Bai1Context;
const LoginActionList = Object.freeze({
  UpdateContext: A03Bai1Context + "/update",
  ResetContext: A03Bai1Context + "/reset",
});

const A03Bai1InitalState = {};

const A03Bai1Actions = {};

A03Bai1Actions[LoginActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, "A00_UPDATE_CONTEXT", payload);
  if (A03Bai1Context != payload?.slice) {
    log.error(tag, "context not match", payload?.slice || "undefined");
    return state;
  }
  return { ...state, A03Bai1Context: payload.data };
};

A03Bai1Actions[LoginActionList.ResetContext] = (state, payload) => {
  log.trace(tag, "A00_RESET_CONTEXT");
  if (A03Bai1Context != payload?.slice) {
    log.error(tag, "context not match", payload?.slice || "undefined");
    return state;
  }
  return { ...state, ...A03Bai1InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, A03Bai1Context, A03Bai1Actions, {
    ...A03Bai1InitalState,
    ...data,
  });
};
export { createContext, A03Bai1Context, A03Bai1Actions, LoginActionList };
