import { Grid, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';
import Typography from '@material-ui/core/Typography';
import { Field, Formik } from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect, useDispatch } from 'react-redux';
import { closeExpenseSnackbar, createExpenseAction } from '../../redux/actions/createExpenseAction';

const token = localStorage.getItem('etrackertoken'); 
const useStyles = makeStyles({
    root: {
        margin:'20px 0',
        // maxWidth: 345,
        width:'50%'
    },
  });
const validationSchema = yup.object({
    name: yup
        .string()
        .required('Name is required')
        .max(20),
})


function CreateExpense(props){
    const [data, setData] = useState('');
    const [error,setError] = useState('');
    const [errorOpen, seterrorOpen] = useState(false);
    const [successOpen,setsuccessOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [executed, setExecuted] = useState(false);
    const dispatch = useDispatch()
    const classes = useStyles();
    
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    useEffect(() => {
        handleSuggestions()
      }, []);

    const handleSuggestions = async (value) => {
        axios.get('http://127.0.0.1:4000/expense/category/', config)
        .then(result => {
            setSuggestions(result.data)
        })
    }

    window.onload = function(){
        setExecuted(true)
        handleSuggestions()
    }
    
    const handleClose = () => {
        dispatch(closeExpenseSnackbar())
    };
    const handleCloseSelect = () => {
        setOpen(false);
    };

    const handleOpenSelect = () => {
        setOpen(true);
    };
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props}  itemID='alert' />;
    }
    return(
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{flexDirection:"column", paddingTop:"20px"}}
        >
            <Typography><b>Create Espense</b></Typography>
            <Card className={classes.root}>
                <Formik
                    initialValues={props.initialValues? props.initialValues : { name: '', amount:'', number:'', categoryId:''}}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        dispatch(createExpenseAction(values))
                        resetForm()
                    }}
                    validationSchema={validationSchema}
                    >
                    {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting}) => (
                        <form onSubmit={handleSubmit}>
                            <Snackbar open={props.createExpense.snackbarError} autoHideDuration={6000} onClose={handleClose} >
                                <Alert onClose={handleClose} severity="error" >
                                Error: {props.createExpense.error ? JSON.stringify(props.createExpense.error).replace(/[\\'"]+/g, '') : 'Error Not set'}
                                </Alert>
                            </Snackbar>
                            <Snackbar open={props.createExpense.snackbarMessage} autoHideDuration={6000} onClose={handleClose} >
                                <Alert onClose={handleClose} severity="success" >
                                Success: {props.createExpense.message ? JSON.stringify(props.createExpense.message).replace(/[\\'"]+/g, '') : 'message Not set'}
                                </Alert>
                            </Snackbar>
                            <CardContent>
                                <Field
                                    name='name'
                                    label='Name *'
                                    margin='normal'
                                    fullWidth={true}
                                    as={TextField}
                                    error={touched.name && errors.name}
                                    helperText={touched.name && errors.name}
                                />
                                <Field
                                    name='amount'
                                    label='Amount *'
                                    margin='normal'
                                    fullWidth={true}
                                    as={TextField}
                                    error={touched.amount && errors.amount}
                                    helperText={touched.amount && errors.amount}
                                />
                                <Field
                                    name='number'
                                    label='Number *'
                                    margin='normal'
                                    fullWidth={true}
                                    as={TextField}
                                    error={touched.number && errors.number}
                                    helperText={touched.number && errors.number}
                                />
                                <FormControl className={classes.formControl} fullWidth={true}>
                                    <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
                                    <Select
                                    name='categoryId'
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={open}
                                    defaultValue='xd'
                                    onClose={handleCloseSelect}
                                    onOpen={handleOpenSelect}
                                    onChange={handleChange}
                                    >
                                    <MenuItem disabled={true} value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        suggestions.map(item => (
                                            <MenuItem value={item.category.id}>{item.category.name}</MenuItem>
                                        ))
                                    }
                                    </Select>
                                </FormControl>
                            </CardContent>
                            <CardActions>
                                <Button type="submit" disabled={isSubmitting} size="small" color="primary">
                                Create
                                </Button>
                                {successOpen}
                            </CardActions>
                        </form>
                    )}
                    </Formik>
            </Card>
        </Grid>
    )
}

const mapStateToProps = state => ({
    createExpense: state.createExpense
  })
  
  export default connect(mapStateToProps, { createExpenseAction })(CreateExpense)