import * as actionTypes from '../action/actionTypes'
import { updateObject } from '../utility'
import Swal from 'sweetalert2'
import { object } from 'prop-types'

let counter = 0
let coinCounter=0

const initialState = {
    value : "",
    denomination : [],
    coinsForPrinting : {},
    allArrays : [],
    coinsInSystem : {} 
}

const reset=(state,action)=>{

    window.location.reload(false)
}

const inputcoin=(state,action)=>{
    let coinsInSystem={...state.coinsInSystem}
    let coinsForPrinting={...state.coinsForPrinting}
    let isExist=false
    let denomination={...state.denomination}
  
    if(action.coin == undefined || action.coinNumber == undefined)
    {
        alert("ENTER VALUES")
    }
    else{
        Object.keys(coinsInSystem).forEach(coin=>{
            if(coin===action.coin){
                
                coinsInSystem[coin]=parseFloat(coinsInSystem[coin])+parseFloat(action.coinNumber)
                return isExist=true  
            }
            })
        if(isExist===false)
        { 
            denomination[counter]=action.coin
            coinsInSystem[denomination[counter]]=action.coinNumber
            counter ++
        console.log(denomination)
        console.log("coins",coinsInSystem)
    }}
    return(updateObject(state,{coinsInSystem: coinsInSystem,coinsForPrinting : coinsForPrinting ,denomination:denomination,coinCounter : coinCounter}))
}

const input=( state,action)=>{
    return(updateObject(state,{value : action.value}))
}

const random=(state, action,value)=>{   
    const randomValue=(Math.random()*1000).toFixed(1)
    console.log(parseInt(value))
    return(updateObject(state, {value:randomValue}))  
}

const calculate=(state, action)=>{

    let coinsInSystem={...state.coinsInSystem}
    let value = state.value
    let denomination = state.denomination
    let optAr = []
    let sum = 0
    let coinsForPrinting = {}
    Object.keys(coinsInSystem).forEach(value=>{
        sum=sum+(coinsInSystem[value]*value)
    })
    if(sum<value)
    {
    
        Swal.fire(
            
            'Machine do not have enough money!',
            'Enter more money'
          )
    }
    else{

    for(let i = 0;i<Object.keys(denomination).length;i++){
        let numbersOfCoin = (value/denomination[i])
        for(let j=0;j<numbersOfCoin && j<Object.values(coinsInSystem)[i] && j>-1  ;j++ )
        {
            optAr.push(denomination[i])
        }
        
    }
    coinsForPrinting= allPossibleCases(optAr,value);
    }
   
    return(updateObject(state,{coinsInSystem:coinsInSystem, coinsForPrinting:coinsForPrinting}))
}
const updateSystem=(state,action)=>{
   let a = action.coinValue
   var words = a.split(" ");
   let coinsInSystem = {...state.coinsInSystem}
   let aSystem = []
   let denomination = {...state.denomination}
   let coinsForPrinting = {...state.coinsForPrinting} 
   for(let i = 0;i < words.length;i++)
   {
        let res = parseFloat(words[i]);
        aSystem.push(res)
        coinsInSystem[res]-=1  
   }

   coinsForPrinting ={}
    console.log("niz",words)
    console.log("staro stanje",words.length)
    return(updateObject(state,{coinsInSystem : coinsInSystem,denomination : denomination,coinsForPrinting : coinsForPrinting,value : 0}))
}

    const allPossibleCases=(arr,value) =>{
        let coinsFromSystem = Object.values(arr)
        let allCoinsCombination = [];
        let numbersCoins = [];
        let temp= "";
        let sum = 0
        let letLen = Math.pow(2, coinsFromSystem.length);

        for (let i = 0; i < letLen ; i++){
            temp= "";
            sum = 0
            for (let j=0;j<coinsFromSystem.length;j++) {
                if ((i & Math.pow(2,j))){ 
                    temp += coinsFromSystem[j] + " "
                    sum += parseFloat(coinsFromSystem[j])  
                    if (sum == value) {
                        let element =temp.substring(0,temp.length-1)
                        allCoinsCombination.push(element);
                        numbersCoins.push(sum);
                        allCoinsCombination = [...new Set(allCoinsCombination)]
                        if(allCoinsCombination.length==5)
                        { 
                            console.log("all comb",allCoinsCombination);
                            return allCoinsCombination 
                        }
                     }
                }
            }
        }
        if(allCoinsCombination.length==0)
        {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your request can not be executed',
              })
        }
        
        console.log("all comb",allCoinsCombination);
        return allCoinsCombination  
  }

  const printingCoins=(coinsForPrinting) =>{
        for(let i=0;i<Object.keys(coinsForPrinting).length;i++)
        {
            for(let j=0;j<Object.values(coinsForPrinting)[i].length;j++)
            {
                
            }
            
        }
      
        return coinsForPrinting
  }

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.RANDOM : return random(state,action)
        case actionTypes.RESET : return reset(state,action)
        case actionTypes.INPUT : return input(state,action)
        case actionTypes.CALCULATE : return calculate(state,action)
        case actionTypes.INPUT_COIN : return inputcoin(state,action)
        case actionTypes.UPDATE_SYSTEM :return updateSystem(state,action)
        default: return state
    }
}
export default reducer
