import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { fetchExpense } from '../services/promises';
import {
    DataGrid,
    ColDef,
    ValueGetterParams,
    CellParams,
    GridApi
  } from "@material-ui/data-grid";
import { Button } from '@material-ui/core';

 const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export function ExpenseModel({data, open, handleClose}){
    const classes = useStyles();
    const [expenses, setExpenses] = useState([])
    const [expenseError, setExpenseError] = useState();
    const token = localStorage.getItem('etrackertoken'); 
    const dataSet = data ? data.id : ''

    // useEffect(() =>{
    //     handleExpense()
    // }, [])
    console.log(dataSet)

    const handleExpense = async () => {
        
        fetchExpense(token, dataSet)
        .then(result => {
            console.log(result)
            setExpenses(result);
        })
        .catch(err => {
            setExpenseError(err.data.message)
            console.log(err.data)
        })
    }

    const columns: ColDef[] = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'number', headerName: 'Number', width: 50 },
        { field: 'amount', headerName: 'Amount', width: 100 },
        { field: 'createdAt', headerName: 'Date created', width: 250 },
        {
          field: "",
          headerName: "Button",
          sortable: false,
          width: 100,
          disableClickEventBubbling: true,
          renderCell: (params: CellParams) => {
            const onClick = () => {
              const api: GridApi = params.api;
              const fields = api
                .getAllColumns()
                .map((c) => c.field)
                .filter((c) => c !== "__check__" && !!c);
              const thisRow = {};
      
              fields.forEach((f) => {
                thisRow[f] = params.getValue(f);
              });
              setExpenses(thisRow)
            //   setOpen(true)
            //   console.log(thisRow)
            //   return alert(JSON.stringify(thisRow, null, 4));
            };
      
            return <Button onClick={onClick}>Click</Button>;
          }
        }
    ]
    // data ? handleExpense() : ''
    return(
        <Modal
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            open={open}
            onClose={handleClose}
            aria-labelledby="server-modal-title"
            aria-describedby="server-modal-description"
            className={classes.modal}
            onRendered={handleExpense}
            // container={() => rootRef.current}
            >
            <div className={classes.paper}>
                {/* {handleExpense()} */}
                <h2 id="server-modal-title">{JSON.stringify(data ? data.name : 'no data')}{`>>`} Expenses</h2>
                <p id="server-modal-description">If you disable JavaScript, you will still see me.---+++</p>
                {JSON.stringify(data)}
                {/* {JSON.stringify(expenses.length ? expenses : expenseError)} */}
                {/* {JSON.stringify(expenseError)} */}
                <div style={{ height: 400, width: '90%'}}>
                    <DataGrid rows={expenses} columns={columns} pageSize={5} checkboxSelection />
                </div>
            </div>
        </Modal>
    )
}