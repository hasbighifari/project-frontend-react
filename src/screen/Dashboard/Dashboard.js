import React, { useEffect, useState } from 'react'
import AppbarNavbar from '../../component/AppbarNavbar/AppbarNavbar'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Todo from '../../component/Todo/Todo'
import Dialog from '../../component/Dialog/Dialog'
import styles from './styles'
import Loader from '../../component/Loader/Loader'
import { SendToService } from '../../service/serviceClient'
import { loginStatus } from '../../actions/userAction'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
    user: state.user,
    system: state.system
})

const mapDispatchToProps = dispatch => ({
    _setLoginStatus: val => {
        dispatch(loginStatus(val))
    }
})


const Dashboard = ({ ...props }) => {
    const { classes, _setLoginStatus, system } = props
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState({})
    const getTodos = () => {
        SendToService({}, 'GET', 'getAllTodos', response => {
            setTodos(response.body)
        })
    }
    useEffect(getTodos, [])
    const [state, setState] = useState({
        openAdd: false,
        openEdit: false
    })
    const filters = ['all', 'done', 'undone',]
    const handleOpenDialog = (type, open, item) => {
        if (type === 'add') {
            setState({
                ...state,
                openAdd: open
            })
        }
        else {
            setState({
                ...state,
                openEdit: open
            })
            setTodo({
                ...todo,
                _id: item._id,
                todoItem: item.todoItem
            })
        }
    }
    const handleCloseDialog = (open) => {
        setState({
            ...state,
            openAdd: open,
            openEdit: open,
        })
    }
    const handleLogout = () => {
        SendToService({}, 'POST', 'logout', response => {
            localStorage.setItem('x-auth-token', '')
            _setLoginStatus(false)
        })
    }
    const handleChange = id => e => {
        setTodo({
            ...todo,
            [id]: e.target.value
        })
    }
    const handleAddTodoItem = () => {
        SendToService({ ...todo }, 'POST', 'addTodo', response => {
            setTodos(response.body)
            setTodo({})
        })
        setState({
            ...state,
            openAdd: false
        })
    }

    const handleDeleteTodoItem = (item) => {
        SendToService({ ...item }, 'Delete', 'deleteTodo', response => {
            setTodos(response.body)
            setTodo({})
        })
    }

    const handleEditTodoItem = (type, item) => {
        if (type === 'complete') {
            SendToService({ todoItem: item.todoItem, isDone: true, _id: item._id }, 'PUT', 'updateTodo', response => {
                setTodos(response.body)
                setTodo({ isCompleted: true })
            })
        }
        else {
            SendToService({ todoItem: todo.todoItem, _id: todo._id }, 'PUT', 'updateTodo', response => {
                setTodos(response.body)
                setState({
                    ...state,
                    openEdit: false
                })
            })
        }
    }
    const handleSearch = id => e => {
        setTodo({
            ...todo,
            [id]: e.target.value,
        })
    }
    const handleSubmitSearch = () => {
        if (todo.filter === null || todo.filter === undefined) {
            todo.filter = ''
        }
        else {
            if (todo.filter === 'done') todo.filter = true
            else if (todo.filter==='undone') todo.filter = false
            else todo.filter=''
        }
        SendToService({ q: todo.q || '', filter: todo.filter }, 'GET', 'searchTodo', response => {
            setTodos(response.body)
        })
    }
    return (
        <div>
            <Dialog open={state.openAdd} title={'Add todo item'} buttonTitle='Add Item' handleClose={handleCloseDialog} handleSubmit={handleAddTodoItem}>
                <TextField label='Todo Item' fullWidth onChange={handleChange('todoItem')} />
            </Dialog>
            <Dialog open={state.openEdit} title={'Edit todo item'} buttonTitle='Edit Item'
                handleClose={handleCloseDialog} handleSubmit={handleEditTodoItem} >
                <TextField label='Todo Item' fullWidth value={todo.todoItem} onChange={handleChange('todoItem')} />
            </Dialog>
            <AppbarNavbar name={'Todo List'} handleLogout={handleLogout} />
            {system.serviceStart ? <Loader /> : ''}
            <Grid container className={classes.root1}>
                <Grid item lg={4}>
                    <TextField
                        id='q'
                        label='Search'
                        fullWidth
                        onChange={handleSearch('q')}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </Grid>
                <Grid item lg={4} style={{ paddingLeft: 20 }}>
                    <TextField
                        id='q'
                        label='Filters'
                        select
                        fullWidth
                        onChange={handleSearch('filter')}
                        SelectProps={{
                            native: true,
                        }}
                        InputLabelProps={{
                            shrink: true
                        }}
                    >
                        {filters.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </TextField>
                </Grid>
                <Grid item lg={4} style={{ paddingLeft: 20 }}>
                    <Button variant='contained' color='primary' onClick={handleSubmitSearch}>
                        Search
                            </Button>
                </Grid>

                <Grid item lg={12} style={{ marginTop: 20 }}>
                    <div className={classes.todoList}>
                        {todos.map((item, index) => (
                            <Todo key={index} text={item.todoItem} updateTodo={() => handleOpenDialog('edit', true, item)}
                                deleteTodo={() => handleDeleteTodoItem(item)} completeTodo={() => handleEditTodoItem('complete', item)} isCompleted={item.isDone} />
                        ))}
                    </div>
                </Grid>
                <Grid container style={{ paddingTop: 20 }} >
                    <Button variant='contained' color='primary' onClick={() => handleOpenDialog('add', true)}>Add Todo Item</Button>
                </Grid>
            </Grid>
        </div >
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard))