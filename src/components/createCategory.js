import { Grid, TextField } from '@material-ui/core'
import React, { useState } from 'react'
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

export function CreateCategory(){
    const [data, setData] = useState('');
    const [error,setError] = useState('');
    const [errorOpen, seterrorOpen] = useState(false);
    const [successOpen,setsuccessOpen] = useState(false);
    const classes = useStyles();
    const token = localStorage.getItem('etrackertoken'); 
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    

    const handleClose = () => {
        seterrorOpen(false)
        setsuccessOpen(false)
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
            <Typography><b>Create Category</b></Typography>
            <Card className={classes.root}>
                <Formik
                    initialValues={{ name: ''}}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        axios.post('http://127.0.0.1:4000/expense/category/', values, config)
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
                                Error: {error ? JSON.stringify(error.message).replace(/[\\'"]+/g, '') : 'Error Not set'}
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
