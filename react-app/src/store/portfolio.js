//ACTIONS
const GET_USER_PORTFOLIO = 'portfolio/GET_USER_PORTFOLIO'


//ACTION CREATORS

const actionGetUserPortfolio = (portfolio) => ({
    type: GET_USER_PORTFOLIO,
    portfolio
})


//THUNKS

// Get Portfolio of Current User
export const getUserPortfolio = () => async (dispatch) => {
    const response = await fetch(`/api/portfolio/`)

    if (response.ok) {
        const portfolio = await response.json()
        await dispatch(actionGetUserPortfolio(portfolio))
        return portfolio
    }
}


const initialState = {
    // historicalValues: [],
    // holdings: {},
    portfolio: {}
}



// REDUCER
export default function portfolioReducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_USER_PORTFOLIO: {
        newState.id = action.portfolio.id;
        newState.balance = action.portfolio.balance;
        return newState;
      }
      default:
        return state;
    }
}