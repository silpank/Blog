import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostApi } from '../Services/allApis';
import { addLikeAPI, removeLikeAPI, addCommentAPI } from '../Services/allApis';
import '../assets/styles/post.css'

function Post() {
  const { postId } = useParams();
  const [blog, setBlog] = useState({});
  const [showComment, setShowComment] = useState(false)
  const [sampleValue, setSampleValue] = useState(false)
  const [commentValue, setCommentValue] = useState('')
  const userId = JSON.parse(sessionStorage.getItem("existingUser"))['_id'];

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getPostApi(postId);
        if (response.status === 200) {
          setBlog(response.data);
          console.log(response.data)
        } else {
          alert("Error Occurred");
        }
      } catch (error) {
        alert("Error fetching blogs");
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlog();
  }, [sampleValue]);

  const handleLike = async (bool) => {
    if (bool) {
      try {

        const response = await removeLikeAPI(postId);
        if (response.status === 200) {
          setSampleValue(!sampleValue)
        } else {
          alert("Error Occurred");
        }
      } catch (error) {
        alert("Error fetching blogs");
        console.error('Error fetching blogs:', error);
      }
    } else {
      try {
        const response = await addLikeAPI(postId);
        if (response.status === 200) {
          setSampleValue(!sampleValue)
        } else {
          alert("Error Occurred");
        }
      } catch (error) {
        alert("Error fetching blogs");
        console.error('Error fetching blogs:', error);
      }
    }
  };

  const toogleCommentSection = () => {
    setShowComment(!showComment)
  }

  const handleCommentChange = (e) => {
    setCommentValue(e.target.value)
  }

  const handleComment = async () => {
    try {
      const data = {
        'comment': commentValue,
        'date': "26-02-2024"
      }
      const response = await addCommentAPI(postId,data);
      if (response.status === 200) {
        setCommentValue('')
        setSampleValue(!sampleValue)
      } else {
        alert("Error Occurred");
      }
    } catch (error) {
      alert("Error fetching blogs");
      console.error('Error fetching blogs:', error);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleComment();
    }
  }

  return (
    <div className="post-container container">
      <div className='row justify-content-center'>
        {Object.keys(blog).length !== 0 && (
          <div className='col-lg-8'>
            <div className="user-info text-center mb-4">
              {/* User photo */}
              <div className='user-photo'>
                {
                  blog.author.image && (
                    <img src={`http://localhost:8000/uploads/${blog.author.image.split('\\')[1]}`} alt="User" className="img-fluid" />
                  )
                }
              </div>
              {/* Username */}
              <div className="username">{blog.author.fullName === '' ? blog.author.userName : blog.author.fullName}</div>
              {/* Date of post */}
              <div className="post-date">{blog.date}</div>
            </div>
            <div className='post-info text-center'>
              <h2 className='mb-4'>{blog.heading}</h2>
              {
                    blog.image && (
                      <img
                src={`http://localhost:8000/uploads/${blog.image.split('\\')[1]}`}
                alt="Blog"
                className="blog-image img-fluid w-100 mb-4"
              />
                    )

                  }
              
              <p className='blog-content'>{blog.content}</p>
              <hr className='hr-ruler' />
              <div className='icon-section'>
                <div className='like-icon-section'>
                  <span onClick={() => handleLike(blog.likes.some(like => like._id === userId))} className='like-icon'>
                    {blog.likes.some(like => like._id === userId) ? <i className="fa-solid fa-heart liked"></i> : <i className="fa-regular fa-heart"></i>}
                  </span>
                  <span>{blog.likes.length}</span>
                </div>
                <div className='comment-icon-section'>
                  <span className='comment-icon' onClick={toogleCommentSection}>
                    <i className="fa-regular fa-comment"></i>
                  </span>
                  <span>{blog.comments.length}</span>
                </div>
              </div>
              <div className='comments-section mt-2'>
                <div className="mt-3 mb-3 add-comment">
                  <textarea
                    type="text"
                    name="comment"
                    placeholder="Add Your Comment"
                    value={commentValue}
                    onChange={handleCommentChange}
                    onKeyDown={handleKeyDown}
                    className='form-control comment-input'
                    style={{ height: '90px' }}
                  />
                </div>
                {showComment && (
                  <div className='all-comments-div'>
                    {blog.comments.map((comment, index) => (
                      <div key={index} className='comment-div mt-3'>
                        <CommentSection comment={comment} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CommentSection({ comment }) {
  return (
    <div className='comments'>
        <div className='commentedheader'>
          <img src={`http://localhost:8000/uploads/${comment.commenter.image.split('\\')[1]}`} alt="User" className="commenter-image img-fluid" />
          <div className='user-and-date'>
          <p className='commentedUser'>{comment.commenter.fullName === '' ? comment.commenter.userName : comment.commenter.fullName}</p>
            <p commentedDate>{comment.date}</p>
          </div>
        </div>
        <p className='comment mt-2'>{comment.comment}</p>
    </div>
  );
}
export default Post;
