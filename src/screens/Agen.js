import React, { Component } from "react";
import { Layout,Table } from "antd";
import axios from 'axios';
import { URL } from '../components/BaseUrl';

const { Content } = Layout;

export class Agen extends Component {
  //Login verivikator
  constructor(props){
    super(props);
    if(localStorage.getItem("token") == null){
      this.props.history.push('/')
    }
  }

  state = {
    data : []
  };
  column = [
    {
      title: "nama",
      dataIndex: "name"
    },
    {
      title: "nomor telp",
      dataIndex: "phone"
    },
    {
      title: "address",
      dataIndex: "address"
    },
    {
        title: "token",
        dataIndex: "token"
      },
  ]

  componentDidMount(){
    axios.get(URL + "/api/v1/marketing/agents?search=&sort=name&includes=",
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
        item.key = item.id;
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

export default Agen;
