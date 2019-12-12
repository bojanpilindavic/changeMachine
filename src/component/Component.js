import React from 'react';
import {connect} from 'react-redux'
import {random,calculate,reset,input,inputcoin, updateSystem} from '../store/action/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Image, Container,ButtonGroup,ListGroup,ListGroupItem,Images,Form,Row,Col,Carousel, Navbar} from 'react-bootstrap';
import styled from 'styled-components'
import Swal from 'sweetalert2'

let coin,coinNumber,coinValue

const StyledButton = styled(Button)`
    margin: 5px;
    color :#ca9d16
`
const StyledListGroup = styled(ListGroup)`
    width: 100%;
`


const StyledCarousel = styled(Carousel)`
padding: 10px;

`
const Label = styled.label`
color : #ca9d16;

`
class Prv extends React.Component{
    
     render(){
            return <Container> 
                <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Change Machine</Navbar.Brand>
                <button class="btn btn-outline-success my-2 my-sm-0" type="button" 
                >Help</button>
                </Navbar>
                <StyledCarousel>
                    <Carousel.Item>
                        <img
                        
                        className="rounded"
                        align ="center"
                        src={require("../Images/backround.jpg")}
                        />
                        <Carousel.Caption>
                        <h3>Change Machine</h3>
                        <p>Fast and easy exchange your money</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="rounded"
                        src={require("../Images/slide2.png")}
                        class="center-block"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="rounded"
                        src={require("../Images/slide3.jpg")}
                        />
                    </Carousel.Item>
                </StyledCarousel>
                <Form className="mt-5 mb-5">
                    <Label>Coin value:</Label>
                    <input id="coin" placeholder="Enter coin value"  min="0.1" type="number" step=".1" 
                    onChange={e=>{e.preventDefault()
                        coin=e.target.value
                            }}>
                    </input>
                    <Label >Number of coin :</Label>
                    
                    <input id="numberCoin" placeholder="Enter numbers of coins "   type="number" min="1" step="1" onChange={
                        e=>{e.preventDefault()
                        coinNumber=e.target.value
                    }}></input><br/>
                    
                    <StyledButton  type="button" onClick={()=>{this.props.Inputcoin(coin,coinNumber)}}>ADD COIN</StyledButton >
                    <StyledListGroup horizontal>
                        {Object.values(this.props.denomination).map(coin=>
                            <ListGroup.Item key={coin} variant="dark"> Number of coins {coin}: {this.props.coinsInSystem[coin]} </ListGroup.Item>)}
               </StyledListGroup>
                </Form>
                <Form  >
                    <input type="number"  placeholder="Amount" min="0" max="50000" step=".1" value={this.props.value} onChange={e=>
                        {e.preventDefault()
                        this.props.Input(e.target.value)}}></input><br/>           
                    <ButtonGroup class="list-group list-group-flush">  
                        <StyledButton type ="button"  onClick={this.props.Calculate}>
                        Calculate</StyledButton>
                        <StyledButton type ="button" onClick={this.props.Random}>Random</StyledButton>
                        <StyledButton type = "button" onClick={this.props.Reset}>Reset</StyledButton>
                    </ButtonGroup>  
                    <ListGroup>
                        {Object.values(this.props.coinsForPrinting).map(coin =>
                            <StyledButton type = "button"  class="btn btn-secondary btn-lg btn-block" variant = "dark"  align="center" onClick={
                                ()=>{
                                    Swal.fire(
                                        'Good job!',
                                        'You have selected a combination :'+ coin,
                                        'success'
                                      )
                                    
                                coinValue=coin
                                this.props.UpdateSystem(coinValue) 
                                }}>{coin}</StyledButton>
                            )}
                    </ListGroup>  
                    </Form>
            </Container>
    } 
}
 
const mapStateToProps = state =>{
    return{
        value:state.reducer.value,
        coinsInSystem : state.reducer.coinsInSystem,
        denomination:state.reducer.denomination,
        coinsForPrinting:state.reducer.coinsForPrinting
    }
}

const mapDispatchToProps = dispatch => {
    return {
        Calculate:(value ) =>dispatch(calculate(value)),
        Random: (value) => dispatch(random(value)),
        Reset:(value) => dispatch(reset(value)),
        Input:(value) => dispatch(input(value)),
        Inputcoin:(coin,coinNumber) => dispatch(inputcoin(coin,coinNumber)),
        UpdateSystem:(coinValue) => dispatch(updateSystem(coinValue))


    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Prv)