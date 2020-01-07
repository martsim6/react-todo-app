import {Form, Input, Button} from 'antd';
import React, { Component } from 'react';

class TodoForm extends Component{

  sendData = (message) => {
    this.props.parentCallback(message);
  }

  render() {
    return(
      <Form layout='inline' onSubmit={this.handleSubmit}>
        <Form.Item>
          <Input name='todoTask' placeholder='Please, enter your worries.' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'> Add </Button>
        </Form.Item>
      </Form>
    );
  }

  handleSubmit = (e) => {
    console.log('kappa');
    var taskDesc = this.props.form.getFieldValue('todoTask');
    this.sendData('lackooo');
    console.log(taskDesc);
    // if(taskDesc.lenght > 0) {
    //   console.log('lacko');
    // }
    e.preventDefault();
  }
}

export default TodoForm;