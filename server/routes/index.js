const express = require("express");
const {
  registerUser,
  userSignin1,
  signout,
  checkAuth,
} = require("../controllers/authController");
const {
  getUsers,
  getUserById,
  getAuthUser,
  deleteUser,
  addFollowing,
  addFollower,
  deleteFollowing,
  deleteFollower,
  getUserProfile,
  getUserFeed,
  uploadAvatar,
  resizeAvatar,
  updateUser,
} = require("../controllers/userController");
const {
  getPostById,
  toggleLike,
  toggleComment,
  deletePost,
  uploadImage,
  resizeImage,
  addPost,
  getPostsByUser,
  getPostFeed,
} = require("../controllers/postController");

const { validateSignup } = require("../validator");
const { userSignupValidator } = require("../validator/auth");

const router = express.Router();

/* Error handler for async / await functions */
const catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

/**
 * AUTH ROUTES: /api/auth
 */
router.post(
  "/api/auth/signup",
  userSignupValidator,
  validateSignup,
  registerUser
);
router.post("/api/auth/signin", userSignin1);
router.get("/api/auth/signout", signout);

/**
 * USER ROUTES: /api/users
 */

router.param("userId", getUserById);

router.put(
  "/api/users/follow",
  checkAuth,
  catchErrors(addFollowing),
  catchErrors(addFollower)
);
router.put(
  "/api/users/unfollow",
  checkAuth,
  catchErrors(deleteFollowing),
  catchErrors(deleteFollower)
);

router
  .route("/api/users/:userId")
  .get(getAuthUser)
  .put(
    checkAuth,
    uploadAvatar,
    catchErrors(resizeAvatar),
    catchErrors(updateUser)
  )
  .delete(checkAuth, deleteUser);

router.get("/api/users", getUsers);

router.get("/api/users/profile/:userId", getUserProfile);

router.get("/api/users/feed/:userId", checkAuth, catchErrors(getUserFeed));

/**
 * POST ROUTES: /api/posts
 */
router.param("postId", getPostById);

router.put("/api/posts/like", checkAuth, catchErrors(toggleLike));
router.put("/api/posts/unlike", checkAuth, catchErrors(toggleLike));

router.put("/api/posts/comment", checkAuth, catchErrors(toggleComment));
router.put("/api/posts/uncomment", checkAuth, catchErrors(toggleComment));

router.delete("/api/posts/:postId", checkAuth, catchErrors(deletePost));

router.post(
  "/api/posts/new/:userId",
  checkAuth,
  uploadImage,
  catchErrors(resizeImage),
  catchErrors(addPost)
);
router.get("/api/posts/by/:userId", catchErrors(getPostsByUser));
router.get("/api/posts/feed/:userId", catchErrors(getPostFeed));

module.exports = router;
