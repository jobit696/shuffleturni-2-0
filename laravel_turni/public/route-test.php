<?php
echo "<h1>Route Test</h1>";

try {
    require_once __DIR__ . '/../vendor/autoload.php';
    echo "✅ Autoload OK<br>";
    
    $app = require_once __DIR__ . '/../bootstrap/app.php';
    echo "✅ App bootstrapped<br>";
    
    // Prova a fare il boot completo come fa Laravel
    $app->boot();
    echo "✅ App boot OK<br>";
    
    // Prova a caricare la configurazione
    $config = $app->make('config');
    echo "✅ Config service OK<br>";
    
    // Prova route loading
    $router = $app->make('router');
    echo "✅ Router service OK<br>";
    
    // Prova a simulare una richiesta HTTP
    $request = \Illuminate\Http\Request::createFromGlobals();
    echo "✅ Request created<br>";
    
    echo "<br>Tutto sembra OK! Il problema potrebbe essere nelle routes o nel controller.<br>";
    
} catch (Exception $e) {
    echo "❌ ERROR: " . $e->getMessage() . "<br>";
    echo "File: " . $e->getFile() . " Line: " . $e->getLine() . "<br>";
    echo "Stack trace:<pre>" . $e->getTraceAsString() . "</pre>";
}
?>
