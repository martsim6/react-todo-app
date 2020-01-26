import React,{Component} from 'react';
import {Layout, Form, List, Button } from 'antd';
import './App.css';
import TodoForm from './Form';
const { Header, Content, Footer } = Layout;
const FillingForm = Form.create({})(TodoForm);

class App extends Component {

	state = {
		lackoList: [],
		doneList: []
	}
	componentDidMount(){
		this.getTasks();
		this.getDoneTasks();
	}

	callBackFunction = () => {
		this.getTasks();
		this.getDoneTasks();
	}

	deleteTask = (id) => {
		fetch(`http://localhost:8080/task/${id}`, {
			method: 'DELETE'
		})
			.then(this.getTasks())
			.then(this.getDoneTasks())
			.catch(err => console.log(err))
	}

	getTasks = _ => {
		fetch('http://localhost:8080/task', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    	.then(response => response.json())
    	.then(response => this.setState({ lackoList: response.data}))
    	.catch(err => console.error(err));
	}

	getDoneTasks = _ => {
		fetch('http://localhost:8080/task/done', {
			method: "GET",
			headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
		})
			.then(response => response.json())
			.then(response => this.setState({doneList: response.data}))
			.then(this.getTasks())
			.catch(err => console.error(err));
	}

	markTaskAsDone = (id) => {
		fetch(`http://localhost:8080/task/${id}`, {
			method: 'POST',
			headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
		})
			.then(this.getDoneTasks())
			.then(this.getTasks())
			.catch(err => console.log(err))
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
					<Footer className='footer'>
						<div className='todoTasks'>
							<h2> Todo List </h2>
							<List
								grid={{gutter: 16, column: 1}}
								size='small'
								bordered
								dataSource={this.state.lackoList}
								renderItem={(item, index) => (
									<List.Item>
										{item.text}
										<Button type='primary' onClick={(event) => {this.markTaskAsDone(item.id)}}> Done </Button>
										<Button type='danger' onClick={(event) => {this.deleteTask(item.id)}}>
											Delete
										</Button>
									</List.Item>)}
							/>
						</div>
						<div className='doneTasks'>
							<h2>Done List</h2>
							<List
								grid={{gutter: 16, column: 1}}
								size='small'
								bordered
								dataSource={this.state.doneList}
								renderItem={(item, index) => (
									<List.Item>
										{item.text}
										<Button type='danger' onClick={(event) => {this.deleteTask(item.id)}}>
											Delete
										</Button>
									</List.Item>)}
							/>
						</div>
					</Footer>
				</Layout>   
			</div>
		);
	}
}

export default App;