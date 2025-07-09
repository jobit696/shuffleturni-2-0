<x-app title="Homepage">
   <x-navbar/>
    <div class="container">
        <div class="main-container" >
            <h1 class="main-title" >
                <i class="fas fa-clock"></i>
                ShuffleTurni 2.0
            </h1>

            <div class="form-content">
                <!-- COLONNA SINISTRA - GESTIONE LAVORATORI -->
                <div class="form-left">
                    <!-- SECTION ADD USERS -->
                    <div class="form-section add-users hover-glow">
                        <h4 class="section-header">
                            <i class="fas fa-user-plus"></i>
                            Aggiungi Lavoratore
                        </h4>
                        <span class="button_add" id="add_user">
                            <i class="fas fa-plus"></i>
                            Nuovo Lavoratore
                        </span>
                    </div>

                    <!-- SECTION USERS -->
                    <div id="users_container" class="form-section users-list">
                        <h4 class="section-header">
                            <i class="fas fa-users"></i>
                            Lista Lavoratori
                        </h4>
                        <div class="users-container-content">
                            <div class="user-input-container">
                                <div class="row align-items-center">
                                    <div class="col-10">
                                        <div class="form-group mb-0">
                                            <label class="form-label" for="user-input1">
                                                <i class="fas fa-user-circle"></i>
                                                Lavoratore 1
                                            </label>
                                            <input type="text" id="user-input1" class="form-control user-input" placeholder="Inserisci nome..." required>
                                        </div>
                                    </div>
                                    <div class="col-2 text-end">
                                        <!-- Primo utente non ha pulsante rimuovi -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- COLONNA CENTRALE - ORARI -->
                <div class="form-center">
                    <form action="#" method="get">
                        <!-- ORARIO INIZIO -->
                        <div class="form-section time-start hover-glow">
                            <h4 class="section-header">
                                <i class="fas fa-play-circle"></i>
                                Orario Inizio Turno
                            </h4>
                            <div class="form-group mb-0">
                                <label class="form-label" for="timeStart">
                                    <i class="fas fa-sunrise"></i>
                                    Dalle
                                </label>
                                <input class="form-control" id="timeStart" type="time" required>
                            </div>
                        </div>

                        <!-- ORARIO FINE -->
                        <div class="form-section time-end hover-glow mt-3">
                            <h4 class="section-header">
                                <i class="fas fa-stop-circle"></i>
                                Orario Fine Turno
                            </h4>
                            <div class="form-group mb-0">
                                <label class="form-label" for="timeEnd">
                                    <i class="fas fa-sunset"></i>
                                    Alle
                                </label>
                                <input class="form-control" id="timeEnd" type="time" required>
                            </div>
                        </div>
                    </form>
                </div>

                <!-- COLONNA DESTRA - RISULTATI E CALCOLA -->
                <div class="form-right">
                    <!-- SECTION CALCULATE -->
                    <div class="form-section calculate hover-glow">
                        <button type="submit" class="calc_button" id="calc_button">
                            <i class="fas fa-calculator"></i>
                            Calcola Turni
                        </button>
                    </div>

                    <div id="results_row" class="results-section mt-3">
                        <h4 class="section-header">
                            <i class="fas fa-chart-bar"></i>
                            Risultati Turni
                        </h4>
                        <div class="results-content">
                            <div class="text-center text-muted py-5">
                                <i class="fas fa-calculator fa-3x mb-3" style="opacity: 0.3;"></i>
                                <p>Inserisci gli orari e i lavoratori, poi clicca "Calcola Turni" per vedere i risultati.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     <x-footer/>
</x-app>
