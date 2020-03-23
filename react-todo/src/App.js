import React from 'react';
import {Layout, Form, List, Button } from 'antd';
import './App.css';
import TodoForm from './Form';
const { Header, Content, Footer } = Layout;
const FillingForm = Form.create({})(TodoForm);

function App(props){
	
	const [todoList, setTodoList] = React.useState([]);
	const [doneList, setDoneList] = React.useState([]);
	
	React.useEffect(() => {
		getTasks();
		getDoneTasks();
		console.log('aaaaaaaa')
	}, [])

	const callBackFunction = () => {
		getTasks();
		getDoneTasks();
	}

	const deleteTask = (id) => {
		fetch(`http://localhost:8080/task/${id}`, {
			method: 'DELETE'
		})
			.then(getTasks())
			.then(getDoneTasks())
			.catch(err => console.log(err))
	}

	const getTasks = _ => {
		fetch('http://localhost:8080/task', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    	.then(response => response.json())
    	.then(response => setTodoList(response.data))
    	.catch(err => console.error(err));
	}

	const getDoneTasks = _ => {
		fetch('http://localhost:8080/task/done', {
			method: "GET",
			headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
		})
			.then(response => response.json())
			.then(response => setDoneList(response.data))
			.then(getTasks())
			.catch(err => console.error(err));
	}

	const markTaskAsDone = (id) => {
		fetch(`http://localhost:8080/task/${id}`, {
			method: 'PUT',
			headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
		})
			.then(getDoneTasks())
			.then(getTasks())
			.catch(err => console.log(err))
	}
  return (
  	<div className='App'>
			<Layout className='layout'>
				<Header className='header'>
					<h1 className='title'> Todo App</h1>
				</Header>
				<Content className='content'>
					<FillingForm parentCallback = {callBackFunction} />
				</Content>
				<Footer className='footer'>
					<div className='tasks'>
						<h2 className='todo'> Todo List </h2>
						<List
							size='small'
							bordered
							dataSource={todoList}
							renderItem={(item, index) => (
								<List.Item >
									<div className='item'>
									{item.text}
									</div>
									<div className='action-buttons'>
										<Button type='primary' onClick={(event) => {
											markTaskAsDone(item.id)
											getTasks()
											getDoneTasks()
										}}> Done </Button>
										<Button type='danger' onClick={(event) => {
											deleteTask(item.id)
											getTasks()
											getDoneTasks()
										}}>
											Delete
										</Button>
									</div>
								</List.Item>)}
						/>
					</div>
					<div className='tasks'>
						<h2 className='done'>Done List</h2>
						<List
							size='small'
							bordered
							dataSource={doneList}
							renderItem={(item, index) => (
								<List.Item>
									<div className='item'>
										{item.text}
									</div>
									<div className='action-buttons'>
										<Button type='danger' onClick={(event) => {
											deleteTask(item.id)
											getTasks()
											getDoneTasks()
										}}>
											Delete
										</Button>
									</div>
								</List.Item>)}
						/>
					</div>
				</Footer>
			</Layout>   
		</div>
	);
}

export default App;