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
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ 
      message: 'An unexpected server error occurred.',
      error: error.message 
    });
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

// Delete callback request by ID
exports.deleteCallbackRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CallbackRequest.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Callback request not found' });
    }
    res.status(200).json({ message: 'Callback request deleted successfully' });
  } catch (error) {
    console.error('Error deleting callback request:', error);
    res.status(500).json({ message: 'Server error, could not delete callback request' });
  }
};

exports.markAsViewed = async (req, res) => {
  try {
    const callback = await CallbackRequest.findById(req.params.id);
    if (!callback) {
      return res.status(404).json({ message: 'Callback request not found' });
    }

    if (callback.isViewed) {
      return res.status(400).json({ message: 'This callback has already been marked as viewed.' });
    }

    callback.isViewed = true;
    callback.viewedAt = new Date();
    callback.deleteAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour from now

    await callback.save();

    res.status(200).json({ 
      message: 'Marked as viewed. Will be auto-deleted in 1 hour.',
      callback
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error while updating callback.' });
  }
}; 