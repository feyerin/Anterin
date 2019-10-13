import React, { Component } from "react";
import { Layout,Table } from "antd";
import {URL} from "../components/BaseUrl";
import axios from 'axios';

const { Content } = Layout;

export class Home extends Component {
  //verivikator login
  constructor(props){
    super(props);
    console.log(localStorage.getItem("token"))
    if(localStorage.getItem("token") == null){
      this.props.history.push('/')
      console.log("login")
    }
  }

  state = {
    data : []
  };
  column = [
    {
      title: "name",
      dataIndex: "name"
    },
    {
      title: "distributors",
      dataIndex: "distributors"
    },
    {
      title: "dealers total",
      dataIndex: "dealers_total"
    },
    {
        title: "agents total",
        dataIndex: "agents_total"
      },
      {
        title: "drivers total",
        dataIndex: "drivers_total"
      },
  ]

  componentDidMount(){
    axios.get(URL + "api/v1/marketing/spread",
    {
      headers : {
        Authorization : 'Bearer ' + localStorage.getItem("token")
      }
    })
    .then(response => {
      console.log(response);
      console.log("Agen");
      var newArray = [];
      response.data.data.forEach(item => {
        item.key = item.province_id;
        newArray.push(item);
      });
      this.setState({
        ...this.state,
        data: newArray
      });
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  render() {
    return (
      
      <div>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            marginTop: 16,
            minHeight: 280,
          }}
        >
          <Table
          columns={this.column} dataSource={this.state.data} pagination={{defaultPageSize: 20}}
        />
        </Content>
        
      </div>
    );
  }
}

export default Home;
