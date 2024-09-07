<?php
// Database connection
$host = 'localhost';  // Update with your host
$dbname = 'your_database'; // Update with your database name
$username = 'root'; // Update with your database username
$password = ''; // Update with your database password

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Encryption key (32 characters for AES-256 encryption)
$encryption_key = "YOUR_RANDOM_ENCRYPTION_KEY"; // This should be stored securely

// Function to encrypt emails
function encrypt_email($email, $key) {
    $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc')); // Generate IV
    $encrypted = openssl_encrypt($email, 'aes-256-cbc', $key, 0, $iv);
    return base64_encode($encrypted . '::' . $iv); // Encode encrypted email and IV
}

// Function to hash passwords
function hash_password($password) {
    return password_hash($password, PASSWORD_BCRYPT); // Hash the password with bcrypt
}

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Input validation
    if (empty($username) || empty($email) || empty($password) || empty($confirm_password)) {
        die('Please fill in all the fields.');
    }

    if ($password !== $confirm_password) {
        die('Passwords do not match.');
    }

    // Encrypt email
    $encrypted_email = encrypt_email($email, $encryption_key);

    // Hash the password
    $hashed_password = hash_password($password);

    // Check if the user or email already exists
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username OR email = :email");
    $stmt->execute([
        ':username' => $username,
        ':email' => $encrypted_email
    ]);

    if ($stmt->rowCount() > 0) {
        die('Username or email already exists.');
    }

    // Insert the new user into the database
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
    $result = $stmt->execute([
        ':username' => $username,
        ':email' => $encrypted_email,
        ':password' => $hashed_password
    ]);

    if ($result) {
        echo 'Registration successful!';
    } else {
        echo 'Error registering user.';
    }
}
?>
