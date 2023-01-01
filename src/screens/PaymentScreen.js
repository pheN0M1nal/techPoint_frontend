import { React, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const ShippingScreen = () => {
	const cart = useSelector(state => state.cart)
	const { shippingAddress } = cart

	const dispatch = useDispatch()
	const navigate = useNavigate()

	if (!shippingAddress) {
		navigate('/shipping')
	}

	const [paymentMethod, setPaymentMethod] = useState('PayPal')

	const sumbitHandler = e => {
		e.preventDefault()
		dispatch(savePaymentMethod(paymentMethod))
		navigate('/placeorder')
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment</h1>
			<Form onSubmit={sumbitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>
				
				<Col>
					<Form.Check
						type='radio'
						label='PayPal or Credit Card'
						id='Paypal'
						value='Paypal'
						onChange={e => setPaymentMethod(e.target.value)}
						checked
						name='paymentMethod'></Form.Check>
					<Form.Check
						type='radio'
						label='Stripe'
						id='Stripe'
						value='Stripe'
						onChange={e => setPaymentMethod(e.target.value)}
						name='paymentMethod'></Form.Check>
					</Col>
					</Form.Group>
				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	)
}

export default ShippingScreen
