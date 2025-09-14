import express from 'express'
import multer from 'multer'
import upload from '../middleware/multer.js'
import { addProducts, listProducts, singleProducts, removeProducts } from '../controllers/productController.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();
productRouter.post(
  '/add', adminAuth,
  (req, res, next) => {
    // Check if the request has any files
    if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
      return res.status(400).json({
        success: false,
        message: 'Content-Type must be multipart/form-data for file uploads'
      });
    }
    next();
  },
  upload.any(), // Use upload.any() to accept any field names
  (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File too large. Maximum size is 5MB.' });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({ success: false, message: 'Too many files. Maximum 4 images allowed.' });
      }
      return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  },
  addProducts
);



productRouter.get('/list', listProducts);

productRouter.post('/single', singleProducts);

productRouter.delete('/remove/:id', adminAuth, removeProducts);

export default productRouter;
// listProducts singleProducts removeProducts