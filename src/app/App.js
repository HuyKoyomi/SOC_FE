import React from "react";
import { RouterProvider } from "react-router-dom";
import { CommonProvider } from "../core/common/CommonContext";
import { StoreProvider } from "../core/store/store";
import { router } from "./AppRoutes";

// CommonProvider => tạo loading
// => StoreProvider => // tạo lưu context
export function App() {
  return (
    // <BrowserRouter>
    <StoreProvider>
      <CommonProvider>
        <RouterProvider router={router} />
      </CommonProvider>
    </StoreProvider>
    // </BrowserRouter>
  );
}
