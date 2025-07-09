<?php
echo "<h1>Test Semplice</h1>";
echo "PHP Version: " . phpversion() . "<br>";
echo "Current Dir: " . getcwd() . "<br>";
echo "Environment: " . ($_ENV['APP_ENV'] ?? 'not set') . "<br>";

// Test basic Laravel
try {
    require_once __DIR__ . '/../vendor/autoload.php';
    echo "✅ Composer autoload OK<br>";
    
    // Prova a caricare .env manualmente
    if (class_exists('\Dotenv\Dotenv')) {
        $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
        $dotenv->load();
        echo "✅ .env loaded<br>";
    }
    
    echo "DB_CONNECTION: " . ($_ENV['DB_CONNECTION'] ?? 'not set') . "<br>";
    echo "APP_KEY: " . (isset($_ENV['APP_KEY']) ? 'SET' : 'NOT SET') . "<br>";
    
} catch (Exception $e) {
    echo "❌ ERROR: " . $e->getMessage() . "<br>";
}
?>
