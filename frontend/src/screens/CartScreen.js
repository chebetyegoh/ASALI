import React, {useEffect} from 'react'
import { Link, useNavigate, useParams, useLocation, useSearchParams, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Button, Image, Form, Card } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'


function CartScreen() {
    const { id } = useParams();
    const { search } = useLocation();
    const [searchParms] = useSearchParams();
    const navigate = useNavigate();


    const productId = id
    const qty = search ? Number(search.split('=')[1]) : 1;

    //console.log('qty:', qty)

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    //console.log('cartItems:', cartItems)

    useEffect(() =>{
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () =>{
        navigate('/login?redirect=shipping')
    }



    return (
        <div>
            <Row>
                <Col md={8}>
                    <h1>Shopping Basket</h1>
                    {cartItems.length === 0 ? (
                        <Message variant='info'>
                            Your basket is empty <Link to='/'>Go Back</Link>
                        </Message>
                    ): (
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>
                                            KSH.{item.price}
                                        </Col>

                                        <Col md={3}>
                                            <Form.Control 
                                            as="select" 
                                            value={item.qty} 
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                            >
                                                {
                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Control>
                                        </Col>
                                        <Col md={1}>
                                                <Button 
                                                    type='button'
                                                    variant ='light'
                                                    onClick={() => removeFromCartHandler(item.product)}
                                                >
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </Col>
                                    </Row>

                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Subtotal - {cartItems.reduce((acc, item) => acc + item.qty, 0 )}  items</h2> 
                                KSH.{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0 ).toFixed(2)}
                            </ListGroup.Item>
                        </ListGroup>

                        <ListGroup.Item>
                            <Button
                                type = 'button'
                                className='btn btn-block'
                                disabled = {cartItems.length === 0}
                                onClick = {checkoutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CartScreen
