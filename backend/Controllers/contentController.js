const contents = require('../Models/contentSchema')
// Function to add a new post
exports.newPost = async (req, res) => {
  console.log('inside New Post');
  try {
    const {
      date,
      blogType,
      heading,
      content,
      comments
    } = req.body

    const imagePath = req.file.path
    // // Create a new instance of the Content model
    const postData = {
      author:req.payload,
      date,
      blogType,
      heading,
      image: imagePath,
      content,
      likes: [],
      comments
    }
    const newPost = new contents(postData);

    // // Save the new post to the database
    const savedPost = await newPost.save();
    //response
    res.status(200).json("New post Saved")

    console.log('New post added');

  } catch (error) {

    console.error('Error adding new post:', error);
    //response
    res.status(500).json("Server Error")
  }
}

//Function to add New Comment
exports.newComment = async (req, res) => {
  console.log('inside New comment');
  try {
    const postId = req.params.postId;

    const {
      comment,
      date
    } = req.body

    console.log(date)
    const updatedPost = await contents.findByIdAndUpdate(
      postId, {
        $push: {
          comments: {
            commenter:req.payload,
            comment,
            date
          }
        }
      },
    );
    res.status(200).json('comment Succesfully')

  } catch (err) {
    console.error('Error adding comment:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
}

//Function to add All Post
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await contents.find({})
      .populate({
        path: 'author',
        model: 'users',
        select: 'userName image fullName'
      })
      .populate({
        path:'likes',
        model:'users',
        select:'userName image fullName'
      })
      .populate({
        path: 'comments.commenter',
        model: 'users',
        select: 'userName image fullName'
      });

    res.status(200).json(posts);
  } catch (err) {   +
    console.error(err);
    res.status(500).json({
      message: 'Server Error'
    });
  }
}

//Function to add Like
exports.addLike = async (req, res) => {
  console.log('inside add like')
  const postId = req.params.postId;
  try {
    const updatedPost = await contents.findByIdAndUpdate(
      postId, {
        $push: {
          likes: req.payload
        }
      }
    )
    res.status(200).json('like added')
  } catch (error) {
    res.status(500).json('Error in Like Function')
  }
}

exports.removeLike = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.payload;
  console.log('inside remove like')
  try {
    const updatedPost = await contents.findByIdAndUpdate(
      postId, 
      { $pull: { likes: userId } }
    );

    res.status(200).json('Like removed');
  } catch (error) {
    res.status(500).json('Error in Remove Like Function');
  }
};


exports.getPost = async (req, res) => {
  console.log('inside getPost')
  try {
    const postId = req.params.postId;
    const post = await contents.findById(postId)
      .populate({
        path: 'author',
        model: 'users',
        select: 'userName image fullName'
      })
      .populate({
        path:'likes',
        model:'users',
        select:'userName image fullName'
      })
      .populate({
        path: 'comments.commenter',
        model: 'users',
        select: 'userName image fullName'
      });
    res.status(200).json(post);
  } catch (err) {   +
    console.error(err);
    res.status(500).json({
      message: 'Server Error'
    });
  }
}