<?php
echo "PHP funziona!<br>";
echo "Storage writable: " . (is_writable(__DIR__ . "/../storage") ? "YES" : "NO") . "<br>";

try {
    require_once __DIR__ . '/../vendor/autoload.php';
    echo "Autoload OK<br>";
    
    $app = require_once __DIR__ . '/../bootstrap/app.php';
    echo "Bootstrap OK<br>";
    
    // Test semplice senza config()
    echo "DB_CONNECTION dalla env: " . env('DB_CONNECTION') . "<br>";
    
    // Prova a fare il boot completo dell'app
    $app->boot();
    echo "App Boot OK<br>";
    
    // Ora prova config
    echo "Config default db: " . config('database.default') . "<br>";
    
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "<br>";
    echo "File: " . $e->getFile() . " Line: " . $e->getLine() . "<br>";
}
?>
