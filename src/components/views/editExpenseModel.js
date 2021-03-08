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
import { useDispatch } from 'react-redux';
import { createExpenseAction } from '../../redux/actions/createExpenseAction';
import { closeSnackbar, updateExpenseAction } from '../../redux/actions/updateExpenseAction';
import { getExpenses } from '../../redux/actions/fetchExpenseAction';

const token = localStorage.getItem('etrackertoken'); 
const useStyles = makeStyles({
    root: {
        margin:'20px 20px',
        // maxWidth: 345,
        // width:'50%'
    },
  });
const validationSchema = yup.object({
    name: yup
        .string()
        .required('Name is required')
        .max(20),
})


export function UpdateExpense({ initialValues, categoryData, createExpense, updateExpense }){
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
        dispatch(closeSnackbar())
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
            <Typography><b>{!initialValues ? 'Create Expense' : 'Update Expense'}</b></Typography>
            <Card className={classes.root}>
                <Formik
                    initialValues={ initialValues ? initialValues : {name:'', amount:'', number:'', categoryId:categoryData.id} }
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        if(initialValues){
                            const {id, categoryId, updatedAt, createdAt, ...dataSet} = {...values}
                            const toBeUpdated = {...dataSet}
                            dispatch(updateExpenseAction( initialValues.id,toBeUpdated))
                            setTimeout(function(){
                                dispatch(getExpenses(categoryData.id))
                            }, 2000)
                        }else{
                            dispatch(createExpenseAction(values))
                            setTimeout(function(){
                                dispatch(getExpenses(values.categoryId))
                              }, 1000)
                            resetForm()
                        }
                    }}
                    validationSchema={validationSchema}
                    >
                    {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting}) => (
                        <form onSubmit={handleSubmit}>
                            <Snackbar open={updateExpense.snackbarError || createExpense.snackbarError} autoHideDuration={6000} onClose={handleClose} >
                                <Alert onClose={handleClose} severity="error" >
                                Error: {updateExpense.error || createExpense.error ? JSON.stringify(updateExpense.error || createExpense.error).replace(/[\\'"]+/g, '') : 'Error Not set'}
                                </Alert>
                            </Snackbar>
                            <Snackbar open={updateExpense.snackbarMessage || createExpense.snackbarMessage} autoHideDuration={6000} onClose={handleClose} >
                                <Alert onClose={handleClose} severity="success" >
                                Success: {updateExpense.message || createExpense.message ? JSON.stringify(updateExpense.message || createExpense.message).replace(/[\\'"]+/g, '') : 'message Not set'}
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
                            </CardContent>
                            <CardActions>
                                <Button type="submit" disabled={isSubmitting} size="small" color="primary">
                                {!initialValues ? 'Create' : 'Update'}
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
