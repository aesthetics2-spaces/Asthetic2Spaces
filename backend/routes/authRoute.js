import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Start Google OAuth
router.get("/google", 
  passport.authenticate("google", { 
    scope: ["profile", "email"] 
  })
);

// Google callback
router.get("/google/callback",
  passport.authenticate("google", { 
    failureRedirect: `${process.env.CLIENT_URL}/signup` 
  }),
  (req, res) => {
    try {
      // Generate JWT token
      const token = jwt.sign(
        { 
          id: req.user._id,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          email: req.user.email,
          avatar: req.user.avatar || "",
          role: req.user.role || "user"
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: "7d" }
      );

      // Prepare user data
      const user = {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        avatar: req.user.avatar || "",
        role: req.user.role || "user"
      };

      // Encode user object for URL
      const encodedUser = encodeURIComponent(JSON.stringify(user));

      // Redirect to frontend with token and user
      res.redirect(`${process.env.CLIENT_URL}/google-success?token=${token}&user=${encodedUser}`);
    } catch (error) {
      console.error("Token generation error:", error);
      res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
    }
  }
);

// Optional: get current user
// router.get("/me", 
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.json({
//       success: true,
//       user: {
//         id: req.user._id,
//         firstName: req.user.firstName,
//         lastName: req.user.lastName,
//         email: req.user.email,
//         avatar: req.user.avatar,
//         role: req.user.role
//       }
//     });
//   }
// );

export default router;
