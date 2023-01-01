import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../actions/productActions'
import axios from 'axios'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = () => {
	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [image, setImage] = useState('')
	const [brand, setBrand] = useState('')
	const [category, setCategory] = useState('')
	const [countInStock, setCountInStock] = useState(0)
	const [description, setDescription] = useState('')
	const [uploading, setUploading] = useState(false)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const params = useParams()

	const productId = params.id

	const productDetails = useSelector(state => state.productDetails)
	const { loading, error, product } = productDetails

	const productUpdate = useSelector(state => state.productUpdate)
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET })
			navigate('/admin/productlist')
		} else {
			if (!product.name || product._id !== productId) {
				dispatch(listProductDetails(productId))
			} else {
				setName(product.name)
				setPrice(product.price)
				setCategory(product.category)
				setCountInStock(product.countInStock)
				setDescription(product.description)
				setBrand(product.brand)
				setImage(product.image)
			}
		}
	}, [product, productId, navigate, dispatch, successUpdate])

	const sumbitHandler = e => {
		e.preventDefault()
		dispatch(
			updateProduct({
				_id: productId,
				name,
				category,
				brand,
				description,
				countInStock,
				image,
				price,
			})
		)
	}

	const uploadFileHandler = async e => {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('image', file)
		setUploading(true)

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}

			const { data } = await axios.post(
				'/api/upload',
				formData,
				config
			)
			setImage(data)
			setUploading(false)
		} catch (error) {
			console.error(error)
			setUploading(false)
		}
	}

	return (
		<>
			<Link to='/admin/productlist' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && (
					<Message variant='danger'>{errorUpdate}</Message>
				)}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={sumbitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter name: '
								value={name}
								onChange={e =>
									setName(e.target.value)
								}></Form.Control>
						</Form.Group>

						<Form.Group controlId='price'>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								placeholder='Price'
								value={price}
								onChange={e =>
									setPrice(e.target.value)
								}></Form.Control>
						</Form.Group>

						<Form.Group controlId='image'>
							<Form.Label>Image</Form.Label>
							<Form.Control
								type='text'
								label='Enter image URL'
								placeholder='Image URL'
								onChange={e =>
									setImage(e.target.value)
								}></Form.Control>
							<Form.File
								id='image-file'
								label='Choose File'
								custom
								onChange={
									uploadFileHandler
								}></Form.File>{' '}
							{uploading && <Loader />}
						</Form.Group>

						<Form.Group controlId='brand'>
							<Form.Label>Brand</Form.Label>

							<Form.Control
								type='text'
								label='Brand'
								placeholder='Brand'
								onChange={e =>
									setBrand(e.target.value)
								}></Form.Control>
						</Form.Group>

						<Form.Group controlId='countInStock'>
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								type='number'
								placeholder='Count In Stock'
								value={countInStock}
								onChange={e =>
									setCountInStock(e.target.value)
								}></Form.Control>
						</Form.Group>

						<Form.Group controlId='category'>
							<Form.Label>Category</Form.Label>
							<Form.Control
								type='text'
								placeholder='Category'
								value={category}
								onChange={e =>
									setCategory(e.target.value)
								}></Form.Control>
						</Form.Group>

						<Form.Group controlId='description'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								type='text'
								placeholder='Description'
								value={description}
								onChange={e =>
									setDescription(e.target.value)
								}></Form.Control>
						</Form.Group>
						<br></br>
						<Button type='submit'>Update</Button>
					</Form>
				)}
			</FormContainer>
		</>
	)
}

export default ProductEditScreen
