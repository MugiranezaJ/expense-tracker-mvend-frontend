import { Box, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getAllExpenses } from '../../redux/actions/fetchAllExpensesAction';
import { getCategories } from '../../redux/actions/fetchCategoriesAction';

function Landing(props){
    useEffect(() => {
        props.getCategories()
        props.getAllExpenses()
    }, [])
    const categoriesLen = props.categoriesData.categories.length
    const expensesLen = props.expensesData.total
    return(
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{minHeight:"500px"}}
        
        >
            <Box display="flex">
                <Box padding="15px">
                    <h4>Categories</h4>
                    <Box textAlign="center">{categoriesLen}</Box>
                </Box>
                <Box padding="15px">
                    <h4>Expenses</h4>
                    <Box textAlign="center">{expensesLen}</Box>
                </Box>
            </Box>
        </Grid>
    )
}

const mapStateToProps = state =>({
    categoriesData: state.fetchCategories,
    expensesData: state.fetchAllExpenses
});
export {Landing};
export default connect(mapStateToProps, { getCategories, getAllExpenses })(Landing);