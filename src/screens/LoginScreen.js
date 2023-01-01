import { React, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'

const LoginScreen = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const userLogin = useSelector(state => state.userLogin)
	const { loading, error, userInfo } = userLogin

	const redirect = location.search ? location.search.split('=')[1] : '/'
	const path = redirect === '/' ? redirect : '/' + redirect

	useEffect(() => {
		if (userInfo) {
			navigate(path)
		}
	}, [navigate, userInfo, redirect])

	const sumbitHandler = e => {
		e.preventDefault()
		dispatch(login(email, password))
		// DISPATCH LOGIN
	}

	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={sumbitHandler}>
				<Form.Group controlId='email'>
					<Form.Label>Email Adress</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email: '
						value={email}
						onChange={e =>
							setEmail(e.target.value)
						}></Form.Control>
				</Form.Group>

				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter Password: '
						value={password}
						onChange={e =>
							setPassword(e.target.value)
						}></Form.Control>
				</Form.Group>

				<Button type='submit'>Sign In</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					New Customer?{' '}
					<Link
						to={
							redirect
								? `/register?redirect=${redirect}`
								: '/register'
						}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default LoginScreen
