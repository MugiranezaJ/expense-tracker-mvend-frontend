import React, { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Grid } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import { getAllExpenses } from '../../redux/actions/fetchAllExpensesAction';


function ListExpense( props ) {
    const dispatch = useDispatch();
    useEffect(() =>{
        handleExpenses()
    }, [])

    const handleExpenses = async () => {
      dispatch(getAllExpenses())
    }
    const columns = [
      { field: 'id', headerName: 'ID', width: 150 },
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'number', headerName: 'Number', width: 100 },
      { field: 'amount', headerName: 'Amount', width: 150 },
      { field: 'categoryId', headerName: 'Category', width: 150 },
      { field: 'createdAt', headerName: 'Date created', width: 250 },
      // {
      //   field: 'edit',
      //   headerName: 'Edit',
      //   width: 150,
      //   renderCell: (params) => (
      //     <Button
      //       variant="contained"
      //       color="primary"
      //       size="small"
      //       style={{ marginLeft: 16 }}
      //       onClick={()=> {
      //         // setEditData(params.row)
      //         // setEditOpen(true)
      //       }}
      //     >
      //       Edit
      //     </Button>
      // )},
      // {
      //   field: 'delete',
      //   headerName: 'Delete',
      //   width: 150,
      //   renderCell: (params) => (
      //     <Button
      //       variant="contained"
      //       color="primary"
      //       size="small"
      //       style={{ marginLeft: 16 }}
      //       onClick={()=> {
      //         // dispatch(deleteExpenseAction(params.row.id))
      //       }}
      //     >
      //       Delete
      //     </Button>
      // )}
    ]

  return (
    <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
    >
        <div style={{ height: 400, width: '90%'}}>
        <DataGrid rows={props.expenseState.expenses} columns={columns} pageSize={5} checkboxSelection />
        </div>
    </Grid>
  );
}

const mapStateToProps = ({fetchExpenses}) => ({
expenseState: fetchExpenses
})

export default connect(mapStateToProps, { getAllExpenses })(ListExpense)