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
import { findSuggestions } from '../services/categorySuggestions';

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


export function CreateExpense(){
    const [data, setData] = useState('');
    const [error,setError] = useState('');
    const [errorOpen, seterrorOpen] = useState(false);
    const [successOpen,setsuccessOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [executed, setExecuted] = useState(false);
    const classes = useStyles();
    
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    useEffect(() => {
        handleSuggestions()
      }, []);

    const handleSuggestions = async (value) => {
        // const dataSet = await findSuggestions(token)
        // console.log("QQ: " + dataSet)
        // setSuggestions(dataSet)
        axios.get('http://127.0.0.1:4000/expense/category/', config)
        .then(result => {
            console.log("___________REQUEST___________")
            console.log(result.data)
            // let data = result.data;
            setSuggestions(result.data)
        })
        // axios.get(`${process.env.REACT_APP_BACKEND_LINK}/search/locations/all`)
        // .then(res => {
        //     setSuggestions(res.data.locations.rows)
        // })
    }
    // window.onload = async function(){
    //     if(!executed){
    //         const dataSet = await findSuggestions(token)
    //         console.log("ooooooooooooooooo")
    //         console.log(dataSet)
    //         setExecuted(true)
    //         setSuggestions(...dataSet)
    //     }
    //   }

    window.onload = function(){
        setExecuted(true)
        handleSuggestions()
    }
    
    const handleClose = () => {
        seterrorOpen(false)
        setsuccessOpen(false)
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
    console.log(suggestions)
    console.log("-------------------------------s")
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
                    initialValues={{ name: '', amount:'', number:'', categoryId:''}}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        axios.post('http://127.0.0.1:4000/expense/', values, config)
                        .then(result => {
                            setData(result.data);
                            setError('')
                            setsuccessOpen(true);
                            resetForm();
                        })
                        .catch(err => {
                            console.log("___________REQUEST_ERROR___________")
                            console.log(err.response.data)
                            setError(err.response.data);
                            seterrorOpen(true);
                        })
                    }}
                    validationSchema={validationSchema}
                    >
                    {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting}) => (
                        <form onSubmit={handleSubmit}>
                            <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose} >
                                <Alert onClose={handleClose} severity="error" >
                                Error: {error ? JSON.stringify(error.error).replace(/[\\'"]+/g, '') : 'Error Not set'}
                                </Alert>
                            </Snackbar>
                            <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleClose} >
                                <Alert onClose={handleClose} severity="success" >
                                Success: {data ? JSON.stringify(data.message).replace(/[\\'"]+/g, '') : 'message Not set'}
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
                                    onClose={handleCloseSelect}
                                    onOpen={handleOpenSelect}
                                    // value={age}
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
