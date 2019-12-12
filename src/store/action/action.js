import * as actionTypes from './actionTypes'

export const random = (value) =>({
    type : actionTypes.RANDOM,
    value
})

export const calculate = (value) =>({
    type : actionTypes.CALCULATE,
    value
})

export const reset = (value) =>({
    type : actionTypes.RESET,
    value
})

export const input = (value) =>({
    type : actionTypes.INPUT,
    value
})
export const inputcoin = (coin,coinNumber) =>({
    type : actionTypes.INPUT_COIN,
    coin:coin,
    coinNumber:coinNumber
    
})

export const updateSystem = (coinValue) =>({
    type : actionTypes.UPDATE_SYSTEM,
    coinValue : coinValue
})
