const CallbackRequest = require('../models/CallbackRequest');

exports.submitCallbackRequest = async (req, res) => {
  try {
    const { name, phone, date, enquiryFor } = req.body;

    // Basic validation
    if (!name || !phone || !date || !enquiryFor) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newRequest = new CallbackRequest({
      name,
      phone,
      date,
      enquiryFor
    });

    await newRequest.save();

    res.status(201).json({ message: 'Callback request submitted successfully!', request: newRequest });
  } catch (error) {
    console.error('Error submitting callback request:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
};

// Admin function to get all callback requests (to be protected later)
exports.getAllCallbackRequests = async (req, res) => {
  try {
    const requests = await CallbackRequest.find({});
    res.status(200).json({ requests });
  } catch (error) {
    console.error('Error fetching callback requests:', error);
    res.status(500).json({ message: 'Server error, could not fetch requests.' });
  }
}; 