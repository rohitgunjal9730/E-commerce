const bcrypt = require('bcrypt'); // Import bcrypt
const Product = require('../models/productModel');
const User = require('../models/userModel'); // Import User model

exports.getProducts = (req, res) => {
    const products = [
        { id: 1, name: 'Product 1', price: 10.99, description: 'Description for Product 1', imageUrl: 'http://example.com/product1.jpg' },
        { id: 2, name: 'Product 2', price: 12.99, description: 'Description for Product 2', imageUrl: 'http://example.com/product2.jpg' },
        { id: 3, name: 'Product 3', price: 15.99, description: 'Description for Product 3', imageUrl: 'http://example.com/product3.jpg' },
        { id: 4, name: 'Product 4', price: 8.99, description: 'Description for Product 4', imageUrl: 'http://example.com/product4.jpg' },
        { id: 5, name: 'Product 5', price: 20.99, description: 'Description for Product 5', imageUrl: 'http://example.com/product5.jpg' },
        { id: 6, name: 'Product 6', price: 25.99, description: 'Description for Product 6', imageUrl: 'http://example.com/product6.jpg' },
        { id: 7, name: 'Product 7', price: 30.99, description: 'Description for Product 7', imageUrl: 'http://example.com/product7.jpg' },
        { id: 8, name: 'Product 8', price: 5.99, description: 'Description for Product 8', imageUrl: 'http://example.com/product8.jpg' },
        { id: 9, name: 'Product 9', price: 18.99, description: 'Description for Product 9', imageUrl: 'http://example.com/product9.jpg' },
        { id: 10, name: 'Product 10', price: 22.99, description: 'Description for Product 10', imageUrl: 'http://example.com/product10.jpg' },
    ];
    res.json(products);
};

exports.addProduct = async (req, res) => {
    try {
        const { name, price, description, imageUrl } = req.body;
        const newProduct = new Product({ name, price, description, imageUrl });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
};

exports.addMultipleProducts = async (req, res) => {
    const products = [
        { name: 'Product 11', price: 11.99, description: 'Description for Product 11', imageUrl: 'http://example.com/product11.jpg' },
        { name: 'Product 12', price: 12.99, description: 'Description for Product 12', imageUrl: 'http://example.com/product12.jpg' },
        { name: 'Product 13', price: 13.99, description: 'Description for Product 13', imageUrl: 'http://example.com/product13.jpg' },
        { name: 'Product 14', price: 14.99, description: 'Description for Product 14', imageUrl: 'http://example.com/product14.jpg' },
        { name: 'Product 15', price: 15.99, description: 'Description for Product 15', imageUrl: 'http://example.com/product15.jpg' },
        { name: 'Product 16', price: 16.99, description: 'Description for Product 16', imageUrl: 'http://example.com/product16.jpg' },
        { name: 'Product 17', price: 17.99, description: 'Description for Product 17', imageUrl: 'http://example.com/product17.jpg' },
        { name: 'Product 18', price: 18.99, description: 'Description for Product 18', imageUrl: 'http://example.com/product18.jpg' },
        { name: 'Product 19', price: 19.99, description: 'Description for Product 19', imageUrl: 'http://example.com/product19.jpg' },
        { name: 'Product 20', price: 20.99, description: 'Description for Product 20', imageUrl: 'http://example.com/product20.jpg' },
    ];

    try {
        const savedProducts = await Product.insertMany(products);
        res.status(201).json({ message: 'Products added successfully', products: savedProducts });
    } catch (error) {
        res.status(500).json({ message: 'Error adding products', error: error.message });
    }
};

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    console.log('Registering user:', username);
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.redirect('/home'); // Redirect to home page after successful registration
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    console.log('Logging in user:', username);
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).json({ message: 'User not registered. Please register first.' });
    }

    const isMatch = await bcrypt.compare(password, user.password); // Compare passwords

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.redirect('/home'); // Redirect to home page after successful login
};
