// --- DATOS COMPLETOS DEL EVENTO ---
const eventData = [
    // ... (El resto de tus datos del evento no cambia)
    // SANTA LUCÍA
    {
        id: 1, department: "Santa Lucía", location: "Parroquia Santa Lucía",
        anchor: { missionName: "Ancla: Vestigios del Sismo", enabler: "Consigna: Busquen el año del catastrófico terremoto que destruyó el 'hermoso templo colonial'.\nPista: Este evento marcó un antes y un después en la arquitectura de toda la provincia.", enablerKeyword: "1944", transmission: "Guardián, detecto una cicatriz profunda en la línea de tiempo de este lugar sagrado. Debes anclar el año del evento que lo cambió todo para estabilizarla." },
        trivia: { missionName: "Trivia: El Templo de 1900", challenge: { question: "¿En qué año fue inaugurado el templo de estilo ecléctico que reemplazó a la primera capilla?", options: ["1894", "1900", "1944", "1964"], correctAnswer: "1900" } },
        nextMissionId: 2
    },
    // ... (todos los demás objetos de eventData van aquí, no los repito para ser breve)
    {
        id: 39, type: 'final', department: "Rivadavia Ancestral", location: "Parque de Rivadavia (Punto de Llegada)",
        missionName: "Misión: Sellar la Brecha Temporal",
        enabler: "¡Guardián, has llegado al nexo! El 'Ancla Temporal Final' para estabilizar la línea del tiempo de San Juan te será revelada por el Guardián Mayor al completar tu informe en la 'Guía del Tiempo'. Ingresa la palabra 'LEGADO' para confirmar la restauración.",
        enablerKeyword: "LEGADO",
        transmission: "Mensaje Urgente del Guardián Mayor: '¡Lo lograron! La Amenaza del Olvido retrocede gracias a su valor. Ingresen el Ancla Final. ¡El legado de San Juan está a salvo!'",
        nextMissionId: null
    }
];

// --- CÓDIGOS DE ESCUADRÓN VÁLIDOS ---
const validSquadCodes = {
    "GUARDIAN01": "Los CronoExploradores",
    "TIEMPOXYZ": "Vigías del Pasado",
    "SANJUAN2025": "Escuadrón Reliquia",
    "ASVTEST": "Equipo ASV Beta"
};

// --- COMPONENTES DE REACT ---
const Header = ({ teamName, score, timer }) => {
    const formatTime = (totalSeconds) => {
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };
    return (
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
};

const LoginPage = ({ onLogin, setErrorMessage, errorMessage }) => {
    const [squadCode, setSquadCode] = React.useState('');
    const logoUrl = "imagenes/LOGO 3 (1).png";
    const handleLoginInternal = () => {
        const normalizedCode = squadCode.toUpperCase().trim();
        if (validSquadCodes[normalizedCode]) {
            onLogin(normalizedCode, validSquadCodes[normalizedCode]);
            if (typeof setErrorMessage === 'function') setErrorMessage('');
        } else {
            if (typeof setErrorMessage === 'function') setErrorMessage('⚠️ Código de Escuadrón no válido. ¡El tiempo se agota!');
        }
    };
    return (
        <div className="login-container">
            <img src={logoUrl} alt="Logo Guardianes del Tiempo" className="logo" onError={(e) => { e.target.onerror = null; e.target.src="https://i.imgur.com/ZKiX1mO.png"; }} />
            <h1>RUTA DEL TESORO:<br/>GUARDIANES DEL TIEMPO</h1>
            <p className="lema">"¡El legado de San Juan te necesita! ¿Aceptas la misión?"</p>
            <label htmlFor="squadCode">Código de Escuadrón:</label>
            <input id="squadCode" type="text" placeholder="Ingresa tu código secreto" value={squadCode} onChange={(e) => setSquadCode(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleLoginInternal()} />
            <button className="primary-button" onClick={handleLoginInternal}>ACTIVAR GUÍA DEL TIEMPO</button>
            
            <div className="sponsors-section">
                <h2 className="sponsors-title">ASISTENTES DEL TIEMPO</h2>
                <p className="sponsors-description">Recuerda visitar nuestros Asistentes del Tiempo, tendrán sorpresas y puntos bonus para vos.</p>
                <div className="sponsors-grid">
                    <div className="sponsor-item"><img src="imagenes/muni cap.png" alt="Logo Municipalidad de la Capital" className="sponsor-logo" /></div>
                    <div className="sponsor-item"><img src="imagenes/muni riv.png" alt="Logo Municipalidad de Rivadavia" className="sponsor-logo" /></div>
                    <div className="sponsor-item"><img src="imagenes/muni santa lucia.jpg" alt="Logo Municipalidad de Santa Lucía" className="sponsor-logo" /></div>
                    <div className="sponsor-item"><img src="imagenes/portho.jpg" alt="Logo Portho Gelatto" className="sponsor-logo" /></div>
                    <div className="sponsor-item"><img src="imagenes/paselib.png" alt="Logo Pase Libre" className="sponsor-logo" /></div>
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

const EnRutaPage = ({ nextLocation, onArrival, department }) => {
     return(
         <div className="en-ruta-container">
              <img src="imagenes/VIAJANDO.png" alt="Portal Temporal Estilizado" className="portal-image" onError={(e) => { e.target.onerror = null; e.target.src='https://images.unsplash.com/photo-1520034475321-cbe63696469a?q=80&w=800&auto=format&fit=crop'; }} />
              <h3>VIAJANDO A TRAVÉS DEL TIEMPO...</h3>
              <p>Próxima Sincronización: <strong>{nextLocation}</strong></p>
              <p>Departamento: <strong>{department}</strong></p>
              <p>¡Mantén el rumbo, Guardián! Evita las 'distorsiones temporales' (¡y las multas de tránsito!).</p>
              <button className="primary-button" onClick={onArrival}>LLEGADA CONFIRMADA</button>
          </div>
     );
 };

const EndGamePage = ({ score, finalTime, teamName }) => {
   return (
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
};

const TriviaSection = ({ stage, onComplete }) => {
    const { challenge, missionName } = stage.trivia;
    const [selectedOption, setSelectedOption] = React.useState('');
    const [feedback, setFeedback] = React.useState({ message: '', type: ''});
    const [triviaTimer, setTriviaTimer] = React.useState(0);

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

        setFeedback({
            message: isCorrect ? `✔️ ¡Respuesta Correcta! Has recuperado ${pointsWon} Fragmentos.` : `❌ Respuesta Incorrecta. No se han recuperado Fragmentos.`,
            type: isCorrect ? 'success' : 'error'
        });
        
        setTimeout(() => {
            // AHORA ENVIAMOS UN OBJETO CON PUNTOS Y TIEMPO
            onComplete({ points: pointsWon, time: finalTime });
        }, 2500);
    };

    return (
        <div className="challenge-container">
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
            setFeedback({ message: `✔️ ¡Ancla estabilizada! Has recuperado ${points} Fragmentos.`, type: 'success' });
            // AHORA ENVIAMOS UN OBJETO CON PUNTOS Y TIEMPO
            setTimeout(() => onComplete({ points: points, time: anchorTimer }), 2500);
        } else {
            setError('🚫 Ancla Temporal incorrecta. ¡La distorsión persiste!');
        }
    };
    
    const handleSkip = () => {
        setIsLocked(true);
        setError('');
        setFeedback({ message: `Misión de anclaje omitida. No se han recuperado Fragmentos.`, type: 'error' });
         // AHORA ENVIAMOS UN OBJETO CON PUNTOS Y TIEMPO
        setTimeout(() => onComplete({ points: 0, time: anchorTimer }), 2500);
    };

    return (
        <div className="stage-container">
            <h3>{anchor.missionName}</h3>
            <div className="challenge-timer">⏱️ {anchorTimer}s</div>
            <p><strong>Departamento:</strong> {stage.department}</p>
            {anchor.transmission && <div className="transmission-box"><p><strong>📡 Transmisión Interceptada:</strong> {anchor.transmission}</p></div>}
            <p><strong>Objetivo de la Coordenada:</strong> {anchor.enabler}</p>
            <input type="text" placeholder="Ingresa el 'Ancla Temporal'" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleUnlockInternal()}/>
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
     
     const handleUnlockInternal = () => {
         if (keyword.toUpperCase().trim() === stage.enablerKeyword.toUpperCase().trim()) {
             onComplete(200); // Bonus por finalizar
         } else {
             setError('🚫 Código final incorrecto.');
         }
     };
    
     return (
         <div className="stage-container">
             <h3>{stage.missionName}</h3>
             {stage.transmission && <div className="transmission-box"><p><strong>📡 Transmisión Prioritaria:</strong> {stage.transmission}</p></div>}
             <p><strong>Misión de Sellado:</strong> {stage.enabler}</p>
             <input type="text" placeholder="Ingresa el Ancla Temporal Final" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleUnlockInternal()}/>
             <div className="button-group">
                  <button className="primary-button" onClick={handleUnlockInternal}>✨ SELLAR BRECHA TEMPORAL ✨</button>
             </div>
             {error && <p className="feedback error">{error}</p>}
         </div>
     );
}

const getInitialState = () => ({
    status: 'login',
    squadCode: null,
    teamName: '',
    currentMissionId: eventData.length > 0 ? eventData[0].id : 1,
    subStage: 'anchor',
    score: 0,
    mainTimer: 0,
    finalTimeDisplay: '',
    errorMessage: '',
    // EL NUEVO HISTORIAL DE MISIONES
    missionResults: [],
    // UN LUGAR TEMPORAL PARA GUARDAR EL RESULTADO DEL ANCLA MIENTRAS SE HACE LA TRIVIA
    pendingAnchorResult: null 
});

const App = () => {
    const [appState, setAppState] = React.useState(() => {
        const savedState = localStorage.getItem('guardianesAppState');
        try {
            const parsedState = savedState ? JSON.parse(savedState) : null;
            if (parsedState && typeof parsedState.status === 'string' && parsedState.status !== 'login') {
                return parsedState;
            }
        } catch (e) {
            console.error("Error al parsear localStorage, usando estado inicial.", e);
            localStorage.removeItem('guardianesAppState');
        }
        return getInitialState();
    });

    React.useEffect(() => {
        localStorage.setItem('guardianesAppState', JSON.stringify(appState));
    }, [appState]);

    React.useEffect(() => {
        let interval;
        if (appState.status !== 'login' && appState.status !== 'finished') {
            interval = setInterval(() => {
                setAppState(prev => ({ ...prev, mainTimer: prev.mainTimer + 1 }));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [appState.status]);

    const currentStageData = eventData.find(m => m.id === appState.currentMissionId);

    const handleLogin = (code, name) => {
        setAppState({
            ...getInitialState(),
            status: 'in_game',
            squadCode: code,
            teamName: name,
        });
    };
    
    // LÓGICA MODIFICADA
    const handleAnchorComplete = (anchorResult) => { // ahora recibe un objeto {points, time}
        if (!currentStageData) return;
        const newScore = appState.score + anchorResult.points;
        setAppState(prev => ({ 
            ...prev, 
            score: newScore, 
            subStage: 'trivia',
            pendingAnchorResult: anchorResult // Guardamos el resultado del ancla temporalmente
        }));
    };
    
    // LÓGICA MODIFICADA
    const handleTriviaComplete = (triviaResult) => { // ahora recibe un objeto {points, time}
        if (!currentStageData || !appState.pendingAnchorResult) return;

        const newScore = appState.score + triviaResult.points;

        // Creamos el registro completo de la misión
        const completeMissionRecord = {
            missionId: currentStageData.id,
            missionName: currentStageData.anchor.missionName,
            anchorTime: appState.pendingAnchorResult.time,
            anchorPoints: appState.pendingAnchorResult.points,
            triviaTime: triviaResult.time,
            triviaPoints: triviaResult.points
        };

        const nextStatus = typeof currentStageData.nextMissionId === 'number' ? 'on_the_road' : 'finished';
        
        setAppState(prev => ({ 
            ...prev, 
            score: newScore, 
            status: nextStatus,
            missionResults: [...prev.missionResults, completeMissionRecord], // Añadimos el nuevo registro al historial
            pendingAnchorResult: null // Limpiamos el resultado temporal
        }));
    };

    const handleFinalComplete = (currentScore) => {
        const totalSeconds = appState.mainTimer;
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');

        const finalScore = (appState.score || 0) + (currentScore || 0);

        setAppState(prev => ({ 
            ...prev, 
            score: finalScore, 
            status: 'finished', 
            finalTimeDisplay: `${hours}:${minutes}:${seconds}` 
        }));
    };

    const handleArrival = () => {
        if (!currentStageData || typeof currentStageData.nextMissionId !== 'number') return;
        
        const nextMission = eventData.find(m => m.id === currentStageData.nextMissionId);
        if (nextMission) {
             setAppState(prev => ({ ...prev, currentMissionId: nextMission.id, status: 'in_game', subStage: 'anchor' }));
        } else {
             console.error(`Error: No se encontró la misión con ID ${currentStageData.nextMissionId}. Finalizando.`);
             handleFinalComplete(0);
        }
    };

    const handleResetDevelopment = () => {
        if (window.confirm("¿Seguro que quieres reiniciar toda la misión y borrar los datos guardados? (Solo para desarrollo)")) {
            localStorage.removeItem('guardianesAppState');
            setAppState(getInitialState());
        }
    };

    const renderContent = () => {
        if (appState.status === 'login') {
            return <LoginPage onLogin={handleLogin} setErrorMessage={(msg) => setAppState(prev => ({ ...prev, errorMessage: msg }))} errorMessage={appState.errorMessage} />;
        }

        if (appState.status === 'on_the_road') {
            const nextMission = currentStageData ? eventData.find(m => m.id === currentStageData.nextMissionId) : null;
            if (!nextMission) {
                // Si no hay próxima misión, vamos a la página final directamente
                handleFinalComplete(0);
                return <EndGamePage score={appState.score} finalTime={appState.finalTimeDisplay} teamName={appState.teamName} />;
            }
            const nextLocationDisplay = nextMission.location || "Nuevo Sector Temporal";
            const nextDepartmentDisplay = nextMission.department || "Dimensión Desconocida";
            return <EnRutaPage nextLocation={nextLocationDisplay} department={nextDepartmentDisplay} onArrival={handleArrival} />;
        }

        if (appState.status === 'in_game') {
            if (!currentStageData) return <p style={{padding: "20px"}}>Detectando anomalía temporal...</p>;

            if(currentStageData.type === 'final') {
                return <FinalSection stage={currentStageData} onComplete={handleFinalComplete} />;
            }

            if (appState.subStage === 'anchor') {
                return <AnchorSection stage={currentStageData} onComplete={handleAnchorComplete} />;
            }
            
            if (appState.subStage === 'trivia') {
                return <TriviaSection stage={currentStageData} onComplete={handleTriviaComplete} />;
            }
        }
        
        if (appState.status === 'finished') {
            return <EndGamePage score={appState.score} finalTime={appState.finalTimeDisplay} teamName={appState.teamName} />;
        }

        return <p>Error: Estado desconocido.</p>;
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