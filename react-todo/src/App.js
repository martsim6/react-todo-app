import React,{Component} from 'react';
import {Layout, Form } from 'antd';
import './App.css';
import TodoForm from './Form';

const { Header, Content } = Layout;
const FillingForm = Form.create({})(TodoForm);

class App extends Component {

	state = {
		todoList:[]
	}
	callBackFunction = (childData) => {
		this.setState({todoList: childData})
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
						<p> {this.state.todoList} </p>
					</Content>
				</Layout>   
			</div>
		);
	}
}

export default App;