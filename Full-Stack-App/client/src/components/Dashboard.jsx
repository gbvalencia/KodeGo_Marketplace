import React, { useEffect, useState } from 'react';
import api from '../api-service/api';
import { Container, Row, Col, Navbar, Form, FormControl, Button, Modal } from 'react-bootstrap';
import './Welcome.css';
// import { ToastContainer, toast } from 'react-toastify';

const Dashboard = ({ onLogout }) => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [filterText, setFilterText] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [showModal, setShowModal] = useState(false); // State for showing the modal
  const [purchasedItems, setPurchasedItems] = useState([]); // State for storing purchased items

/*   const showSuccessToast = () => {
    toast.success('Payment Successful!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, // Close the toast after 3 seconds
    });
  }; */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await api.get('/api/user');
        setUser(response.data);
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };

    fetchProducts();
    fetchUser();
  }, []);

  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
    setSortOption(selectedSortOption);
    sortProducts(selectedSortOption);
  };

  const sortProducts = (selectedSortOption) => {
    let sortedProducts = [...filteredProducts];

    if (selectedSortOption === 'price-low-to-high') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (selectedSortOption === 'price-high-to-low') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(sortedProducts);
  };

  const handleFilterChange = (event) => {
    const filterText = event.target.value.toLowerCase();
    setFilterText(filterText);
    filterProducts(filterText);
  };

  const filterProducts = (filterText) => {
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(filterText) ||
        product.description.toLowerCase().includes(filterText) ||
        product.type.toLowerCase().includes(filterText)
    );

    setFilteredProducts(filteredProducts);
  };

  const handleCheckout = async () => {
    // Check if there are items in the cart
    if (cartItems.length === 0) {
      return; // Exit early if the cart is empty
    }
  
    try {
      // Prepare the order details
      const order = {
        products: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        // Add other necessary properties for the order details
      };
  
      // Send the order to the server for processing
      const response = await api.post('/api/orders', order);
  
      // Process the response and handle success or failure
      if (response.status === 200) {
        // Payment successful
  
        // Store the purchased items
        setPurchasedItems(cartItems);
  
        // Reset cart items and total price
        setCartItems([]);
        setTotalPrice(0);
        setShowCheckout(false);
  
        // Set the payment status with the total price
        setPaymentStatus(`Total Price: $${totalPrice}`);
  
        // Show the modal
        setShowModal(true);
      } else {
        // Payment failed
        // Handle the failure, such as showing an error message
        setPaymentStatus('Payment failed');
      }
    } catch (error) {
      // Handle any errors that occur during the payment process
      console.log('Error during payment:', error);
    }
  };
  
  

  const handleAddToCart = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);

    if (selectedProduct) {
      const existingCartItem = cartItems.find((item) => item.id === productId);
      if (existingCartItem) {
        const updatedCartItems = cartItems.map((item) => {
          if (item.id === productId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        setCartItems(updatedCartItems);
      } else {
        const updatedCartItems = [...cartItems, { ...selectedProduct, quantity: 1 }];
        setCartItems(updatedCartItems);
      }

      const updatedTotalPrice = totalPrice + selectedProduct.price;
      setTotalPrice(updatedTotalPrice);
      setShowCheckout(true);
    }
  };

  const handleRemoveFromCart = (productId) => {
    const selectedProduct = cartItems.find((item) => item.id === productId);
    if (selectedProduct) {
      if (selectedProduct.quantity > 1) {
        const updatedCartItems = cartItems.map((item) => {
          if (item.id === productId) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        });
        setCartItems(updatedCartItems);
      } else {
        const updatedCartItems = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCartItems);
      }
      const updatedTotalPrice = totalPrice - selectedProduct.price;
      setTotalPrice(updatedTotalPrice);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse">
          <Form inline className="ml-auto">
            <FormControl
              type="text"
              placeholder="Filter by keyword"
              className="mr-sm-2"
              value={filterText}
              onChange={handleFilterChange}
            />
            <Form.Control
              as="select"
              className="mr-sm-2"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="">Sort By</option>
              <option value="price-low-to-high">Price: Low to High</option>
              <option value="price-high-to-low">Price: High to Low</option>
            </Form.Control>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <h2>Welcome, {user.name}</h2>
        <Row>
          <Col xs={12} md={6}>
            <div className="cart-container">
              <div className="cart">
                <h2>Cart</h2>
                {cartItems.length > 0 ? (
                  <div>
                    <div className="cart-items">
                      {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                          <p>{item.name}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>${item.price}</p>
                          <Button
                            variant="danger"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                    <h4 className="total-price">Total Price: ${totalPrice}</h4>
                    {showCheckout ? (
                      <div>
                        <Button
                          variant="primary"
                          className="checkout-button"
                          onClick={handleCheckout}
                        >
                          Proceed to Payment
                        </Button>
                        {paymentStatus && (
                          <div className="payment-status">{paymentStatus}</div>
                        )}
                      </div>
                    ) : (
                      <p>Add items to cart to proceed to payment.</p>
                    )}
                  </div>
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="product-list">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-item">
                  <h3>{product.name}</h3>
                  <img src={product.picture} alt={product.name} />
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                  <Button
                    variant="primary"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Payment Successful</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>You have successfully made a payment!</h4>
        <p>Thank you for your purchase.</p>
        <h5>Purchased Items:</h5>
        <div className="purchased-items">
          {purchasedItems.map((item) => (
            <div key={item.id} className="purchased-item">
              <img src={item.picture} alt={item.name} />
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
        <h5>{paymentStatus}</h5> {/* Display the paymentStatus as the total price */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
      </Modal>








      {/* <ToastContainer /> */}
    </>
  );
};

export default Dashboard;
