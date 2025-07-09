<?php
echo "PHP funziona!<br>";
echo "Laravel path: " . __DIR__ . "/../<br>";
echo "Storage writable: " . (is_writable(__DIR__ . "/../storage") ? "YES" : "NO") . "<br>";

try {
    require_once __DIR__ . '/../vendor/autoload.php';
    echo "Autoload OK<br>";
    
    $app = require_once __DIR__ . '/../bootstrap/app.php';
    echo "Bootstrap OK<br>";
    
    // Verifica configurazione database
    echo "DB_CONNECTION dalla env: " . env('DB_CONNECTION') . "<br>";
    echo "Config database default: " . config('database.default') . "<br>";
    
    // Prova a accedere alla configurazione
    $config = $app->make('config');
    echo "Config loaded: YES<br>";
    
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "<br>";
    echo "Stack trace: <pre>" . $e->getTraceAsString() . "</pre>";
}
?>
