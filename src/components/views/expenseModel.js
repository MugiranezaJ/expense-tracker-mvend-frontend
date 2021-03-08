import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { DataGrid } from "@material-ui/data-grid";
import { Box, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { deleteExpenseAction } from '../../redux/actions/deleteAction';
import { UpdateExpense } from '../views/editExpenseModel';
import { getExpenses } from '../../redux/actions/fetchExpenseAction'
import { Add } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';

 const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      width:'80%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export function ExpenseModel({ data, open, openModal, handleSnackbarClose, handleClose, deleteExpense, createExpense, fetchExpense, expensesData, updateExpense }){
    const classes = useStyles();
    const [editOpen, setEditOpen] = useState(false)
    const [addOpen, setAddOpen] = useState(false)
    const [editData, setEditData] = useState();
    const dispatch = useDispatch()
    const dataSet = data ? data.id : ''

    useEffect(() =>{
        handleExpense(dataSet)
    }, [])

    const handleExpense = async (dataSet) => {
        dispatch(getExpenses(dataSet))
    }
    const handleCloseEdit = () => {
        setEditOpen(false);
        setAddOpen(false)
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props}  itemID='alert' />;
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'number', headerName: 'Number', width: 70 },
        { field: 'amount', headerName: 'Amount', width: 100 },
        { field: 'createdAt', headerName: 'Date created', width: 150 },
        {
          field: 'edit',
          headerName: 'Edit',
          width: 100,
          renderCell: (params) => (
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={()=> {
                setEditData(params.row)
                setEditOpen(true)
              }}
            >
              Edit
            </Button>
        )},
        {
          field: 'delete',
          headerName: 'Delete',
          width: 100,
          renderCell: (params) => (
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={()=> {
                dispatch(deleteExpenseAction(params.row.id))
                setTimeout(function(){
                  dispatch(getExpenses(data.id))
                }, 1000)
                
              }}
            >
              Delete
            </Button>
        )}
    ]
    const EditModel = (
      <Modal
              disablePortal
              disableEnforceFocus
              disableAutoFocus
              open={editOpen}
              onClose={handleCloseEdit}
              aria-labelledby="server-modal-title"
              aria-describedby="server-modal-description"
              onRendered={() => {
                console.log("dataSet")
                // handleExpense(data ? data.id : '')
              }}
              >
                <div style={{width:"400px", height:"cover", margin:'200px auto', backgroundColor:'#e9ecef'}} className={classes.modal}>
                  <UpdateExpense initialValues={editData} categoryData={data} updateExpense={updateExpense} createExpense={createExpense}/>
                </div>
              </Modal>
    )
    const AddModel = (
      <Modal
              disablePortal
              disableEnforceFocus
              disableAutoFocus
              open={addOpen}
              onClose={handleCloseEdit}
              aria-labelledby="server-modal-title"
              aria-describedby="server-modal-description"
              onRendered={() => {
                console.log("dataSet")
              }}
              >
                <div style={{width:"400px", height:"cover", margin:'200px auto', backgroundColor:'#e9ecef'}} className={classes.modal}>
                  <UpdateExpense categoryData={data} createExpense={createExpense} updateExpense={updateExpense}/>
                </div>
              </Modal>
    )
    const SkeletonBody = (
      <div style={{margin: '20px 0'}}>
        <Skeleton width='100%' height='30px'/> 
        <Skeleton width='100%' height='30px'/> 
        <Skeleton width='100%' height='30px'/> 
        <Skeleton width='100%' height='30px'/> 
        <Skeleton width='100%' height='30px'/> 
        <Skeleton width='100%' height='30px'/> 
      </div>
    )
    return(
      <>
        <Modal
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            open={openModal}
            onClose={handleClose}
            aria-labelledby="server-modal-title"
            aria-describedby="server-modal-description"
            className={classes.modal}
            onRendered={() => {
              handleExpense(data ? data.id : '')
            }}
            >
            
            <div className={classes.paper}>
            <Snackbar open={deleteExpense.snackbarError} autoHideDuration={6000} onClose={handleSnackbarClose} >
                <Alert onClose={handleSnackbarClose} severity="error" >
                Error: {deleteExpense.error ? JSON.stringify(deleteExpense.error).replace(/[\\'"]+/g, '') : 'Error Not set'}
                </Alert>
            </Snackbar>
            <Snackbar open={deleteExpense.snackBarMessage} autoHideDuration={6000} onClose={handleSnackbarClose} >
                <Alert onClose={handleSnackbarClose} severity="success" >
                Success: {deleteExpense.message ? JSON.stringify(deleteExpense.message).replace(/[\\'"]+/g, '') : 'message Not set'}
                </Alert>
            </Snackbar>
                <h2 id="server-modal-title">{data ? data.name : 'no data'}{`>>`} Expenses</h2>
                <Box overflow='auto'>
                  <Button 
                  style={{float:'right', margin:'5px'}}
                    onClick={() =>{
                      setAddOpen(true) 
                    }}
                  >
                    <Add/>
                    Add
                  </Button>
                </Box>
                
                <div style={{ height: 400}}>
                  {console.log(expensesData.pending)}
                  {expensesData.pending
                    ? SkeletonBody
                    :<DataGrid rows={expensesData.expenses ? expensesData.expenses : ''} columns={columns} pageSize={5} checkboxSelection />
                    }
                </div>
            </div>
        </Modal>
        {EditModel}
        {AddModel}
        </>
    )
}
