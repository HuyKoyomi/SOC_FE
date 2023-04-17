import { Button, Col } from "antd";
import _ from "lodash";
import React, { useState } from "react";
import { Link, NavLink, Route, useNavigate } from "react-router-dom";
import "../style/Nav.css";
import { navbarList } from "./NavBarList";

export default function NavBar() {
  let currentUrl = window.location.href.split("/");
  const [page, setPage] = useState("/" + currentUrl[currentUrl?.length - 1]);
  const navigate = useNavigate();
  return (
    <div className="wh_full" style={{ display: "flex" }}>
      {_.map(navbarList, (item) => {
        const { path, title } = item || {};
        return (
          <Col span={8} className="col_navbar">
            <Button
              style={page == path ? SelectedBtnCss : UnSelectedBtnCss}
              className="btn_navbar wh_full"
              onClick={(e) => {
                navigate(path);
                setPage(path);
              }}
            >
              {title}
            </Button>
          </Col>
        );
      })}
    </div>
  );
}

const SelectedBtnCss = {
  color: "#fff",
  backgroundColor: "#1890ff",
};

const UnSelectedBtnCss = {
  // color: "#5f5f5f",
};
