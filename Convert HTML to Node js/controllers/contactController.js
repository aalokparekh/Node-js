const Contact = require('../models/contact');

exports.getContactPage = (req, res) => {
  res.render('contact');
};

exports.postContactForm = async (req, res) => {
  const { name, email, message } = req.body;
  const newContact = new Contact({ name, email, message });
  
  try {
    await newContact.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error saving contact');
  }
};
