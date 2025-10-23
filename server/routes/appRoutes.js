const express = require('express');
const router = express.Router();

const { addNewRequest, 
        getAppointments, 
        getUserAppointments, 
        acceptRequest,
        declineRequest,
        markAsComplete,
        sendMessage,
        getMessages,
        getChatHistory,
        markAsRead,
        sendCounselorMessage,
        getRequestCounts,
        getAppointmentsByStudentId
} = require('../controllers/appController');

router.post('/add-new-request', addNewRequest)

router.get('/get-appointments', getAppointments)

router.get('/get-user-appointments/:studentId', getUserAppointments);

router.post('/accept-appointment', acceptRequest);

router.post('/decline-appointment', declineRequest);

router.post('/mark-as-complete', markAsComplete);

router.post('/send-messages', sendMessage);

router.get('/get-messages', getMessages);

router.get('/chat-history', getChatHistory);

router.post('/mark-as-read', markAsRead);

router.post('/counselor-send-message', sendCounselorMessage)

router.get('/request-counts', getRequestCounts);

router.get('/appointments', getAppointmentsByStudentId);


module.exports = router;
