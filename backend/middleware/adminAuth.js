import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {

    try {
        const {token} = req.headers;
        if(!token){
            return res.status(401).json({success: false, message: 'Unauthorized: missing token'});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded?.role !== 'admin'){
            return res.status(401).json({success: false, message: 'Unauthorized: invalid role'});
        }
        next();
    } catch (error) {
        return res.status(401).json({success: false, message: 'Unauthorized: invalid token'});
    }
}

export default adminAuth;