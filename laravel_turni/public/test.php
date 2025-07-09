<?php
echo "PHP funziona!<br>";
echo "Laravel path: " . __DIR__ . "/../<br>";
echo "Storage writable: " . (is_writable(__DIR__ . "/../storage") ? "YES" : "NO") . "<br>";
echo "Database exists: " . (file_exists(__DIR__ . "/../database/database.sqlite") ? "YES" : "NO") . "<br>";
echo "Current directory: " . getcwd() . "<br>";
echo "Files in current dir: <br>";
foreach(scandir('.') as $file) {
    echo "- $file<br>";
}

try {
    require_once __DIR__ . '/../vendor/autoload.php';
    echo "Autoload OK<br>";
    
    $app = require_once __DIR__ . '/../bootstrap/app.php';
    echo "Bootstrap OK<br>";
    
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "<br>";
    echo "Stack trace: <pre>" . $e->getTraceAsString() . "</pre>";
}
?>
