<?php
echo "<h1>Laravel Files Check</h1>";

$files = [
    '../config/app.php',
    '../bootstrap/app.php', 
    '../bootstrap/providers.php',
    '../vendor/laravel/framework/src/Illuminate/Foundation/Application.php'
];

foreach ($files as $file) {
    if (file_exists(__DIR__ . '/' . $file)) {
        echo "✅ $file exists<br>";
    } else {
        echo "❌ $file MISSING<br>";
    }
}

// Controlla service providers nel config
if (file_exists(__DIR__ . '/../config/app.php')) {
    $config = include __DIR__ . '/../config/app.php';
    echo "<br>Service Providers in config:<br>";
    foreach ($config['providers'] ?? [] as $provider) {
        echo "- $provider<br>";
    }
}
?>
