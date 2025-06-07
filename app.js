// --- CONFIGURACIÓN DEL BACKEND ---
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1ZFHimOa4v30i80tQOKVyBy-O7M8jpwqrC4x0VOts0WBb9bCa-0h0zeJ1DYvL2DOF/exec';

// --- LISTA DE USUARIOS AUTORIZADOS ---
const validUsers = [
    'ADMIN',
    ...Array.from({ length: 50 }, (_, i) => `Guardian${String(i + 1).padStart(2, '0')}`)
];

// --- YA NO NECESITAMOS LOS DATOS AQUÍ ---

// --- FUNCIONES GLOBALES DE AYUDA ---
const formatTime = (totalSeconds) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

async function sendResultsToBackend(data) {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('URL_QUE_COPIASTE')) {
        console.warn("URL del script no configurada. No se enviarán los datos.");
        return;
    }
    const payload = {
        teamName: data.teamName,
        totalTime: data.status === 'finished' ? data.finalTimeDisplay : formatTime(data.mainTimer),
        totalScore: data.score,
        missionResults: data.missionResults
    };
    try {
        console.log("Enviando actualización al backend...", payload);
        const formData = new FormData();
        formData.append('payload', JSON.stringify(payload));
        
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: formData,
        });
        console.log("Actualización enviada con éxito.");
    } catch (error) {
        console.error("Error al enviar la actualización al backend:", error);
    }
}

// --- COMPONENTES DE REACT ---
const Header = ({ teamName, score, timer }) => (
    <div className="header">
        <div className="header-info">
            <span className="team-name">{teamName || "Escuadrón Desconocido"}</span>
            <span className="team-title">GUARDIANES DEL TIEMPO</span>
        </div>
        <div className="header-score">
            <span className="score">{score} FRAGMENTOS</span>
            <span className="timer">⏳ {formatTime(timer)}</span>
        </div>
    </div>
);

const LoginPage = ({ onLogin, setErrorMessage, errorMessage }) => {
    const [squadCode, setSquadCode] = React.useState('');
    const logoUrl = "imagenes/LOGO 3 (1).png";
    const handleLoginInternal = () => {
        const enteredCode = squadCode.trim();
        if (validUsers.includes(enteredCode)) {
            onLogin(enteredCode, enteredCode);
            if (typeof setErrorMessage === 'function') setErrorMessage('');
        } else {
            if (typeof setErrorMessage === 'function') setErrorMessage('⚠️ Código de Guardián no válido. Verifica tus credenciales.');
        }
    };
    return (
        <div className="login-container">
            <img src={logoUrl} alt="Logo Guardianes del Tiempo" className="logo" onError={(e) => { e.target.onerror = null; e.target.src="https://i.imgur.com/ZKiX1mO.png"; }} />
            <h1>RUTA DEL TESORO:<br/>GUARDIANES DEL TIEMPO</h1>
            <p className="lema">"¡El legado de San Juan te necesita! ¿Aceptas la misión?"</p>
            <label htmlFor="squadCode">Código de Guardián:</label>
            <input id="squadCode" type="text" placeholder="Ingresa tu código de Guardián" value={squadCode} onChange={(e) => setSquadCode(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleLoginInternal()} />
            <button className="primary-button" onClick={handleLoginInternal}>ACTIVAR GUÍA DEL TIEMPO</button>
            <div className="sponsors-section">
                <h2 className="sponsors-title">ASISTENTES DEL TIEMPO</h2>
                <p className="sponsors-description">Recuerda visitar nuestros Asistentes del Tiempo, tendrán sorpresas y puntos bonus para vos.</p>
                <div className="sponsors-grid">
                    <div className="sponsor-item"><img src="imagenes/muni cap.png" alt="Logo Municipalidad de la Capital" className="sponsor-logo" /></div>
                    <div className="sponsor-item"><img src="imagenes/muni riv.png" alt="Logo Municipalidad de Rivadavia" className="sponsor-logo" /></div>
                    <div className="sponsor-item"><img src="imagenes/muni santa lucia.jpg" alt="Logo Municipalidad de Santa Lucía" className="sponsor-logo" /></div>
                    <div className="sponsor-item"><img src="imagenes/portho.jpg" alt="Logo Portho Gelatto" className="sponsor-logo" /></div>
                    <div className="sponsor-item"><img src="imagenes/paseolib.png" alt="Logo Paseo Libre" className="sponsor-logo" /></div>
                    <div className="sponsor-item"><img src="imagenes/mandina.png" alt="Logo Mandina" className="sponsor-logo" /></div>
                    <div className="sponsor-item"><img src="imagenes/lavene.png" alt="Logo La Vene" className="sponsor-logo" /></div>
                    <div className="sponsor-item"><img src="imagenes/la profecia.jpg" alt="Logo La Profecía" className="sponsor-logo" /></div>
                    <div className="sponsor-item"><img src="imagenes/cocacola.png" alt="Logo Coca-Cola" className="sponsor-logo" /></div>
                </div>
            </div>
            <div className="organizers-section">
                <h2 className="organizers-title">ORGANIZADORES</h2>
                <p className="organizers-description">Estamos en cada punto de interés para acompañarte en este gran desafío.</p>
                <div className="organizer-logo-container">
                    <img src="imagenes/logoasv.jpg" alt="Logo ASV - Organizador" className="organizer-logo" />
                </div>
            </div>
            {errorMessage && <p className="feedback error" style={{ marginTop: '15px' }}>{errorMessage}</p>}
        </div>
    );
};

const EnRutaPage = ({ nextLocation, onArrival, department }) => (
    <div className="en-ruta-container">
        <img src="imagenes/VIAJANDO.png" alt="Portal Temporal Estilizado" className="portal-image" onError={(e) => { e.target.onerror = null; e.target.src='https://images.unsplash.com/photo-1520034475321-cbe63696469a?q=80&w=800&auto=format&fit=crop'; }} />
        <h3>VIAJANDO A TRAVÉS DEL TIEMPO...</h3>
        <p>Próxima Sincronización: <strong>{nextLocation}</strong></p>
        <p>Departamento: <strong>{department}</strong></p>
        <p>¡Mantén el rumbo, Guardián! Evita las 'distorsiones temporales' (¡y las multas de tránsito!).</p>
        <button className="primary-button" onClick={onArrival}>LLEGADA CONFIRMADA</button>
    </div>
);

const LongTravelPage = ({ onArrival, nextDepartment }) => {
    const imageUrl = nextDepartment === 'Capital' 
        ? 'imagenes/VIAJANDO1.png' 
        : nextDepartment === 'Rivadavia' 
            ? 'imagenes/VIAJANDO2.png' 
            : 'imagenes/VIAJANDO.png'; // Imagen por defecto

    return (
        <div className="en-ruta-container">
            <img src={imageUrl} alt={`Viajando a ${nextDepartment}`} className="portal-image" />
            <h3>HORA DE VIAJAR MÁS LEJOS</h3>
            <p>Rápido, debemos movernos a <strong>{nextDepartment}</strong>, han aparecido nuevos fragmentos de la historia que debemos recoger.</p>
            <p style={{fontStyle: 'italic', fontSize: '0.9rem', opacity: 0.8}}>
                Es importante que respetes las señales de tránsito, hay controles secretos que pueden restarte puntos.
            </p>
            <button className="primary-button" onClick={onArrival}>HEMOS LLEGADO AL NUEVO DEPARTAMENTO</button>
        </div>
    );
};

const EndGamePage = ({ score, finalTime, teamName }) => (
    <div className="end-container">
        <img src="https://cdn-icons-png.flaticon.com/512/784/784408.png" alt="Medalla o Trofeo Guardián" className="medal-image"/>
        <h3>¡MISIÓN TEMPORAL COMPLETADA, {teamName}!</h3>
        <p>Has estabilizado la línea del tiempo de San Juan. ¡La 'Amenaza del Olvido' ha sido contenida gracias a tu escuadrón!</p>
        <p><strong>Fragmentos de Historia Restaurados: {score}</strong></p>
        <p><strong>Tiempo Total de la Misión: {finalTime}</strong></p>
        <p>¡Has ganado tu Medalla "Guardián del Tiempo"! 🏅 Los "Custodios Mayores" y otros reconocimientos serán anunciados en el Concilio de Guardianes.</p>
        <p style={{fontSize: "0.9rem", marginTop: "20px"}}><em>No olvides compartir tu hazaña y prepararte para la celebración.</em></p>
    </div>
);

const TriviaSection = ({ stage, onComplete }) => {
    const { challenge, missionName } = stage.trivia;
    const [selectedOption, setSelectedOption] = React.useState('');
    const [feedback, setFeedback] = React.useState({ message: '', type: ''});
    const [triviaTimer, setTriviaTimer] = React.useState(0);
    const [glowClass, setGlowClass] = React.useState('');

    React.useEffect(() => {
        const interval = setInterval(() => setTriviaTimer(prev => prev + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    const calculatePoints = (timeInSeconds) => {
        if (timeInSeconds <= 30) return 50;
        if (timeInSeconds <= 60) return 35;
        if (timeInSeconds <= 90) return 20;
        return 10;
    };

    const handleSubmit = () => {
        const finalTime = triviaTimer;
        const isCorrect = selectedOption.toUpperCase() === challenge.correctAnswer.toUpperCase();
        const pointsWon = isCorrect ? calculatePoints(finalTime) : 0;
        
        setGlowClass(isCorrect ? 'success-glow' : 'error-glow');

        setFeedback({
            message: isCorrect ? `✔️ ¡Respuesta Correcta! Has recuperado ${pointsWon} Fragmentos.` : `❌ Respuesta Incorrecta. No se han recuperado Fragmentos.`,
            type: isCorrect ? 'success' : 'error'
        });
        setTimeout(() => {
            onComplete({ points: pointsWon, time: finalTime });
        }, 2500);
    };

    return (
        <div className={`challenge-container ${glowClass}`}>
            <h3>{missionName}</h3>
            <div className="challenge-timer">⏱️ {triviaTimer}s</div>
            <p>{challenge.question}</p>
            <ul className="trivia-options">
                {challenge.options.map(option => (
                    <li key={option} className={selectedOption === option ? 'selected' : ''} onClick={() => !feedback.message && setSelectedOption(option)}>
                        {option}
                    </li>
                ))}
            </ul>
            <button className="primary-button" onClick={handleSubmit} disabled={!selectedOption || feedback.message}>VERIFICAR TRANSMISIÓN</button>
            {feedback.message && <p className={`feedback ${feedback.type}`}>{feedback.message}</p>}
        </div>
    );
};

const AnchorSection = ({ stage, onComplete }) => {
    const { anchor } = stage;
    const [keyword, setKeyword] = React.useState('');
    const [error, setError] = React.useState('');
    const [anchorTimer, setAnchorTimer] = React.useState(0);
    const [isLocked, setIsLocked] = React.useState(false);
    const [feedback, setFeedback] = React.useState({ message: '', type: ''});
    const [glowClass, setGlowClass] = React.useState('');

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (!isLocked) setAnchorTimer(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isLocked]);

    const calculateAnchorPoints = (timeInSeconds) => {
        if (timeInSeconds <= 60) return 100;
        if (timeInSeconds <= 120) return 80;
        if (timeInSeconds <= 180) return 60;
        if (timeInSeconds <= 240) return 40;
        if (timeInSeconds <= 300) return 20;
        return 0;
    };

    const handleUnlockInternal = () => {
        if (keyword.toUpperCase().trim() === anchor.enablerKeyword.toUpperCase().trim()) {
            setIsLocked(true);
            const points = calculateAnchorPoints(anchorTimer);
            setError('');
            setGlowClass('success-glow');
            setFeedback({ message: `✔️ ¡Ancla estabilizada! Has recuperado ${points} Fragmentos.`, type: 'success' });
            setTimeout(() => onComplete({ points: points, time: anchorTimer }), 2500);
        } else {
            setError('🚫 Ancla Temporal incorrecta. ¡La distorsión persiste!');
            setGlowClass('error-glow');
            setTimeout(() => setGlowClass(''), 1500);
        }
    };
    
    const handleSkip = () => {
        setIsLocked(true);
        setError('');
        setGlowClass('error-glow');
        setFeedback({ message: `Misión de anclaje omitida. No se han recuperado Fragmentos.`, type: 'error' });
        setTimeout(() => onComplete({ points: 0, time: anchorTimer }), 2500);
    };

    const handleInputChange = (e) => {
        if (error) setError('');
        if (glowClass) setGlowClass('');
        setKeyword(e.target.value);
    };

    return (
        <div className={`stage-container ${glowClass}`}>
            <h3>{anchor.missionName}</h3>
            <div className="challenge-timer">⏱️ {anchorTimer}s</div>
            <p><strong>Departamento:</strong> {stage.department}</p>
            {anchor.transmission && <div className="transmission-box"><p><strong>📡 Transmisión Interceptada:</strong> {anchor.transmission}</p></div>}
            <p><strong>Objetivo de la Coordenada:</strong> {anchor.enabler}</p>
            <input type="text" placeholder="Ingresa el 'Ancla Temporal'" value={keyword} onChange={handleInputChange} onKeyPress={(e) => e.key === 'Enter' && handleUnlockInternal()}/>
            <div className="button-group">
                <button className="secondary-button" onClick={handleSkip} disabled={isLocked}>No sé</button>
                <button className="primary-button" onClick={handleUnlockInternal} disabled={isLocked}>🗝️ ANCLAR RECUERDO</button>
            </div>
            {error && <p className="feedback error">{error}</p>}
            {feedback.message && <p className={`feedback ${feedback.type}`}>{feedback.message}</p>}
        </div>
    );
};

const FinalSection = ({stage, onComplete}) => {
    const [keyword, setKeyword] = React.useState('');
    const [error, setError] = React.useState('');
    const [glowClass, setGlowClass] = React.useState('');
      
    const handleUnlockInternal = () => {
        if (keyword.toUpperCase().trim() === stage.enablerKeyword.toUpperCase().trim()) {
            setGlowClass('success-glow');
            onComplete(200); // Bonus por finalizar
        } else {
            setError('🚫 Código final incorrecto.');
            setGlowClass('error-glow');
            setTimeout(() => setGlowClass(''), 1500);
        }
    };

    const handleInputChange = (e) => {
        if (error) setError('');
        if (glowClass) setGlowClass('');
        setKeyword(e.target.value);
    };
    
    return (
        <div className={`stage-container ${glowClass}`}>
            <h3>{stage.missionName}</h3>
            {stage.transmission && <div className="transmission-box"><p><strong>📡 Transmisión Prioritaria:</strong> {stage.transmission}</p></div>}
            <p><strong>Misión de Sellado:</strong> {stage.enabler}</p>
            <input type="text" placeholder="Ingresa el Ancla Temporal Final" value={keyword} onChange={handleInputChange} onKeyPress={(e) => e.key === 'Enter' && handleUnlockInternal()}/>
            <div className="button-group">
                <button className="primary-button" onClick={handleUnlockInternal}>✨ SELLAR BRECHA TEMPORAL ✨</button>
            </div>
            {error && <p className="feedback error">{error}</p>}
        </div>
    );
};


// --- BLOQUE PRINCIPAL DE LA APP ---
const getInitialState = (missions) => ({
    status: 'login',
    squadCode: null,
    teamName: '',
    currentMissionId: missions.length > 0 ? missions[0].id : 1,
    subStage: 'anchor',
    score: 0,
    mainTimer: 0,
    finalTimeDisplay: '',
    errorMessage: '',
    missionResults: [],
    pendingAnchorResult: null
});

const App = () => {
    // --- NUEVO: ESTADO PARA GUARDAR LAS MISIONES CARGADAS ---
    const [missions, setMissions] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true); // Para saber si estamos cargando datos
    const [appState, setAppState] = React.useState(null);

    // --- NUEVO: EFECTO PARA CARGAR MISIONES DESDE misiones.json ---
    React.useEffect(() => {
        fetch('./misiones.json')
            .then(response => response.json())
            .then(data => {
                setMissions(data);
                
                // Una vez cargados los datos, inicializamos el estado del juego
                const savedState = localStorage.getItem('guardianesAppState');
                try {
                    const parsedState = savedState ? JSON.parse(savedState) : null;
                    if (parsedState && typeof parsedState.status === 'string' && parsedState.status !== 'login') {
                        setAppState(parsedState);
                    } else {
                        setAppState(getInitialState(data));
                    }
                } catch (e) {
                    console.error("Error al parsear localStorage, usando estado inicial.", e);
                    localStorage.removeItem('guardianesAppState');
                    setAppState(getInitialState(data));
                }

                setIsLoading(false); // Terminamos de cargar
            })
            .catch(error => {
                console.error("Error al cargar las misiones desde misiones.json:", error);
                setIsLoading(false); // Dejamos de cargar incluso si hay error
                // Opcional: mostrar un mensaje de error en la UI
            });
    }, []); // El array vacío [] asegura que esto se ejecute solo una vez


    React.useEffect(() => {
        if (appState) {
            localStorage.setItem('guardianesAppState', JSON.stringify(appState));
        }
    }, [appState]);

    React.useEffect(() => {
        let interval;
        if (appState && appState.status !== 'login' && appState.status !== 'finished') {
            interval = setInterval(() => {
                setAppState(prev => ({ ...prev, mainTimer: prev.mainTimer + 1 }));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [appState]);


    // Si estamos cargando o no tenemos estado, mostramos un mensaje
    if (isLoading || !appState) {
        return (
            <div className="app-container" style={{ padding: '40px', textAlign: 'center' }}>
                <p>INICIANDO GUÍA DEL TIEMPO...</p>
            </div>
        );
    }
    
    // El resto de la lógica ahora usa 'missions' en lugar de 'eventData'
    const currentStageData = missions.find(m => m.id === appState.currentMissionId);

    const handleLogin = (code, name) => {
        const initialState = getInitialState(missions);
        const fullState = { ...initialState, status: 'in_game', squadCode: code, teamName: name };
        setAppState(fullState);
        sendResultsToBackend(fullState);
    };
    
    const handleAnchorComplete = (anchorResult) => {
        if (!currentStageData) return;
        const newScore = appState.score + anchorResult.points;
        setAppState(prev => ({ ...prev, score: newScore, subStage: 'trivia', pendingAnchorResult: anchorResult }));
    };
    
    const handleTriviaComplete = (triviaResult) => {
        if (!currentStageData || !appState.pendingAnchorResult) return;
        
        const newScore = appState.score + triviaResult.points;
        const completeMissionRecord = {
            missionId: currentStageData.id,
            missionName: currentStageData.anchor.missionName.replace("Ancla: ", ""),
            anchorTime: appState.pendingAnchorResult.time,
            anchorPoints: appState.pendingAnchorResult.points,
            triviaTime: triviaResult.time,
            triviaPoints: triviaResult.points
        };

        const updatedResults = [...appState.missionResults, completeMissionRecord];
        const nextMission = missions.find(m => m.id === currentStageData.nextMissionId);
        
        let nextStatus;
        if (currentStageData.type === 'final' || !nextMission) {
            return;
        } else if (nextMission.department !== currentStageData.department) {
            nextStatus = 'long_travel';
        } else {
            nextStatus = 'on_the_road';
        }
        
        const newState = {
            ...appState, 
            score: newScore, 
            missionResults: updatedResults,
            pendingAnchorResult: null,
            status: nextStatus,
        };
        
        setAppState(newState);
        sendResultsToBackend(newState);
    };

    const handleFinalComplete = (bonusPoints, stateBeforeFinal = appState) => {
        const totalSeconds = stateBeforeFinal.mainTimer;
        const finalTime = formatTime(totalSeconds);
        const finalScore = (stateBeforeFinal.score || 0) + (bonusPoints || 0);
        
        const finalState = { ...stateBeforeFinal, score: finalScore, status: 'finished', finalTimeDisplay: finalTime };
        
        setAppState(finalState);
        sendResultsToBackend(finalState);
    };

    const handleArrival = () => {
        if (!currentStageData || typeof currentStageData.nextMissionId !== 'number') return;
        const nextMission = missions.find(m => m.id === currentStageData.nextMissionId);
        if (nextMission) {
            setAppState(prev => ({ ...prev, currentMissionId: nextMission.id, status: 'in_game', subStage: 'anchor' }));
        } else {
            handleFinalComplete(0);
        }
    };

    const handleResetDevelopment = () => {
        if (window.confirm("¿Seguro que quieres reiniciar toda la misión y borrar los datos guardados? (Solo para desarrollo)")) {
            localStorage.removeItem('guardianesAppState');
            setAppState(getInitialState(missions));
        }
    };

    const renderContent = () => {
        switch (appState.status) {
            case 'login':
                return <LoginPage onLogin={handleLogin} setErrorMessage={(msg) => setAppState(prev => ({ ...prev, errorMessage: msg }))} errorMessage={appState.errorMessage} />;
            
            case 'long_travel': {
                const nextMission = missions.find(m => m.id === currentStageData.nextMissionId);
                return <LongTravelPage nextDepartment={nextMission.department} onArrival={handleArrival} />;
            }
            
            case 'on_the_road': {
                const nextMission = currentStageData ? missions.find(m => m.id === currentStageData.nextMissionId) : null;
                if (!nextMission) {
                    handleFinalComplete(0);
                    return <EndGamePage score={appState.score} finalTime={appState.finalTimeDisplay} teamName={appState.teamName} />;
                }
                return <EnRutaPage nextLocation={nextMission.location} department={nextMission.department} onArrival={handleArrival} />;
            }

            case 'in_game': {
                if (!currentStageData) return <p style={{padding: "20px"}}>Detectando anomalía temporal...</p>;
                if(currentStageData.type === 'final') return <FinalSection stage={currentStageData} onComplete={handleFinalComplete} />;
                if (appState.subStage === 'anchor') return <AnchorSection stage={currentStageData} onComplete={handleAnchorComplete} />;
                if (appState.subStage === 'trivia') return <TriviaSection stage={currentStageData} onComplete={handleTriviaComplete} />;
                break;
            }

            case 'finished':
                return <EndGamePage score={appState.score} finalTime={appState.finalTimeDisplay} teamName={appState.teamName} />;
            
            default:
                return <p>Error: Estado desconocido.</p>;
        }
    };

    return (
        <div className="app-container">
            {appState.status !== 'login' && <Header teamName={appState.teamName} score={appState.score} timer={appState.mainTimer} />}
            <div className="dashboard-content">
                {renderContent()}
            </div>
            {appState.status !== 'login' && <button className="dev-reset-button" onClick={handleResetDevelopment}>RESET (DEV)</button>}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);