<?php
// Set proper headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Function to send standardized API response
function sendResponse($status, $data = null, $message = null, $httpCode = 200) {
    http_response_code($httpCode);
    $response = ['status' => $status];
    
    if ($status === 'success' && $data !== null) {
        $response['data'] = $data;
    }
    
    if ($status === 'error' && $message !== null) {
        $response['message'] = $message;
    }
    
    echo json_encode($response);
    exit;
}

// Function to sanitize input data
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Process only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse('error', null, 'Method not allowed', 405);
}

// Get the posted data
$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);

// If data is not properly formatted
if (!$data || !is_array($data)) {
    sendResponse('error', null, 'Invalid data format', 400);
}

// Validate required fields
$requiredFields = ['name', 'email', 'subject', 'message'];
$validationErrors = [];

foreach ($requiredFields as $field) {
    if (!isset($data[$field]) || empty(trim($data[$field]))) {
        $validationErrors[] = "Field '$field' is required";
    } else {
        // Sanitize the input
        $data[$field] = sanitizeInput($data[$field]);
    }
}

// If there are validation errors, return them all at once
if (!empty($validationErrors)) {
    sendResponse('error', null, implode('. ', $validationErrors), 400);
}

// Validate email format
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    sendResponse('error', null, 'Invalid email format', 400);
}

// Validate message length
if (strlen($data['message']) < 10) {
    sendResponse('error', null, 'Message must be at least 10 characters long', 400);
}

// Additional validation for name (only letters, spaces, and some special characters)
if (!preg_match('/^[a-zA-Z\s.\'-]+$/', $data['name'])) {
    sendResponse('error', null, 'Name contains invalid characters', 400);
}

// If we're here, all validations passed
// In a real implementation, this would send an email

// Recipients would be:
$to = "roboticsengineering.re@gmail.com, contact@kanwalrajrahi.com, kanwalrajrahi@gmail.com";
$subject = "Contact Form: " . $data['subject'];
$message = "Name: " . $data['name'] . "\n";
$message .= "Email: " . $data['email'] . "\n";
$message .= "Subject: " . $data['subject'] . "\n\n";
$message .= "Message:\n" . $data['message'];

// Additional headers
$headers = "From: " . $data['email'] . "\r\n";
$headers .= "Reply-To: " . $data['email'] . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Attempt to send the email (commented out for demo purposes)
// $mailSent = mail($to, $subject, $message, $headers);

// For demo purposes, pretend it was sent successfully
// In a real implementation, you would check $mailSent

// Return success response with timestamp
sendResponse('success', [
    'message' => 'Your message has been sent successfully!',
    'timestamp' => date('Y-m-d H:i:s')
], null, 201);
?>
