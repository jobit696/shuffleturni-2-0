// ❌ Rimuovi questa riga
// import { createElement } from "react";

let add_user = document.getElementById('add_user');
let calc_button = document.getElementById('calc_button');
let users_container = document.getElementById('users_container');
let results_row = document.getElementById('results_row');
let user_counter = 1; // ✅ Parte da 1 (primo utente già presente)
let calculated = false;
let counted_errors = 0;
let errors = []; // ✅ Aggiungi questa variabile globale

function addUserFunction() {
    user_counter += 1; // ✅ CORREZIONE: Incrementa prima
    let user_num = user_counter;

    // ✅ CORREZIONE: Crea con la stessa struttura della pagina stilizzata
    let userContainer = document.createElement('div');
    userContainer.classList.add('user-input-container');
    userContainer.innerHTML = `
        <div class="row align-items-center">
            <div class="col-10">
                <div class="form-group mb-0">
                    <label class="form-label" for="user-input${user_num}">
                        <i class="fas fa-user-circle"></i>
                        Lavoratore ${user_num}
                    </label>
                    <input type="text" id="user-input${user_num}" class="form-control user-input" placeholder="Inserisci nome..." required>
                </div>
            </div>
            <div class="col-2 text-end">
                <i class="far fa-times-circle remove_button"></i>
            </div>
        </div>
    `;

    // Trova il pulsante remove appena creato e aggiungi l'event listener
    let removeButton = userContainer.querySelector('.remove_button');
    removeButton.addEventListener('click', function() {
        // ✅ Animazione di uscita fluida
        userContainer.style.transition = 'all 0.3s ease';
        userContainer.style.transform = 'translateX(-100%)';
        userContainer.style.opacity = '0';

        setTimeout(() => {
            userContainer.remove();
            // ✅ CORREZIONE: Rinumera tutti i lavoratori dopo la rimozione
            renumberWorkers();
        }, 300);

        // ✅ Pulisci i risultati se erano già calcolati
        if (calculated) {
            let resultsContent = results_row.querySelector('.results-content');
            resultsContent.innerHTML = '<div class="text-center text-muted py-5"><i class="fas fa-calculator fa-3x mb-3" style="opacity: 0.3;"></i><p>Inserisci gli orari e i lavoratori, poi clicca "Calcola Turni" per vedere i risultati.</p></div>';
            calculated = false;
        }
    });

    users_container.querySelector('.users-container-content').appendChild(userContainer);
}

// ✅ NUOVA FUNZIONE: Rinumera tutti i lavoratori
function renumberWorkers() {
    let allUsers = document.querySelectorAll('.user-input-container');
    user_counter = 0;

    allUsers.forEach((container, index) => {
        user_counter = index + 1;
        let label = container.querySelector('.form-label');
        let input = container.querySelector('.user-input');

        // Aggiorna il numero nel label
        label.innerHTML = `<i class="fas fa-user-circle"></i> Lavoratore ${user_counter}`;

        // Aggiorna l'ID dell'input
        input.id = `user-input${user_counter}`;
        label.setAttribute('for', `user-input${user_counter}`);
    });
}

// Verifica che gli orari siano validi
function validateTimeInputs() {
    let timeStart = document.getElementById('timeStart');
    let timeEnd = document.getElementById('timeEnd');

    let errors = [];

    // Controlla orario inizio
    if (!timeStart.value) {
        errors.push('Orario di inizio mancante');
        timeStart.style.borderColor = 'red';
    } else {
        timeStart.style.borderColor = '';
    }

    // Controlla orario fine
    if (!timeEnd.value) {
        errors.push('Orario di fine mancante');
        timeEnd.style.borderColor = 'red';
    } else {
        timeEnd.style.borderColor = '';
    }

    // ✅ CORREZIONE: Controllo migliorato per turni notturni
    if (timeStart.value && timeEnd.value) {
        // Permetti turni notturni (es: 23:00 - 06:00)
        // Solo se sono uguali è un errore
        if (timeStart.value === timeEnd.value) {
            errors.push('L\'orario di fine deve essere diverso da quello di inizio');
            timeEnd.style.borderColor = 'red';
        }
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Verifica che gli utenti siano validi
function user_verification() {
    let all_user = document.querySelectorAll('.user-input');
    counted_errors = 0; // ✅ Reset del contatore
    errors = []; // ✅ Reset degli errori

    all_user.forEach((element, index) => {
        if (element.value.trim() === '') { // ✅ Usa trim() per controllare spazi vuoti
            counted_errors += 1;
            element.style.borderColor = 'var(--danger-color)'; // ✅ Usa colori del tema
        } else {
            element.style.borderColor = ''; // ✅ Rimuovi evidenziazione se compilato
        }
    });

    if (counted_errors > 0) {
        errors.push(`Inserisci un nome per tutti i ${counted_errors} lavoratori mancanti!`);
    }
}

function add_user_work(nome, minutiTotali, orarioInizio, orarioFine, turno) {
    let div = document.createElement('div');
    div.classList.add('mb-2');

    // ✅ CORREZIONE: Calcolo preciso ore:minuti
    let ore = Math.floor(minutiTotali / 60);
    let minuti = minutiTotali % 60;
    let oreFormattate = `${ore}:${minuti.toString().padStart(2, '0')}`;

    // ✅ CORREZIONE: Usa la stessa struttura stilizzata COMPATTA
    div.innerHTML = `
        <div class="p-2" style="
            background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%);
            border: 1px solid rgba(102, 126, 234, 0.2);
            border-radius: 10px;
            transition: all 0.3s ease;
            animation: bounceIn 0.6s ease-out;
        ">
            <h6 style="color: var(--dark-color); font-weight: 700; margin-bottom: 0.5rem; font-size: 0.95rem;">
                <i class="fas fa-user" style="color: var(--primary-color);"></i> ${nome}
            </h6>
            <div style="font-size: 0.85rem;">
                <span style="color: var(--primary-color); font-weight: 600;">Turno ${turno}</span> •
                <span style="color: var(--secondary-color); font-weight: 600;">${oreFormattate}</span> •
                <span style="color: var(--dark-color); font-weight: 500;">${orarioInizio} - ${orarioFine}</span>
            </div>
        </div>
    `;

    let resultsContent = results_row.querySelector('.results-content');
    resultsContent.appendChild(div);

    // ✅ Aggiungi hover effect dinamicamente
    let resultCard = div.querySelector('.p-2');
    resultCard.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.3)';
        this.style.borderColor = 'var(--primary-color)';
    });

    resultCard.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        this.style.borderColor = 'rgba(102, 126, 234, 0.2)';
    });
}

// ✅ FUNZIONE CALCULATE COMPLETAMENTE RISCRITTA
function calculate() {
    // ✅ Pulisci i risultati precedenti
    let resultsContent = results_row.querySelector('.results-content');
    resultsContent.innerHTML = '';

    let all_user = document.querySelectorAll('.user-input');
    let timeStart = document.getElementById('timeStart').value;
    let timeEnd = document.getElementById('timeEnd').value;

    // ✅ CORREZIONE: Calcolo preciso in minuti
    let [startHour, startMinute] = timeStart.split(':').map(Number);
    let [endHour, endMinute] = timeEnd.split(':').map(Number);

    let startTotalMinutes = startHour * 60 + startMinute;
    let endTotalMinutes = endHour * 60 + endMinute;

    // Se l'orario di fine è il giorno dopo (es: 23:00 - 06:00)
    if (endTotalMinutes <= startTotalMinutes) {
        endTotalMinutes += 24 * 60; // Aggiungi 24 ore in minuti
    }

    let minutiTotali = endTotalMinutes - startTotalMinutes;
    let numeroUtenti = all_user.length;
    let minutiPerUtente = Math.floor(minutiTotali / numeroUtenti);

    // ✅ Aggiungi un titolo ai risultati con riepilogo STILIZZATO
    let titleDiv = document.createElement('div');
    titleDiv.classList.add('mb-3');

    // Converti minuti totali in ore:minuti per il riepilogo
    let oreTotaliInt = Math.floor(minutiTotali / 60);
    let minutiTotaliResto = minutiTotali % 60;
    let oreTotaliFormatted = `${oreTotaliInt}:${minutiTotaliResto.toString().padStart(2, '0')}`;

    // Converti minuti per utente in ore:minuti per il riepilogo
    let orePerUtenteInt = Math.floor(minutiPerUtente / 60);
    let minutiPerUtenteResto = minutiPerUtente % 60;
    let orePerUtenteFormatted = `${orePerUtenteInt}:${minutiPerUtenteResto.toString().padStart(2, '0')}`;

    titleDiv.innerHTML = `
        <div class="alert alert-info" style="
            background: rgba(102, 126, 234, 0.1);
            border: 2px solid rgba(102, 126, 234, 0.3);
            border-radius: 12px;
            color: var(--dark-color);
            padding: 1rem;
            margin-bottom: 1rem;
        ">
            <h6 style="color: var(--primary-color); font-weight: 700; margin-bottom: 0.75rem;">
                🎲 Turni Randomizzati
            </h6>
            <p style="margin-bottom: 0.25rem; font-size: 0.9rem;">
                <strong>⏰ Totale:</strong> ${timeStart} - ${timeEnd} (${oreTotaliFormatted})
            </p>
            <p style="margin-bottom: 0.25rem; font-size: 0.9rem;">
                <strong>👥 Lavoratori:</strong> ${numeroUtenti}
            </p>
            <p style="margin-bottom: 0; font-size: 0.9rem;">
                <strong>⏱️ Ore/persona:</strong> ${orePerUtenteFormatted}
            </p>
        </div>
    `;
    resultsContent.appendChild(titleDiv);

    // 🎲 CORREZIONE: Crea array di turni sequenziali
    let turni = [];
    let currentMinutes = startTotalMinutes;

    for (let i = 0; i < numeroUtenti; i++) {
        let endMinutes = currentMinutes + minutiPerUtente;

        // Converti minuti in formato HH:MM
        let startHour = Math.floor(currentMinutes / 60) % 24;
        let startMin = currentMinutes % 60;
        let endHour = Math.floor(endMinutes / 60) % 24;
        let endMin = endMinutes % 60;

        let orarioInizio = `${startHour.toString().padStart(2, '0')}:${startMin.toString().padStart(2, '0')}`;
        let orarioFine = `${endHour.toString().padStart(2, '0')}:${endMin.toString().padStart(2, '0')}`;

        // Se va oltre la mezzanotte
        let giornoSuccessivo = '';
        if (endMinutes >= 24 * 60) {
            giornoSuccessivo = ' (+1 giorno)';
        }

        turni.push({
            numero: i + 1,
            inizio: orarioInizio,
            fine: orarioFine + giornoSuccessivo,
            minuti: minutiPerUtente
        });

        currentMinutes = endMinutes;
    }

    // 🎲 CORREZIONE: Crea array di utenti
    let utenti = [];
    all_user.forEach((element) => {
        if (element.value.trim() !== '') {
            utenti.push(element.value.trim());
        }
    });

    // 🎲 CORREZIONE: Funzione per mescolare array (Fisher-Yates shuffle) POTENZIATA
    function shuffleArray(array) {
        let shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // 🎲 TRIPLO SHUFFLE per garantire massima randomizzazione
    let utentiMischiati = shuffleArray(shuffleArray(shuffleArray(utenti)));
    let turniMischiati = shuffleArray(shuffleArray(shuffleArray(turni)));

    // 🎲 CORREZIONE: Assegna turni randomici agli utenti
    utentiMischiati.forEach((nome, index) => {
        let turnoAssegnato = turniMischiati[index];

        add_user_work(
            nome,
            turnoAssegnato.minuti, // Passa minuti direttamente
            turnoAssegnato.inizio,
            turnoAssegnato.fine,
            turnoAssegnato.numero
        );
    });

    calculated = true; // ✅ Segna come calcolato
}

function final_calc() {
    counted_errors = 0;
    errors = [];

    user_verification();

    if (counted_errors === 0) {
        calculate();
    } else {
        alert('Errori trovati:\n' + errors.join('\n'));
    }
}

// Event Listeners
add_user.addEventListener('click', function() {
    addUserFunction();
});

calc_button.addEventListener('click', function(e) {
    e.preventDefault();

    let validation = validateTimeInputs();

    if (!validation.isValid) {
        alert('Errori trovati:\n' + validation.errors.join('\n'));
        return;
    }

    // ✅ Controlla che ci sia almeno un utente
    let all_user = document.querySelectorAll('.user-input');
    if (all_user.length === 0) {
        alert('Aggiungi almeno un utente prima di calcolare!');
        return;
    }

    console.log('Form valido, procedi con il calcolo');
    final_calc();
});
