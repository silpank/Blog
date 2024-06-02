import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { allPostAPI } from '../Services/allApis';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { addDetailsApi } from '../Services/allApis';
import '../assets/styles/userhome.css';
import '../assets/styles/carousal.css';

function TrendingBlogs({ blogs }) {
  const navigate = useNavigate();

  const handleBlogClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="trending-blogs">
      <h2 className='trending-blogs-heading'>Trending</h2>
      <Carousel className='trending-carousal' interval={2000}>
        {blogs.map((blog, index) => (
          Object.keys(blog).length !== 0 && (
            <Carousel.Item key={index} onClick={() => handleBlogClick(blog._id)}>
            <div className="container" style={{ cursor: 'pointer' }}>
              <div className="row">
                <div className="col-md-6">
                  {
                    blog.image && (
                      <img src={`http://localhost:8000/uploads/${blog.image.split('\\')[1]}`} alt="Blog" className="img-fluid" />
                    )

                  }
                </div>
                <div className="col-md-6 carousal-content">
                  <div className="contents">
                    <h3>{blog.heading}</h3>
                    <p>
                        <i className="fa-solid fa-heart liked me-1"></i> {blog.likes.length}&nbsp;&nbsp;
                        <i className="fa-regular fa-comment me-1"></i>{blog.comments.length}
                      </p>
                    <p>{blog.author.fullName === '' ? blog.author.userName : blog.author.fullName}</p>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
          )
        ))}
      </Carousel>
    </div>
  );
}

function Cards({ blogs }) {
  const navigate = useNavigate();

  const handleBlogClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="all-blogs">
      <div className='row g-5 cards-container'>
        <h2 className='all-blogs-header'>All Posts</h2>
        {blogs.map((blog, index) => (
          <div className='col-lg-4' key={index} onClick={() => handleBlogClick(blog._id)}>
            <div className='cards'>
              <div className='card-image'>
              {
                    blog.image && (
                      <img src={`http://localhost:8000/uploads/${blog.image.split('\\')[1]}`} alt="Blog" className="img-fluid" />
                    )

                  }
              </div>
              <div className="card-content">
                <h3>{blog.heading}</h3>
                <p>
                    <i className="fa-solid fa-heart liked me-1"></i>{blog.likes.length}&nbsp;&nbsp;
                    <i className="fa-regular fa-comment me-1"></i>{blog.comments.length}
                  </p>  
                <p>{blog.author.fullName === '' ? blog.author.userName : blog.author.fullName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(''); // State to store the selected image
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await allPostAPI();
        if (response.status === 200) {
          // Set all posts
          setBlogs(response.data);

          // Sort blogs by likes and get the top 5
          const sortedBlogs = [...response.data].sort((a, b) => b.likes.length - a.likes.length);
          const trendingSlice = sortedBlogs.slice(0, 5);

          // Set trending blogs
          setTrendingBlogs(trendingSlice);
        } else {
          alert("Error Occurred");
        }
      } catch (error) {
        alert("Error fetching blogs");
        console.error('Error fetching blogs:', error);
      }
    };
    const checkDetails = async () => {
      const user = JSON.parse(sessionStorage.getItem("existingUser"));
      if (!user.dataFilled) {
        console.log('not filled')
        setShowModal(true)
      }
    }
    checkDetails();
    fetchBlogs();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setImage(null);
    setfirstName('');
    setlastName('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('image', image);

    try {
      const response = await addDetailsApi(formData);
      setShowModal(false)
      if (response.status == 200) {
        console.log(response.data)
        sessionStorage.setItem('existingUser', JSON.stringify(response.data.user))
        alert('Profile Updated Successfully')
      } else {
        alert('Failed to Update')
      }
    } catch (error) {
      console.error(error);
      alert('Server Error')
    }
  };

  return (
    <div className="blog-list">
      <Modal show={showModal} onHide={handleClose} animation={true} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Complete Your Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='newpost-form'>
            <div className="mb-3 field">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setfirstName(e.target.value)} />
            </div>
            <div className="mb-3 field">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setlastName(e.target.value)} />
            </div>
            <div className="mb-3 field">
              <label htmlFor="image" className="form-label">Upload Your Image</label>
              <input type="file" className="form-control" id="image" onChange={handleImageChange} accept="image/*" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary cancel-btn" onClick={handleClose}>
            Skip
          </Button>
          <Button className='newpost-btn' onClick={handleSubmit}>
            Update Profile
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='container'>
        <TrendingBlogs blogs={trendingBlogs} />
        <Cards blogs={blogs} />
      </div>
    </div>
  );
}

export default BlogList;
