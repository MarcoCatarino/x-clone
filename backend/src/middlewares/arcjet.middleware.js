import { aj } from "../config/arcjet.js";

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, // Each request cosumes 1 token
    });

    //TODO: Handle to Denied Request
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          error: "Too many Requests",
          message: "Rate Limit Exceed. Pleas try again later",
        });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({
          error: "Bot access denied",
          message: "Automated Requests are not allowed",
        });
      } else {
        return res.status(403).json({
          error: "Forbidden",
          message: "Access Denied by Security Policy",
        });
      }
    }

    //TODO: Check for spoofed bots
    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      return res.status(403).json({
        error: "Spofed Bot Detected",
        message: "Malicious Bot Activity Detected",
      });
    }

    //TODO: If all of this rules are checked then we can continue
    next();
  } catch (error) {
    console.error("Arcjet Middleware Error: ", error);
    // Allow request of Continue Arcjet Fails
    next();
  }
};
