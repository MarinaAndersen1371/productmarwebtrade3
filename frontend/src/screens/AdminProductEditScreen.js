import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { updateProduct, listProductDetails } from "../actions/productActions";

const AdminProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [pricePurchase, setPricePurchase] = useState(0);
  const [extra, setExtra] = useState(false);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState(" ");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success } = productUpdate;

  useEffect(() => {
    if (customerInfo && customerInfo.isAdmin) {
      if (success) {
        dispatch({ type: "PRODUCT_UPDATE_RESET" });
        navigate(-1);
      } else if (!product || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setBrand(product.brand);
        setCategory(product.category);
        setDescription(product.description);
        setPrice(product.price);
        setPricePurchase(product.pricePurchase);
        setImage(product.image);
        setCountInStock(product.countInStock);
        setExtra(product.extra);
      }
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, success, customerInfo, product, productId]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${customerInfo.token}`,
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        brand,
        category,
        description,
        price,
        pricePurchase,
        image,
        countInStock,
        extra,
      })
    );
  };

  return (
    <>
      <Meta title='Edit Product' />
      <Link to='/admin/productlist' className='btn btn-light'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {errorUpdate && <Message>{errorUpdate}</Message>}
        {loadingUpdate && <Loader />}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image URL'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Standard Price:</Form.Label>
              <Form.Control
                type='number'
                step='0.01'
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='pricePurchase'>
              <Form.Label>Purchase Price:</Form.Label>
              <Form.Control
                type='number'
                step='0.01'
                min={0}
                value={pricePurchase}
                onChange={(e) => setPricePurchase(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count in Stock:</Form.Label>
              <Form.Control
                type='number'
                min={0}
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='extra'>
              <Form.Check
                label='Extra Device Protection'
                type='checkbox'
                checked={extra}
                onChange={(e) => setExtra(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default AdminProductEditScreen;
