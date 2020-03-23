import {Form, Input, Button} from 'antd';
import React from 'react';

function TodoForm(props){

  const sendData = () => {
    props.parentCallback();
  }

  const handleSubmit = (e) => {
    const { form } = props;
    e.preventDefault();
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
    sendData();
  }

  const { getFieldDecorator } = props.form;
  return(
    <Form layout='inline' onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator('todoTask',{
          rules: [{required: false}],
        })(
        <Input placeholder='Please, enter your worries.' className='input' />
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

export default TodoForm;