import React,{Component} from 'react';
import {Layout, Form, List, Button } from 'antd';
import './App.css';
import TodoForm from './Form';
const { Header, Content, Footer } = Layout;
const FillingForm = Form.create({})(TodoForm);

class App extends Component {

	state = {
		todoList:[],
		lackoList: []
	}
	componentDidMount(){
		this.getTasks();
	}

	callBackFunction = () => {
		this.getTasks();
	}

	deleteTask = (id) => {
		fetch(`http://localhost:8080/task/${id}`, {
			method: 'DELETE'
		})
			.then(this.getTasks())
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
						<List
							size='small'
							bordered
							dataSource={this.state.lackoList}
							renderItem={(item, index) => (
								<List.Item>
									{item.text}
									<Button type='danger' onClick={(event) => {this.deleteTask(item.id)}}>
										Delete
									</Button>
								</List.Item>)}
						/>
					</Footer>
				</Layout>   
			</div>
		);
	}
}

export default App;