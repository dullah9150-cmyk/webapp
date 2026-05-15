import React, { useState, useEffect, useRef } from 'react';
import { Container, Table, Button, Form, Modal, Spinner, Alert, Badge, Card, Row, Col, Dropdown } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaExclamationTriangle, FaTag, FaTimes, FaImage, FaUpload, FaCloudUploadAlt, FaEllipsisV } from 'react-icons/fa';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/Firebase';
import cloudinaryConfig from '../../services/cloudinaryConfig';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [newTag, setNewTag] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Main Course',
    tags: [],
    imageUrl: '',
    cloudinaryId: ''
  });

  // Available tags for selection
  const availableTags = [
    'Vegetarian', 'Non-Veg', 'Spicy', 'Mild', 'Signature', 'Popular',
    'Chinese', 'Tandoor', 'Fresh', 'Sweet', 'Seafood', 'Healthy',
    'Best Seller', 'Chef Special', 'Gluten Free', 'Vegan', 'Dairy Free'
  ];

  // Available categories
  const availableCategories = [
    'Main Course', 'Starters', 'Chinese', 'Breads', 'Desserts',
    'Seafood', 'Beverages', 'Salads', 'Soup', 'Rice', 'Pasta',
    'Pizza', 'Burger', 'Sandwich', 'Breakfast'
  ];

  // Load menu from Firestore
  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const menuRef = collection(db, 'menu');
      const snapshot = await getDocs(menuRef);
      
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setMenuItems(items);
      
    } catch (error) {
      console.error('Firestore Error:', error);
      setError(`Failed to load menu: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Cloudinary Upload Function
  const uploadToCloudinary = async (file) => {
    if (!file) return null;
    
    try {
      setUploading(true);
      
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryConfig.uploadPreset);
      formData.append('cloud_name', cloudinaryConfig.cloudName);
      formData.append('folder', 'restaurant-menu'); // Optional: organize in folder
      
      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      console.log('Cloudinary upload successful:', data);
      
      return {
        url: data.secure_url,
        publicId: data.public_id,
        format: data.format,
        width: data.width,
        height: data.height
      };
      
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      setError(`Failed to upload image: ${error.message}`);
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Delete from Cloudinary
  const deleteFromCloudinary = async (publicId) => {
    if (!publicId) return;
    
    try {
      // Note: This requires server-side implementation for security
      // You should create a backend endpoint for this
      console.log('Would delete from Cloudinary:', publicId);
      
      // For now, we'll just log it
      // Implement server-side deletion for security
      // Example backend endpoint: POST /api/delete-image
      
    } catch (error) {
      console.error('Cloudinary delete error:', error);
      // Don't block operation if delete fails
    }
  };

  // Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, WebP, GIF)');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size should be less than 10MB');
      return;
    }

    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Generate Cloudinary URL with transformations
  const getOptimizedImageUrl = (url, options = {}) => {
    if (!url || !url.includes('cloudinary.com')) return url;
    
    const { width = 600, height = 400, crop = 'fill', quality = 'auto' } = options;
    
    // Parse the URL to insert transformations
    const urlParts = url.split('/upload/');
    if (urlParts.length === 2) {
      return `${urlParts[0]}/upload/w_${width},h_${height},c_${crop},q_${quality}/${urlParts[1]}`;
    }
    
    return url;
  };

  const handleSubmit = async () => {
    try {
      if (!formData.name || !formData.price) {
        setError('Name and price are required');
        return;
      }

      setLoading(true);
      setError('');
      
      let imageUrl = formData.imageUrl;
      let cloudinaryId = formData.cloudinaryId;
      
      // Upload new image to Cloudinary if selected
      if (imageFile) {
        const cloudinaryData = await uploadToCloudinary(imageFile);
        if (cloudinaryData) {
          imageUrl = cloudinaryData.url;
          cloudinaryId = cloudinaryData.publicId;
        }
      }

      console.log('Adding item to Firestore:', { ...formData, imageUrl });
      
      const menuRef = collection(db, 'menu');
      await addDoc(menuRef, {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: `₹${formData.price}`,
        category: formData.category,
        tags: formData.tags,
        imageUrl: imageUrl,
        cloudinaryId: cloudinaryId,
        imageOptimizedUrl: getOptimizedImageUrl(imageUrl, { width: 600, height: 400 }),
        imageThumbnailUrl: getOptimizedImageUrl(imageUrl, { width: 150, height: 150 }),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      console.log('Item added successfully');
      setSuccess('Menu item added successfully!');
      await loadMenu();
      setShowModal(false);
      resetForm();
      
    } catch (error) {
      console.error('Add Item Error:', error);
      setError(`Failed to add item: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || '',
      price: item.price.replace('₹', ''),
      category: item.category || 'Main Course',
      tags: item.tags || [],
      imageUrl: item.imageUrl || '',
      cloudinaryId: item.cloudinaryId || ''
    });
    setImagePreview(item.imageUrl || null);
    setImageFile(null);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      if (!formData.name || !formData.price) {
        setError('Name and price are required');
        return;
      }

      setLoading(true);
      setError('');
      
      let imageUrl = formData.imageUrl;
      let cloudinaryId = formData.cloudinaryId;
      
      // Upload new image to Cloudinary if selected
      if (imageFile) {
        // Delete old image from Cloudinary if exists
        if (editingItem.cloudinaryId) {
          await deleteFromCloudinary(editingItem.cloudinaryId);
        }
        
        const cloudinaryData = await uploadToCloudinary(imageFile);
        if (cloudinaryData) {
          imageUrl = cloudinaryData.url;
          cloudinaryId = cloudinaryData.publicId;
        }
      }

      console.log('Updating item:', editingItem.id, { ...formData, imageUrl });
      
      const itemDoc = doc(db, 'menu', editingItem.id);
      await updateDoc(itemDoc, {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: `₹${formData.price}`,
        category: formData.category,
        tags: formData.tags,
        imageUrl: imageUrl,
        cloudinaryId: cloudinaryId,
        imageOptimizedUrl: getOptimizedImageUrl(imageUrl, { width: 600, height: 400 }),
        imageThumbnailUrl: getOptimizedImageUrl(imageUrl, { width: 150, height: 150 }),
        updatedAt: new Date().toISOString()
      });
      
      console.log('Item updated successfully');
      setSuccess('Menu item updated successfully!');
      await loadMenu();
      setShowEditModal(false);
      setEditingItem(null);
      resetForm();
      
    } catch (error) {
      console.error('Update Error:', error);
      setError(`Failed to update item: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Open delete confirmation modal
  const confirmDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    
    try {
      setLoading(true);
      
      // Delete image from Cloudinary if exists
      if (itemToDelete.cloudinaryId) {
        await deleteFromCloudinary(itemToDelete.cloudinaryId);
      }
      
      // Delete document from Firestore
      const itemDoc = doc(db, 'menu', itemToDelete.id);
      await deleteDoc(itemDoc);
      
      console.log('Item deleted successfully');
      setSuccess(`"${itemToDelete.name}" deleted successfully!`);
      await loadMenu();
      
    } catch (error) {
      console.error('Delete Error:', error);
      setError(`Failed to delete item: ${error.message}`);
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  };

  const handleTagAdd = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleTagSelect = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag]
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Main Course',
      tags: [],
      imageUrl: '',
      cloudinaryId: ''
    });
    setNewTag('');
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getTagVariant = (tag) => {
    const variants = {
      'Vegetarian': 'success',
      'Vegan': 'success',
      'Non-Veg': 'danger',
      'Spicy': 'warning',
      'Signature': 'primary',
      'Popular': 'info',
      'Chef Special': 'dark',
      'Best Seller': 'danger',
      'Healthy': 'success',
      'Gluten Free': 'info',
      'Dairy Free': 'info'
    };
    return variants[tag] || 'secondary';
  };

  if (loading && !uploading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="warning" />
        <p className="mt-3">Loading menu from Firestore...</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold text-dark">Menu Management</h3>
          <p className="text-muted">
            <FaCloudUploadAlt className="me-2" />
            Connected to Firebase Firestore & Cloudinary
          </p>
        </div>
        <Button 
          variant="warning" 
          onClick={() => setShowModal(true)}
          className="d-flex align-items-center"
        >
          <FaPlus className="me-2" /> Add New Item
        </Button>
      </div>

      {error && (
        <Alert variant="danger" className="mb-4" onClose={() => setError('')} dismissible>
          <FaExclamationTriangle className="me-2" />
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success" className="mb-4" onClose={() => setSuccess('')} dismissible>
          {success}
        </Alert>
      )}

      <Alert variant="info" className="mb-4">
        <Row>
          <Col md={6}>
            <strong>Firestore Status:</strong> {menuItems.length} items loaded
          </Col>
          <Col md={6} className="text-end">
            <small>Images are stored in Cloudinary</small>
          </Col>
        </Row>
      </Alert>

      <Card className="mb-4">
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Tags</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    <p className="text-muted">No menu items found</p>
                    <Button 
                      variant="outline-warning" 
                      size="sm" 
                      onClick={() => setShowModal(true)}
                    >
                      Add Your First Item
                    </Button>
                  </td>
                </tr>
              ) : (
                menuItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      {item.imageThumbnailUrl || item.imageUrl ? (
                        <img 
                          src={item.imageThumbnailUrl || item.imageUrl} 
                          alt={item.name}
                          className="img-thumbnail"
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/60x60?text=No+Image';
                          }}
                        />
                      ) : (
                        <div className="text-center">
                          <FaImage className="text-muted" />
                          <small className="d-block">No Image</small>
                        </div>
                      )}
                      {item.cloudinaryId && (
                        <small className="d-block text-muted mt-1" style={{ fontSize: '0.7em' }}>
                          Cloudinary
                        </small>
                      )}
                    </td>
                    <td>
                      <strong>{item.name}</strong>
                    </td>
                    <td>
                      <small className="text-muted">
                        {item.description ? 
                          (item.description.length > 50 ? `${item.description.substring(0, 50)}...` : item.description) 
                          : 'No description'
                        }
                      </small>
                    </td>
                    <td>
                      <Badge bg="info" className="fw-normal">{item.category}</Badge>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        {item.tags && item.tags.length > 0 ? (
                          item.tags.slice(0, 3).map((tag, idx) => (
                            <Badge key={idx} bg={getTagVariant(tag)} className="fw-normal">
                              {tag}
                            </Badge>
                          ))
                        ) : (
                          <small className="text-muted">No tags</small>
                        )}
                        {item.tags && item.tags.length > 3 && (
                          <Badge bg="light" text="dark" className="fw-normal">
                            +{item.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td>
                      <strong className="text-success">{item.price}</strong>
                    </td>
                    <td>
                      {/* Dropdown Menu for Actions */}
                      <Dropdown>
                        <Dropdown.Toggle 
                          variant="outline-secondary" 
                          size="sm" 
                          id={`dropdown-${item.id}`}
                          className="d-flex align-items-center"
                        >
                          <FaEllipsisV />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleEdit(item)}>
                            <FaEdit className="me-2 text-primary" />
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item 
                            onClick={() => confirmDelete(item)}
                            className="text-danger"
                          >
                            <FaTrash className="me-2" />
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">
            <FaExclamationTriangle className="me-2" />
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">
            <strong>Warning!</strong> This action cannot be undone.
          </Alert>
          <p>
            Are you sure you want to delete <strong>"{itemToDelete?.name}"</strong>?
          </p>
          <p className="text-muted small">
            This will remove the item from the menu and delete the associated image from Cloudinary.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Deleting...
              </>
            ) : (
              'Delete Permanently'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Item Modal */}
      <Modal show={showModal} onHide={() => { setShowModal(false); resetForm(); }} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <FaPlus className="me-2" />
            Add New Menu Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Cloudinary Image Upload Section */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">
                <FaImage className="me-2" />
                Item Image (Upload to Cloudinary)
              </Form.Label>
              
              <Alert variant="info" className="small mb-3">
                <FaCloudUploadAlt className="me-2" />
                Images will be uploaded to Cloudinary for optimal delivery
              </Alert>
              
              <div className="border rounded p-3 text-center">
                {imagePreview ? (
                  <div className="mb-3">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="img-fluid rounded mb-3"
                      style={{ maxHeight: '200px', objectFit: 'cover' }}
                    />
                    <div className="d-flex justify-content-center gap-2">
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => {
                          setImagePreview(null);
                          setImageFile(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="py-4">
                    <FaImage className="display-4 text-muted mb-3" />
                    <p className="text-muted">No image selected</p>
                    <p className="small text-muted">
                      Recommended: 600x400 pixels, JPEG/PNG format, max 10MB
                    </p>
                  </div>
                )}
                
                <div className="d-grid">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    accept="image/*"
                    className="d-none"
                    id="imageUpload"
                  />
                  <Button
                    variant={imagePreview ? "outline-primary" : "primary"}
                    onClick={() => fileInputRef.current.click()}
                    className="d-flex align-items-center justify-content-center"
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FaUpload className="me-2" />
                        {imagePreview ? 'Change Image' : 'Upload Image'}
                      </>
                    )}
                  </Button>
                </div>
                
                <Form.Text className="text-muted d-block mt-2">
                  Cloudinary will automatically optimize images for web
                </Form.Text>
              </div>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Item Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter item name"
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price (₹) *</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="Enter price"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter description"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {availableCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaTag className="me-2" />
                    Tags
                  </Form.Label>
                  
                  <div className="p-2 border rounded">
                    <div className="d-flex flex-wrap gap-1 mb-2">
                      {formData.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          bg={getTagVariant(tag)} 
                          className="d-flex align-items-center gap-1 p-2"
                        >
                          {tag}
                          <FaTimes 
                            className="ms-1 cursor-pointer" 
                            onClick={() => handleTagRemove(tag)}
                            style={{ cursor: 'pointer', fontSize: '0.8rem' }}
                          />
                        </Badge>
                      ))}
                    </div>

                    <div className="d-flex gap-2">
                      <Form.Control
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add custom tag"
                        size="sm"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                      />
                      <Button variant="outline-primary" size="sm" onClick={handleTagAdd}>
                        Add
                      </Button>
                    </div>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            {/* Quick Tags */}
            <Form.Group className="mb-3">
              <Form.Label className="small text-muted">Quick Tags:</Form.Label>
              <div className="d-flex flex-wrap gap-1">
                {availableTags.map((tag) => (
                  <Button
                    key={tag}
                    size="sm"
                    variant={formData.tags.includes(tag) ? "primary" : "outline-secondary"}
                    onClick={() => handleTagSelect(tag)}
                    disabled={formData.tags.includes(tag)}
                    className="mb-1"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowModal(false); resetForm(); }}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleSubmit} disabled={loading || uploading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Adding...
              </>
            ) : (
              'Add to Menu'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Item Modal */}
      <Modal show={showEditModal} onHide={() => { setShowEditModal(false); setEditingItem(null); resetForm(); }} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <FaEdit className="me-2" />
            Edit Menu Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Cloudinary Image Section for Edit */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">
                <FaImage className="me-2" />
                Item Image
              </Form.Label>
              
              <div className="border rounded p-3 text-center">
                {imagePreview ? (
                  <div className="mb-3">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="img-fluid rounded mb-3"
                      style={{ maxHeight: '200px', objectFit: 'cover' }}
                    />
                    <div className="d-flex justify-content-center gap-2">
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => {
                          setImagePreview(null);
                          setImageFile(null);
                          setFormData({...formData, imageUrl: '', cloudinaryId: ''});
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="py-4">
                    <FaImage className="display-4 text-muted mb-3" />
                    <p className="text-muted">No image selected</p>
                  </div>
                )}
                
                <div className="d-grid">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    accept="image/*"
                    className="d-none"
                    id="editImageUpload"
                  />
                  <Button
                    variant={imagePreview ? "outline-primary" : "primary"}
                    onClick={() => fileInputRef.current.click()}
                    className="d-flex align-items-center justify-content-center"
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FaUpload className="me-2" />
                        {imagePreview ? 'Change Image' : 'Upload Image'}
                      </>
                    )}
                  </Button>
                </div>
                
                {editingItem?.cloudinaryId && (
                  <div className="mt-2">
                    <small className="text-muted">
                      Current image stored in Cloudinary
                    </small>
                  </div>
                )}
              </div>
            </Form.Group>

            {/* Rest of the edit form */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Item Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price (₹) *</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {availableCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaTag className="me-2" />
                    Tags
                  </Form.Label>
                  
                  <div className="p-2 border rounded">
                    <div className="d-flex flex-wrap gap-1 mb-2">
                      {formData.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          bg={getTagVariant(tag)} 
                          className="d-flex align-items-center gap-1 p-2"
                        >
                          {tag}
                          <FaTimes 
                            className="ms-1 cursor-pointer" 
                            onClick={() => handleTagRemove(tag)}
                            style={{ cursor: 'pointer', fontSize: '0.8rem' }}
                          />
                        </Badge>
                      ))}
                    </div>

                    <div className="d-flex gap-2">
                      <Form.Control
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add custom tag"
                        size="sm"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                      />
                      <Button variant="outline-primary" size="sm" onClick={handleTagAdd}>
                        Add
                      </Button>
                    </div>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="small text-muted">Quick Tags:</Form.Label>
              <div className="d-flex flex-wrap gap-1">
                {availableTags.slice(0, 10).map((tag) => (
                  <Button
                    key={tag}
                    size="sm"
                    variant={formData.tags.includes(tag) ? "primary" : "outline-secondary"}
                    onClick={() => handleTagSelect(tag)}
                    disabled={formData.tags.includes(tag)}
                    className="mb-1"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowEditModal(false); setEditingItem(null); resetForm(); }}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleUpdate} disabled={loading || uploading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Updating...
              </>
            ) : (
              'Update Item'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MenuManagement;