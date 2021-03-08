import { Grid, TextField } from '@material-ui/core'
import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';
import Typography from '@material-ui/core/Typography';
import { Field, Formik } from 'formik';
import { closeSnackbar, loginAction } from '../../redux/actions/loginAction';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { protectRouted } from '../../services/protectRoute';

const useStyles = makeStyles({
    root: {
        margin:'20px 0',
        width:'50%'
    },
  });

const validationSchema = yup.object({
    email: yup
        .string()
        .email()
        .required('Email is required')
        .max(20),
    password: yup
        .string()
        .required('Password is required')
        .max(20),
})
function Login(props){
    const dispatch = useDispatch()
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    useEffect(() => {
        protectRouted().then(result => {
            props.history.push('/')
        }).catch(err => {
            return;
        })
    }, [])
    if(props.login.success){
        window.location.href = '/';
    }
    return(
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{flexDirection:"column", paddingTop:"20px"}}
        >
            <Typography><b>Login</b></Typography>
            <Card className={classes.root}>
                <Formik
                    initialValues={{ email: '', password:''}}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        dispatch(loginAction(values))
                    }}
                    validationSchema={validationSchema}
                    >
                    {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting}) => (
                        <form onSubmit={handleSubmit}>
                            {props.login.snackBarMessage ? setOpen(true) : ''}
                            <Collapse in={props.login.snackBarMessage}>
                                <Alert
                                color='error'
                                action={
                                    <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                        dispatch(closeSnackbar())
                                    }}
                                    >
                                    <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                >
                                {props.login.error}
                                </Alert>
                            </Collapse>
                            <CardContent>
                                <Field
                                    name='email'
                                    label='Email *'
                                    margin='normal'
                                    fullWidth={true}
                                    as={TextField}
                                    error={touched.email && errors.email}
                                    helperText={touched.email && errors.email}
                                />
                                <Field
                                    name='password'
                                    label='Password *'
                                    type='password'
                                    margin='normal'
                                    fullWidth={true}
                                    as={TextField}
                                    error={touched.password && errors.password}
                                    helperText={touched.password && errors.password}
                                />
                                
                            </CardContent>
                            <CardActions>
                                <Button type="submit" disabled={isSubmitting} size="small" color="primary">
                                Login
                                </Button>
                            </CardActions>
                        </form>
                    )}
                    </Formik>
            </Card>
        </Grid>
    )
}

const mapStateToProps = ({ login }) =>({
    login
});

export {Login};
export default connect(mapStateToProps, { loginAction, closeSnackbar})(Login);