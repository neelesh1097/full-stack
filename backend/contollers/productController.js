import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'
//function add product
const addProducts = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        // Check if files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No images uploaded. Please upload at least one image."
            });
        }

        // Log files for debugging
        console.log('Uploaded files:', req.files.map(f => ({ fieldname: f.fieldname, originalname: f.originalname })));

        // Limit to maximum 4 images
        if (req.files.length > 4) {
            return res.status(400).json({
                success: false,
                message: "Too many images. Maximum 4 images allowed."
            });
        }

        const images = req.files.filter(file => file.mimetype.startsWith('image/'));

        if (images.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid images found. Please upload at least one image file."
            });
        }

        let imagesUrl = await Promise.all(images.map(async (item) => {
            let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
            return result.secure_url;
        }));


        const parsedSizes = Array.isArray(sizes)
            ? sizes
            : (typeof sizes === 'string'
                ? (sizes.trim().startsWith('[')
                    ? JSON.parse(sizes)
                    : sizes.split(',').map(s => s.trim()).filter(Boolean))
                : []);

        const parsedBestseller = typeof bestseller === 'string' ? (bestseller === 'true') : !!bestseller;

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: parsedSizes,
            bestseller: parsedBestseller,
            images: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.status(201).json({ success: true, message: "Product added successfully" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }

}
//function add product
const listProducts = async (_req, res) => {
    try {
        const products = await productModel.find();
        res.json({ success: true, products })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }


}
//function add product
const removeProducts = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Product id is required" });
        }
        await productModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
//function add product
const singleProducts = async (req, res) => {
    try {
        const id = req.body?.id || req.query?.id || req.params?.id;
        if (!id) {
            return res.status(400).json({ success: false, message: "Product id is required" })
        }
        const product = await productModel.findById(id);
        res.json({ success: true, product })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


export { addProducts, listProducts, singleProducts, removeProducts }
