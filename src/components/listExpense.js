import { Grid } from '@material-ui/core'

import React, { useEffect, useState } from 'react';
import { fetchCategory, fetchExpense } from '../services/promises'
import { DataGrid } from '@material-ui/data-grid';
import { findSuggestions } from '../services/categorySuggestions';

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'name', headerName: 'Category name', width: 300 },
  { field: 'createdAt', headerName: 'Date created', width: 300 },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 90,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
//   },
];



export default function ListExpense() {
    const [categories, setCategories] = useState([])
    const token = localStorage.getItem('etrackertoken'); 

    useEffect(() =>{
        handleCategories(token)
    }, [])

    const handleCategories = async () => {
        // fetchExpense(token).then(result => {
        //     // console.log(...result)
        //     setCategories(result);
        // })
        // .catch(err => {
        //     console.log(err)
        // })
        // const data = await findSuggestions(token)
        // console.log(data)
        // setCategories(data)
    }
    const rows = [
        { id: 1, name: 'Snow', date: 'Jon', /*age: 35*/ },
        { id: 2, name: 'Lannister', date: 'Cersei'/*, age: 42*/ },
        { id: 3, name: 'Lannister', date: 'Jaime'/*, age: 45*/ },
        { id: 4, name: 'Stark', date: 'Arya'/*, age: 16*/ },
        { id: 5, name: 'Targaryen', date: 'Daenerys'/*, age: null*/ },
        { id: 6, name: 'Melisandre', date: null, /*age: 150*/ },
        { id: 7, name: 'Clifford', date: 'Ferrara'/*, age: 44*/ },
        { id: 8, name: 'Frances', date: 'Rossini'/*, age: 36*/ },
        { id: 9, name: 'Roxie', date: 'Harvey'/*, age: 65*/ },
    ];

    // window.onload = function(){
    //     // setExecuted(true)
    //     handleCategories()
    // }
    console.log(categories)
  return (
    <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
    >
        <div style={{ height: 400, width: '90%'}}>
        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
        </div>

    </Grid>
  );
}
