const Product = require('../models/Product');

const showProductsAPI = async (req, res) => {
  try{
    const products = await Product.find();
    
    if (req.session && req.session.uid) { 
    
     res.json(products);
    } else {
    
      res.json(products);
    }
  } catch (error) {
    console.error('Error al obtener los elementos:', error);
    res.status(500).send('Error del servidor');
  }
};

const showProductByIdAPI = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).send('Error del servidor');
  }
};

const showProductsByCategoryAPI = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category: category });
    res.json(products);
  } catch (error) {
    console.error('Error al obtener los elementos:', error);
    res.status(500).send('Error del servidor');
  }
};

const createProductAPI = async (req, res) => {
  try {  
      const uploadedFile = req.file;
      const filePath = uploadedFile
        ? '/uploads/' + uploadedFile.filename
        : '';
  
      const product = new Product({
        name: req.body.name,
        description: req.body.description,
        image: filePath,
        category: req.body.category,
        size: req.body.size,
        price: req.body.price,
      });

      await product.save();
      res.json(product)
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).send('Error del servidor');
  }
};

const editProductAPI = async (req, res) => {
  try {
    const uploadedFile = req.file;

    let product;

    if(uploadedFile) {
        const filePath = '/uploads/' + uploadedFile.filename;
        product = new Product({
           name: req.body.name, 
           description: req.body.description,
           category: req.body.category, 
           size: req.body.size,
           price: req.body.price,
           image: filePath,
           _id: req.params.productId 
          });
    }else{
        product = new Product({
            name: req.body.name, 
            description: req.body.description,
            category: req.body.category,  
            size: req.body.size,
            price: req.body.price,
            _id: req.params.productId 
           });
    }
    
    await Product.findByIdAndUpdate(
        req.params.productId,
        product,
        { new: true }
    )

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};


const deleteProductAPI = async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
        return res.status(404).send('Product not found');
    }
    res.json({message: "Product eliminated sucessfully"});
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};


module.exports = {
  showProductsAPI,
  showProductByIdAPI,
  showProductsByCategoryAPI,
  createProductAPI,
  editProductAPI,
  deleteProductAPI,
};