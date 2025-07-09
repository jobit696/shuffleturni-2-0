<?php
echo "<h1>Laravel Helper Check</h1>";

try {
    require_once __DIR__ . '/../vendor/autoload.php';
    echo "✅ Autoload OK<br>";
    
    // Verifica che le funzioni helper Laravel siano caricate
    if (function_exists('env')) {
        echo "✅ env() function exists<br>";
    } else {
        echo "❌ env() function NOT exists<br>";
    }
    
    if (function_exists('config')) {
        echo "✅ config() function exists<br>";
    } else {
        echo "❌ config() function NOT exists<br>";
    }
    
    if (function_exists('app')) {
        echo "✅ app() function exists<br>";
    } else {
        echo "❌ app() function NOT exists<br>";
    }
    
    // Prova a caricare Bootstrap Laravel
    $app = require_once __DIR__ . '/../bootstrap/app.php';
    echo "✅ Laravel app bootstrapped<br>";
    
    // Ora verifica di nuovo le funzioni
    if (function_exists('env')) {
        echo "✅ env() function now available<br>";
        echo "APP_ENV: " . env('APP_ENV') . "<br>";
    }
    
} catch (Exception $e) {
    echo "❌ ERROR: " . $e->getMessage() . "<br>";
}
?>
