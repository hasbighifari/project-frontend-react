import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Edit from '@material-ui/icons/EditOutlined'
import Delete from '@material-ui/icons/DeleteOutlined'
import Grid from '@material-ui/core/Grid'
import styles from './styles'
import Tooltip from '@material-ui/core/Tooltip'

const Todo = ({ ...props }) => {
    const { classes } = props
    return (
        <div className={classes.todo} style={{ textDecoration: props.isCompleted ? "line-through" : "" }}>
            {props.text}
            <Grid>
                <Tooltip title='change todo completed'>
                    <Button onClick={props.completeTodo}>Complete</Button>
                </Tooltip>
                <Tooltip title='delete todo'>
                    <Button onClick={props.deleteTodo}><Delete /></Button>
                </Tooltip>
                <Tooltip title='update todo'>
                    <Button onClick={props.updateTodo}><Edit /></Button>
                </Tooltip>
            </Grid>
        </div>
    );
};
export default withStyles(styles)(Todo)
