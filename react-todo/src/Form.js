import {Form, Input, Button} from 'antd';
import React, { Component } from 'react';

class TodoForm extends Component{

  sendData = () => {
    this.props.parentCallback();
  }

  handleSubmit = (e) => {
    const { form } = this.props;
    var taskDesc = form.getFieldValue('todoTask');
    if(taskDesc && taskDesc.length > 0) {
      form.resetFields();

      fetch('http://localhost:8080/task', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todoText: taskDesc,
        })
      });
    }
    e.preventDefault();
    this.sendData();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <Form layout='inline' onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('todoTask',{
            rules: [{required: false}],
          })(
          <Input placeholder='Please, enter your worries.' />
          )}        
        </Form.Item>
        <Form.Item>
        {
          <Button type='primary' htmlType='submit'> Add </Button>
        }
        </Form.Item>
      </Form>
    );
  }
}

export default TodoForm;