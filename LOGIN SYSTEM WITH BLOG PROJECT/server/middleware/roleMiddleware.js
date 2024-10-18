exports.checkRole = (role) => {
    return (req, res, next) => {
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                if (err) {
                    res.status(401).json({ message: 'Unauthorized access' });
                } else {
                    const user = await User.findById(decodedToken.id);
                    if (user.role === role) {
                        req.user = user;
                        next();
                    } else {
                        res.status(403).json({ message: 'Forbidden: Access is restricted' });
                    }
                }
            });
        } else {
            res.status(401).json({ message: 'Unauthorized access' });
        }
    };
};
