import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from 'mdb-react-ui-kit';
import { Button, Alert } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { addPostAPI } from '../Services/allApis';
import "../assets/styles/newpost.css"

function Header() {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(''); // State to store the selected image
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    // Reset form fields and image state when modal is closed
    setImage(null);
    setTitle('');
    setDescription('');
    setCategory('');
  };

  const handleShow = () => setShow(true);
  const location = useLocation();
  const pathname  = location.pathname;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('heading', title);
    formData.append('content', description);
    formData.append('blogType', category);
    formData.append('image', image);
    formData.append('date', "12-02-2022");

    try {
      const response = await addPostAPI(formData);
      setShow(false)
      if (response.status == 200) {
        alert('Post Added Successfully')
        window.location.reload();
      } else {
        alert('Failed to add a new post')
      }
    } catch (error) {
      console.error(error);
      alert('Server Error')
    }
  };

  const logOut = async() => {
    navigate(`/Auth`);
  }

  return (
    <div>
      <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
            <i className="fa-solid fa-blog mx-2"></i>
            Blog
          </MDBNavbarBrand>
          {(pathname !== '/auth' && pathname !== '/') && (
            <div className='header-buttons'>
            <Button onClick={handleShow}>New Post</Button>
            <Button variant="outline-primary" onClick={logOut}>LogOut</Button>
            </div>
            
          )}
        </MDBContainer>
      </MDBNavbar>
      <Modal show={show} onHide={handleClose} animation={true} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='newpost-form'>
            <div className="mb-3 field">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3 field">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className="mb-3 field">
              <label htmlFor="category" className="form-label">Category</label>
              <select name="category" className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="" disabled={true}>Select a Catogory</option>
                <option value="Sports">Sports</option>
                <option value="Arts">Arts</option>
                <option value="Science">Science</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
            <div className="mb-3 field">
              <label htmlFor="image" className="form-label">Image</label>
              <input type="file" className="form-control" id="image" onChange={handleImageChange} accept="image/*" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary cancel-btn" onClick={handleClose}>
            Cancel
          </Button>
          <Button className='newpost-btn' onClick={handleSubmit}>
            Add Post
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Header;
