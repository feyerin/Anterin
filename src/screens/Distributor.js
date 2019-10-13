import React, { Component } from "react";
import {Table,Layout} from "antd";
import axios from "axios";
import {URL} from "../components/BaseUrl";
const { Content } = Layout;


export default class Distributor extends Component {
  //Login verivikator
  constructor(props){
    super(props);
    console.log(localStorage.getItem("token"))
    if(localStorage.getItem("token") == null){
      this.props.history.push('/')
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
          title: "phone",
          dataIndex: "phone"
        },
        {
          title: "email",
          dataIndex: "email"
        },
        {
          title: "address",
          dataIndex: "address"
        },
        {
          title: "detail",
          dataIndex: "detail"
        },
      ]

    componentDidMount(){
      axios.get(URL + "/api/v1/marketing/distributors?search=&sort=-balance",
      {
        headers : {
          Authorization : 'Bearer ' + localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log(response);
        console.log('try');
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
        console.log(localStorage.getItem("token"));
        console.log(error);
      })
    }

    render(){

        return(
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
        );

        
    }
}