import React,{Component} from 'react';
import {Layout, Form, List, Button } from 'antd';
import './App.css';
import TodoForm from './Form';

const { Header, Content, Footer } = Layout;
const FillingForm = Form.create({})(TodoForm);

class App extends Component {

	state = {
		todoList:[]
	}
	callBackFunction = (childData) => {
		this.setState({
			todoList:[...this.state.todoList, childData]
		})
	}
	render(){
    return (
    	<div className='App'>
				<Layout className='layout'>
					<Header className='header'>
						<h1 className='title'> Todo App</h1>
					</Header>
					<Content className='content'>
						<FillingForm parentCallback = {this.callBackFunction} />
					</Content>
					<Footer>
						<List
							bordered
							dataSource={this.state.todoList}
							renderItem={item => <List.Item>{item}<Button type='danger'>Delete</Button></List.Item>}
						/>
					</Footer>
				</Layout>   
			</div>
		);
	}
}

export default App;