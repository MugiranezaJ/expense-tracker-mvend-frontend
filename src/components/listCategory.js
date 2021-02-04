import { Button, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { fetchCategory } from '../services/promises'
// import { DataGrid } from '@material-ui/data-grid';
import { findSuggestions } from '../services/categorySuggestions';
import {
    DataGrid,
    ColDef,
    ValueGetterParams,
    CellParams,
    GridApi
  } from "@material-ui/data-grid";
import { ExpenseModel } from './expenseModel';

 
// const columns = [
//   { field: 'id', headerName: 'ID', width: 150 },
//   { field: 'name', headerName: 'Category name', width: 300 },
//   { field: 'createdAt', headerName: 'Date created', width: 300 },
// ];


export default function ListCategory() {
    const [categories, setCategories] = useState([])
    const token = localStorage.getItem('etrackertoken'); 
    const [data, setData] = useState();
    const [open, setOpen] = React.useState(false);

    useEffect(() =>{
        handleCategories(token)
    }, [])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCategories = async () => {
        fetchCategory(token).then(result => {
            setCategories(result);
        })
        .catch(err => {
            console.log(err)
        })
    }

    const columns: ColDef[] = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'name', headerName: 'Category name', width: 300 },
        { field: 'createdAt', headerName: 'Date created', width: 300 },
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
              setData(thisRow)
              setOpen(true)
            //   console.log(thisRow)
            //   return alert(JSON.stringify(thisRow, null, 4));
            };
      
            return <Button onClick={onClick}>Click</Button>;
          }
        }
    ]
  return (
    <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
    >
        <div style={{ height: 400, width: '90%'}}>
        <DataGrid rows={categories} columns={columns} pageSize={5} checkboxSelection />
        </div>
        <ExpenseModel data={data} open={open} handleClose={handleClose}/>
    </Grid>
  );
}
