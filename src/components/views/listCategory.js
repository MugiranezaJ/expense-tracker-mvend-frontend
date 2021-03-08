import { Button, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { DataGrid } from "@material-ui/data-grid";
import { ExpenseModel } from './expenseModel';
import { getCategories } from '../../redux/actions/fetchCategoriesAction';
import { closeSnackbar, deleteCategoryAction, deleteExpenseAction } from '../../redux/actions/deleteAction';
import { createExpenseAction } from '../../redux/actions/createExpenseAction';
import { closeExpenseModel } from '../../redux/actions/fetchExpenseAction';
import { Skeleton } from '@material-ui/lab';


function ListCategory(props) {
    const token = localStorage.getItem('etrackertoken'); 
    const [data, setData] = useState();
    const [open, setOpen] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const dispatch = useDispatch();

    useEffect(() =>{
        handleCategories(token)
    }, [])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenModal(false)
        setData('');
        dispatch(closeExpenseModel())
        dispatch(closeSnackbar())
    };
    const handleSnackbarClose = () => {
      dispatch(closeSnackbar())
      setOpen(false);
  };

    const handleCategories = async () => {
        dispatch(getCategories())
    }
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props}  itemID='alert' />;
  }
    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'name', headerName: 'Category name', width: 150 },
        { field: 'total_amount', headerName: '(Frw) Total amount', width: 150 },
        { field: 'createdAt', headerName: 'Date created', width: 200 },
        {
          field: 'expense',
          headerName: 'Expense',
          width: 150,
          renderCell: (params) => (
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={()=> {
                setData(params.row)
                setOpenModal(true)
              }}
            >
              Expense
            </Button>
        )},
        {
          field: 'delete',
          headerName: 'Delete',
          width: 150,
          renderCell: (params) => (
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={()=> {
                dispatch(deleteCategoryAction(params.row.id))
                dispatch(getCategories())
                
              }}
            >
              Delete
            </Button>
        )}
    ]
  const SkeletonBody = (
      <div style={{margin: '20px 0'}}>
        <Skeleton animation="wave" width='100%' height='30px'/> 
        <Skeleton animation="wave" width='100%' height='30px'/> 
        <Skeleton animation="wave" width='100%' height='30px'/> 
        <Skeleton animation="wave" width='100%' height='30px'/> 
        <Skeleton animation="wave" width='100%' height='30px'/> 
        <Skeleton animation="wave" width='100%' height='30px'/> 
      </div>
    )
    {console.log(props.categoryState.pending)}
  return (
    <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
    >
      
        <div style={{ height: 400, width: '90%'}}>
          
          {
            props.categoryState.pending
            ? SkeletonBody
            : <DataGrid rows={props.categoryState.categories} columns={columns} pageSize={5} checkboxSelection />
          }
          <Snackbar open={props.deleteCategory.snackBarError} autoHideDuration={6000} onClose={handleClose} >
              <Alert onClose={handleClose} severity="error" >
              Error: {JSON.stringify(props.deleteCategory.error).replace(/[\\'"]+/g, '')}
              </Alert>
          </Snackbar>
          <Snackbar open={props.deleteCategory.snackBarMessage} autoHideDuration={6000} onClose={handleClose} >
              <Alert onClose={handleClose} severity="success" >
              Success: {JSON.stringify(props.deleteCategory.message).replace(/[\\'"]+/g, '')}
              </Alert>
          </Snackbar>
        </div>
        {data ? <ExpenseModel data={data} open={open} openModal={openModal} handleClose={handleClose} handleSnackbarClose={handleSnackbarClose} deleteExpense={props.deleteExpense} createExpense={props.createExpense} expensesData={props.expenseState} updateExpense={props.updateExpense}/> : ''}
    </Grid>
  );
};
const mapStateToProps = state => ({
  categoryState: state.fetchCategories,
  expenseState: state.fetchExpenses,
  protectionState: state.protection,
  deleteExpense: state.deleteExpense,
  deleteCategory: state.deleteCategory,
  createExpense: state.createExpense,
  updateExpense: state.updateExpense,
})

export default connect(mapStateToProps, { getCategories, deleteExpenseAction, deleteCategoryAction, createExpenseAction})(ListCategory)