import { createBrowserRouter, Link } from "react-router-dom";
import { Bai1 } from "../components/bai1/views/Bai1";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Bai1 />,
  },
]);
