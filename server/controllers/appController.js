const db = require('../config/db');

const addNewRequest = async (req, res) => {
    try {
        console.log('Incoming request data:', req.body);

        const { student_id, reason } = req.body;

        if (!reason) {
            return res.status(400).json({ error: 'Reason is required.' });
        }

        const result = await db.query(
            `INSERT INTO requests (student_id, reason, requested_at, status)
            VALUES (?, ?, NOW(), 'pending')`, [student_id, reason]
        );

        res.status(200).json({
            request_id: result.insertId,
            reason,
            date: new Date().toISOString().slice(0, 10),
            time: new Date().toLocaleTimeString() 
        });
    } catch (error) {
        console.error('Error processing request:', error.message);
        console.error('Stack trace:', error.stack);
        res.status(500).json({ error: 'Failed to process request' });
    }
};

const getAppointments = async (req, res) => {
    try {
        const query = `
            SELECT 
                r.student_id,
                u.name AS studentName,
                u.course,
                r.reason,
                r.requested_at,
                r.request_id,
                r.status
            FROM 
                requests r
            JOIN 
                users u ON r.student_id = u.student_id
            ORDER BY 
                r.requested_at ASC;`; 

        console.log('Executing query:', query);
        const [results] = await db.query(query); 

        console.log('Query results:', results); 
        res.json(results);
    } catch (error) {
        console.error('Error in getAppointments:', error);
        res.status(500).json({ error: 'An error occurred while fetching appointments' });
    }
};

const getUserAppointments = async (req, res) => {
    const studentId = req.params.studentId; 

    if (!studentId) {
        return res.status(400).json({ error: 'Student ID is required' });
    }

    try {
      
        const query = `
            SELECT 
                r.request_id,
                r.student_id,
                u.name AS studentName,
                u.course,
                r.reason,
                r.requested_at,
                r.status
            FROM 
                requests r
            JOIN 
                users u ON r.student_id = u.student_id
            WHERE 
                r.student_id = ?  -- Filter by student_id
            ORDER BY 
                r.requested_at ASC;
        `;

        console.log('Executing query:', query);
        const [results] = await db.query(query, [studentId]);

        console.log('Query results:', results);
        res.json(results);  
    } catch (error) {
        console.error('Error in getUserAppointments:', error);
        res.status(500).json({ error: 'An error occurred while fetching appointments' });
    }
};


const acceptRequest = async (req, res) => {
    const { request_id } = req.body;

    try {
        const query = `UPDATE requests SET status = 'approved' WHERE request_id = ?`;
        const [result] = await db.query(query, [request_id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Appointment accepted successfully' });
        } else {
            res.status(404).json({ error: 'Appointment not found' });
        }
    } catch (error) {
        console.error('Error processing accept request:', error.message);
        res.status(500).json({ error: 'Failed to accept appointment' });
    }
};

const declineRequest = async (req, res) => {
    const { request_id } = req.body;  

    try {
        const query = `UPDATE requests SET status = 'declined' WHERE request_id = ?`;  
        const [result] = await db.query(query, [request_id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Appointment declined successfully' });
        } else {
            res.status(404).json({ error: 'Appointment not found' });
        }
    } catch (error) {
        console.error('Error processing decline request:', error.message);
        res.status(500).json({ error: 'Failed to decline appointment' });
    }
};

const markAsComplete = async (req, res) => {
    const { request_id } = req.body;

    if (!request_id) {
        return res.status(400).json({ error: 'Request ID is required.' });
    }

    try {
        const query = `UPDATE requests SET status = 'completed' WHERE request_id = ?`;
        const [result] = await db.query(query, [request_id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Appointment marked as complete successfully.' });
        } else {
            res.status(404).json({ error: 'Appointment not found.' });
        }
    } catch (error) {
        console.error('Error marking appointment as complete:', error.message);
        res.status(500).json({ error: 'Failed to mark appointment as complete.' });
    }
};


const sendMessage = async (req, res) => {
    const { sender_id, receiver_id, message_text } = req.body;
  
    console.log('Received message:', req.body); // Log the incoming request body
  
    if (!sender_id || !receiver_id || !message_text) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    try {
      const query = `
        INSERT INTO messages (sender_id, receiver_id, message_text, sent_at, is_read)
        VALUES (?, ?, ?, NOW(), 0)
      `;
      const [result] = await db.query(query, [sender_id, receiver_id, message_text]);
  
      res.status(201).json({ message_id: result.insertId, sender_id, receiver_id, message_text });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  };
  

const getMessages = async (req, res) => {
    const { userId, chatPartnerId } = req.query;

    if (!userId || !chatPartnerId) {
        return res.status(400).json({ error: 'Both userId and chatPartnerId are required.' });
    }

    try {
        const query = `
            SELECT * FROM messages
            WHERE (sender_id = ? AND receiver_id = ?)
               OR (sender_id = ? AND receiver_id = ?)
            ORDER BY sent_at ASC
        `;
        const [results] = await db.query(query, [userId, chatPartnerId, chatPartnerId, userId]);

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

const getChatHistory = async (req, res) => {
    try {
        const [rows] = await db.execute(
            `SELECT 
                m.sender_id, 
                u.name, 
                MAX(m.sent_at) AS latest_message_time, 
                MAX(m.is_read) AS is_read
             FROM messages m
             JOIN users u ON m.sender_id = u.student_id
             WHERE m.receiver_id = '00-0000'
             GROUP BY m.sender_id, u.name
             ORDER BY latest_message_time DESC`
        );
  
        res.json(rows);
    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).send('Internal Server Error');
    }
};

const markAsRead = async (req, res) => {
    const { senderId } = req.body;

    if (!senderId) {
        return res.status(400).json({ error: "Sender ID is required." });
    }

    try {
        const query = `
            UPDATE messages
            SET is_read = true
            WHERE sender_id = ? AND receiver_id = '00-0000'
        `;
        await db.query(query, [senderId]);
        res.status(200).json({ message: "Message marked as read." });
    } catch (error) {
        console.error("Error marking message as read:", error);
        res.status(500).json({ error: "Failed to update message status." });
    }
};

const sendCounselorMessage = async (req, res) => {
    const { receiver_id, message_text } = req.body;
    const sender_id = '00-0000'; // Fixed counselor's ID
  
    if (!receiver_id || !message_text) {
      return res.status(400).json({ error: 'Receiver ID and message text are required.' });
    }
  
    try {
      const query = `
        INSERT INTO messages (sender_id, receiver_id, message_text, sent_at, is_read)
        VALUES (?, ?, ?, NOW(), 0)
      `;
      const [result] = await db.query(query, [sender_id, receiver_id, message_text]);
  
      res.status(201).json({
        message_id: result.insertId,
        sender_id,
        receiver_id,
        message_text,
      });
    } catch (error) {
      console.error('Error sending counselor message:', error);
      res.status(500).json({ error: 'Failed to send message.' });
    }
  };

  const getRequestCounts = async (req, res) => {
    try {
        const query = `
            SELECT 
                COUNT(*) AS totalRequests,
                SUM(status = 'pending') AS totalPending,
                SUM(status = 'approved') AS totalApproved,
                SUM(status = 'completed') AS totalCompleted
            FROM requests;
        `;
        const [results] = await db.query(query);

        // Sending the first result row containing the counts
        res.status(200).json(results[0]);
    } catch (error) {
        console.error("Error fetching request counts:", error);
        res.status(500).json({ error: "Failed to fetch request counts." });
    }
};

const getAppointmentsByStudentId = async (req, res) => {
    const { studentId } = req.query;

    if (!studentId) {
        return res.status(400).json({ error: 'Student ID is required' });
    }

    try {
        const query = 'SELECT * FROM requests WHERE student_id = ? ORDER BY requested_at DESC';
        const [appointments] = await db.query(query, [studentId]);

        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found' });
        }

        return res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    addNewRequest,
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
};
