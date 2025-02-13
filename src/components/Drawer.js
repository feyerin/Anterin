import React, { Component } from "react";
import { Layout, Icon, Menu, Modal } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;
//logout
const { confirm } = Modal;




export default class Drawer extends Component {
  state = {
    collapsed: false
  };

  onOkay = () => {
    localStorage.clear()
    this.props.customProps.push('/')
    console.log('token:', localStorage.clear() )
  }
  showConfirm = () => {
    confirm({
      title: 'Logout',
      content: 'are you sure want to logout?',
      onOk: () => this.onOkay()
      ,
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/home">
              <Icon type="home" />
              <span>Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/Distributor">
              <Icon type="idcard" />
              <span>Distributor</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/Dealer">
              <Icon type="user" />
              <span>Dealer</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/Agen">
              <Icon type="book" />
              <span>Agen</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/Driver">
              <Icon type="audit" />
              <span>Driver</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/Setting">
              <Icon type="setting" />
              <span>Setting</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="/Help">
              <Icon type="exclamation-circle" />
              <span>Help</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="8" onClick={this.showConfirm}>
              <Icon type="logout" />
              <span>Logout</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }

}
