import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { FaFire, FaLeaf } from 'react-icons/fa';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/Firebase';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState('default');

  // Default menu items
  const defaultMenuItems = [
    {
      id: 1,
      name: "Hyderabadi Biryani",
      description: "Authentic dum biryani with 24 spices and tender meat",
      price: "₹450",
      category: "Main Course",
      imageUrl: "https://images.unsplash.com/photo-1563379091339-03246963d9d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      tags: ["Spicy", "Non-Veg"]
    },
    {
      id: 2,
      name: "Paneer Butter Masala",
      description: "Creamy cottage cheese in rich tomato gravy",
      price: "₹350",
      category: "Main Course",
      imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      tags: ["Vegetarian", "Mild"]
    },
    {
      id: 3,
      name: "Tandoori Platter",
      description: "Assorted kebabs with mint chutney",
      price: "₹600",
      category: "Starters",
      imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      tags: ["Non-Veg", "Tandoor"]
    },
    {
      id: 4,
      name: "Chicken Tikka",
      description: "Marinated chicken grilled to perfection",
      price: "₹400",
      category: "Starters",
      imageUrl: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      tags: ["Non-Veg", "Popular"]
    },
    {
      id: 5,
      name: "Vegetable Fried Rice",
      description: "Stir-fried rice with fresh vegetables",
      price: "₹250",
      category: "Chinese",
      imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      tags: ["Vegetarian", "Chinese"]
    },
    {
      id: 6,
      name: "Butter Naan",
      description: "Soft leavened bread with butter",
      price: "₹60",
      category: "Breads",
      imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      tags: ["Vegetarian", "Fresh"]
    },
    {
      id: 7,
      name: "Gulab Jamun",
      description: "Sweet milk dumplings in rose syrup",
      price: "₹180",
      category: "Desserts",
      imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      tags: ["Sweet", "Vegetarian"]
    },
    {
      id: 8,
      name: "Chicken Manchurian",
      description: "Indo-Chinese chicken in tangy sauce",
      price: "₹380",
      category: "Chinese",
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      tags: ["Non-Veg", "Chinese"]
    },
    {
      id: 9,
      name: "Dal Makhani",
      description: "Black lentils slow-cooked with butter",
      price: "₹300",
      category: "Main Course",
      imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      tags: ["Vegetarian", "Signature"]
    },
    {
      id: 10,
      name: "Fish Curry",
      description: "Coastal style fish in coconut gravy",
      price: "₹500",
      category: "Seafood",
      imageUrl: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      tags: ["Seafood", "Spicy"]
    }
  ];

  // Load menu from Firestore
  useEffect(() => {
    loadMenuFromFirestore();
  }, []);

  const loadMenuFromFirestore = async () => {
    try {
      setLoading(true);
      
      const menuRef = collection(db, 'menu');
      const snapshot = await getDocs(menuRef);
      
      console.log('Firestore documents:', snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
      
      if (snapshot.empty) {
        // If no items in Firebase, use ONLY default items
        console.log('No items in Firebase, using default menu');
        setMenuItems(defaultMenuItems);
        setDataSource('default');
      } else {
        // Get items from Firebase
        const firebaseItems = snapshot.docs.map(doc => {
          const data = doc.data();
          console.log('Firebase item data:', data); // Debug log
          
          return {
            id: `firebase_${doc.id}`,
            name: data.name || 'Unnamed Item',
            description: data.description || 'No description available',
            price: data.price || '₹0',
            category: data.category || 'Uncategorized',
            // FIX: Check both 'image' and 'imageUrl' fields
            image: data.imageUrl || data.image || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            imageUrl: data.imageUrl || data.image || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
            source: 'firebase'
          };
        });
        
        console.log('Processed Firebase items:', firebaseItems);
        
        // OPTION 1: Show ONLY Firebase items
        // setMenuItems(firebaseItems);
        // setDataSource('firebase-only');
        
        // OPTION 2: Combine Firebase items with default items
        const combinedItems = [...firebaseItems, ...defaultMenuItems];
        console.log('Combined items:', combinedItems);
        setMenuItems(combinedItems);
        setDataSource('combined');
        
      }
      
    } catch (error) {
      console.error('Error loading from Firebase:', error);
      setMenuItems(defaultMenuItems);
      setDataSource('default');
    } finally {
      setLoading(false);
    }
  };

  const refreshMenu = () => {
    loadMenuFromFirestore();
  };

  // Get the correct image URL (check both fields)
  const getImageUrl = (item) => {
    // Try multiple possible field names
    return item.imageUrl || item.image || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80';
  };

  if (loading) {
    return (
      <section id="menu" className="py-5 bg-light">
        <Container className="text-center">
          <Spinner animation="border" variant="warning" />
          <p className="mt-3">Loading menu...</p>
        </Container>
      </section>
    );
  }

  return (
    <section id="menu" className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark mb-3">Our Menu</h2>
          <p className="text-muted lead">
            {dataSource === 'combined' ? (
              <span>
                Live menu from Firebase + Default Items ({menuItems.length} items)
              </span>
            ) : dataSource === 'firebase-only' ? (
              <span>
                Live menu from Firebase ({menuItems.length} items)
              </span>
            ) : (
              <span>
                Explore our wide range of culinary delights ({menuItems.length} items)
              </span>
            )}
          </p>
          <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
            <div className="underline"></div>
            <Button 
              variant="outline-warning" 
              size="sm"
              onClick={refreshMenu}
            >
              Refresh Live Data
            </Button>
          </div>
        </div>
        
        <Row className="g-4">
          {menuItems.map((item) => {
            const imageUrl = getImageUrl(item);
            console.log('Rendering item:', item.name, 'Image URL:', imageUrl); // Debug log
            
            return (
              <Col key={item.id} md={6} lg={4} xl={3}>
                <Card className="h-100 shadow-sm border-0 hover-lift">
                  <div className="position-relative">
                    <Card.Img 
                      variant="top" 
                      src={imageUrl} 
                      className="menu-img"
                      style={{ height: '200px', objectFit: 'cover' }}
                      onError={(e) => {
                        console.error(`Image failed to load: ${imageUrl}`);
                        e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80';
                      }}
                      onLoad={() => console.log(`Image loaded successfully: ${imageUrl}`)}
                    />
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-warning text-dark">{item.category}</span>
                    </div>
                    {item.source === 'firebase' && (
                      <div className="position-absolute top-0 start-0 m-2">
                        <span className="badge bg-success" style={{ fontSize: '0.7rem' }}>
                          New
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <Card.Body className="d-flex flex-column">
                    <div className="mb-2">
                      {item.tags && item.tags.length > 0 ? (
                        item.tags.map((tag, index) => (
                          <span key={index} className="badge bg-light text-dark me-1 mb-1">
                            {tag === "Spicy" && <FaFire className="me-1" />}
                            {tag === "Vegetarian" && <FaLeaf className="me-1" />}
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="badge bg-light text-dark me-1">
                          No tags
                        </span>
                      )}
                    </div>
                    
                    <Card.Title className="fw-bold">{item.name}</Card.Title>
                    <Card.Text className="text-muted flex-grow-1">
                      {item.description}
                    </Card.Text>
                    
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <h5 className="text-warning fw-bold mb-0">{item.price}</h5>
                      <Button variant="outline-warning" size="sm">
                        Add to Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        
        <div className="text-center mt-5">
          <Button variant="warning" size="lg" className="px-5 fw-bold mb-3">
            View Complete Menu ({menuItems.length} items)
          </Button>
          
          <div className="mt-3">
            <small className="text-muted">
              {dataSource === 'combined' && (
                <span className="text-success">
                  ✓ Connected to Firebase. Items added via dashboard appear with "New" badge.
                  <br />
                  <small>Check browser console for image loading details</small>
                </span>
              )}
              {dataSource === 'firebase-only' && (
                <span className="text-info">
                  ⚡ Showing only live Firebase data
                </span>
              )}
              {dataSource === 'default' && (
                <span className="text-warning">
                  ⚠ Using demo data. Connect to Firebase to add your own items.
                </span>
              )}
            </small>
          </div>
          
          {/* Debug Info */}
          <div className="mt-3">
            <Button 
              variant="outline-info" 
              size="sm"
              onClick={() => {
                console.log('Current menu items:', menuItems);
                console.log('Firestore connection:', db?.app?.options?.projectId);
              }}
            >
              Debug Info
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Menu;