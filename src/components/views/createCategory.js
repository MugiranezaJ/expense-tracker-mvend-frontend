import { Grid, TextField } from '@material-ui/core'
import React, { useState } from 'react'
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
import { closeCategorySnackbar, createCategoryAction } from '../../redux/actions/createCategoryAction'
import { connect, useDispatch } from 'react-redux';

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

function CreateCategory(props){
    const [data, setData] = useState('');
    const [error,setError] = useState('');
    const [errorOpen, seterrorOpen] = useState(false);
    const [successOpen,setsuccessOpen] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    const token = localStorage.getItem('etrackertoken'); 
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    

    const handleClose = () => {
        dispatch(closeCategorySnackbar())
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
                        dispatch(createCategoryAction(values))
                        resetForm()
                    }}
                    validationSchema={validationSchema}
                    >
                    {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting}) => (
                        <form onSubmit={handleSubmit}>
                            <Snackbar open={props.createCategory.snackbarError} autoHideDuration={6000} onClose={handleClose} >
                                <Alert onClose={handleClose} severity="error" >
                                Error: {props.createCategory.error ? JSON.stringify(props.createCategory.error).replace(/[\\'"]+/g, '') : 'Error Not set'}
                                </Alert>
                            </Snackbar>
                            <Snackbar open={props.createCategory.snackbarMessage} autoHideDuration={6000} onClose={handleClose} >
                                <Alert onClose={handleClose} severity="success" >
                                Success: {props.createCategory.message ? JSON.stringify(props.createCategory.message).replace(/[\\'"]+/g, '') : 'message Not set'}
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

const mapStateToProps = state => ({
    createCategory: state.createCategory
  })
  
  export default connect(mapStateToProps, { createCategoryAction })(CreateCategory)