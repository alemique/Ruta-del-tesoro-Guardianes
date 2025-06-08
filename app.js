// --- CONFIGURACIÓN DEL BACKEND ---
// URL actualizada para incluir la función del ranking.
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbym5-onTOyzlqZn_G4O-5acxAZzReYjIOY5SF8tBh3TtT2jEFVw6IZ2MMMtkHGtRl0F/exec';

// --- LISTA DE USUARIOS AUTORIZADOS (LÓGICA) ---
const validUsers = [
    'ADMIN',
    ...Array.from({ length: 50 }, (_, i) => `Guardian${String(i + 1).padStart(2, '0')}`)
];

// --- DATOS COMPLETOS DEL EVENTO (DATOS) ---
const eventData = [
    // SANTA LUCÍA
    {
        id: 1, department: "Santa Lucía", location: "Parroquia Santa Lucía",
        anchor: { missionName: "Ancla: Vestigios del Sismo", enabler: "Consigna: Busquen el año del catastrófico terremoto que destruyó el 'hermoso templo colonial'.\nPista: Este evento marcó un antes y un después en la arquitectura de toda la provincia.", enablerKeyword: "1944", transmission: "Guardián, detecto una cicatriz profunda en la línea de tiempo de este lugar sagrado. Debes anclar el año del evento que lo cambió todo para estabilizarla." },
        trivia: { missionName: "Trivia: El Templo de 1900", challenge: { question: "¿En qué año fue inaugurado el templo de estilo ecléctico que reemplazó a la primera capilla?", options: ["1894", "1900", "1944", "1964"], correctAnswer: "1900" } },
        nextMissionId: 2
    },
    {
        id: 2, department: "Santa Lucía", location: "Parroquia Santa Lucía",
        anchor: { missionName: "Ancla: La Fe Reconstruida", enabler: "Consigna: Encuentren el año de inauguración de la iglesia moderna y actual.\nPista: Se inauguró durante las fiestas patronales de diciembre.", enablerKeyword: "1964", transmission: "La fe de un pueblo se manifiesta en su capacidad de renacer. Encuentra el año en que este templo moderno abrió sus puertas para sellar esta memoria." },
        trivia: { missionName: "Trivia: Fervor Popular", challenge: { question: "¿Qué importante evento religioso se celebra cada diciembre en la parroquia?", options: ["La Fiesta del Sol", "El aniversario del departamento", "La Fiesta Patronal de Santa Lucía", "La peregrinación a la Difunta Correa"], correctAnswer: "La Fiesta Patronal de Santa Lucía" } },
        nextMissionId: 3
    },
    {
        id: 3, department: "Santa Lucía", location: "Monumento La Luz del Mundo",
        anchor: { missionName: "Ancla: El Primer Destello", enabler: "Consigna: Identifiquen el año en que los primeros pobladores se reunían en esta zona.\nPista: El lugar era conocido históricamente como 'La Legua'.", enablerKeyword: "1869", transmission: "Detecto una débil señal de luz del pasado. Viaja al año de origen, cuando esta esquina se convirtió en un punto de encuentro vital para los pioneros." },
        trivia: { missionName: "Trivia: La Lámpara Primitiva", challenge: { question: "Según la tradición, ¿qué se utilizaba en el mangrullo para orientar a los viajeros antes de la lámpara de carburo?", options: ["Una fogata", "Una lámpara de aceite", "Antorchas", "Un farol eléctrico"], correctAnswer: "Una lámpara de aceite" } },
        nextMissionId: 4
    },
    {
        id: 4, department: "Capital", location: "Plaza 25 de Mayo",
        anchor: { missionName: "Ancla: La Primera Piedra", enabler: "Consigna: ¿En qué año se fundó San Juan de la Frontera, momento en que se reservó por primera vez el terreno para esta plaza?\nPista: Fue antes de que una inundación obligara a trasladar la ciudad.", enablerKeyword: "1562", transmission: "Toda gran ciudad tiene un punto de origen. Viaja al año fundacional para anclar el primer latido de San Juan." },
        trivia: { missionName: "Trivia: El Bautismo de la Plaza", challenge: { question: "¿Qué ilustre sanjuanino propuso cambiar el nombre de 'Plaza de Armas' a '25 de Mayo'?", options: ["Francisco Narciso de Laprida", "Guillermo Rawson", "Agustín Gnecco", "Domingo F. Sarmiento"], correctAnswer: "Domingo F. Sarmiento" } },
        nextMissionId: 5
    },
    {
        id: 5, department: "Capital", location: "Plaza 25 de Mayo",
        anchor: { missionName: "Ancla: El Renacer de las Aguas", enabler: "Consigna: Descubran el año en que la ciudad y la plaza fueron trasladadas a su ubicación actual después de una gran inundación.\nPista: Ocurrió 31 años después de la fundación original.", enablerKeyword: "1593", transmission: "La naturaleza obligó a un nuevo comienzo. Fija en la línea de tiempo el año en que la ciudad renació de las aguas y se estableció en su lugar definitivo." },
        trivia: { missionName: "Trivia: Actividad Colonial", challenge: { question: "Además de leer bandos, ¿qué otra actividad pública se realizaba en la plaza durante la época colonial?", options: ["Justas de caballeros", "Corridas de toros", "Mercados de esclavos", "Obras de teatro"], correctAnswer: "Corridas de toros" } },
        nextMissionId: 6
    },
    {
        id: 6, department: "Capital", location: "Catedral de San Juan Bautista",
        anchor: { missionName: "Ancla: La Semilla de la Fe", enabler: "Consigna: Encuentren el año de fundación del templo original, que sirvió como Iglesia Mayor durante 232 años.\nPista: Fue elevado a catedral a inicios del siglo XIX.", enablerKeyword: "1712", transmission: "Mucho antes del moderno campanil, una orden religiosa sembró la primera semilla de fe en este solar. Ancla su año de fundación." },
        trivia: { missionName: "Trivia: Los Fundadores", challenge: { question: "¿Qué orden religiosa fundó la iglesia matriz original en este mismo solar?", options: ["Franciscanos", "Dominicos", "Agustinos", "Jesuitas"], correctAnswer: "Jesuitas" } },
        nextMissionId: 7
    },
    {
        id: 7, department: "Capital", location: "Catedral de San Juan Bautista",
        anchor: { missionName: "Ancla: La Inauguración Moderna", enabler: "Consigna: Busquen la fecha exacta de inauguración de la actual y moderna catedral.\nPista: Ocurrió 35 años después del devastador terremoto de 1944.", enablerKeyword: "16 de diciembre de 1979", transmission: "De las ruinas emergió un símbolo de resiliencia. La fecha exacta de su inauguración es un testamento al espíritu sanjuanino. ¡Encuéntrala!" },
        trivia: { missionName: "Trivia: El Ícono Urbano", challenge: { question: "¿Qué altura tiene el distintivo campanil de ladrillo rojo que se ha convertido en un ícono urbano?", options: ["44 metros", "51 metros", "62 metros", "79 metros"], correctAnswer: "51 metros" } },
        nextMissionId: 8
    },
    {
        id: 8, department: "Rivadavia", location: "Jardín de los Poetas",
        anchor: { missionName: "Ancla: El Edén Literario", enabler: "Consigna: Busquen la fecha de inauguración de este parque poético.\nPista: Fue concebido por la visionaria Ofelia Zúccoli Fidanza.", enablerKeyword: "11 de abril de 1958", transmission: "Donde la poesía y la naturaleza se unen. Ancla la fecha en que este jardín abrió sus puertas al público." },
        trivia: { missionName: "Trivia: Símbolo Vegetal", challenge: { question: "¿Qué figura patriótica está representada en la ladera de la sierra utilizando flores, arbustos y árboles?", options: ["La Bandera Argentina", "El Escudo Nacional", "El rostro de San Martín", "El mapa de Argentina"], correctAnswer: "El Escudo Nacional" } },
        nextMissionId: 9
    },
    {
        id: 9, department: "Rivadavia", location: "Jardín de los Poetas",
        anchor: { missionName: "Ancla: El Parque Original", enabler: "Consigna: ¿Cómo se conocía antiguamente el gran espacio verde del que forma parte este jardín?\nPista: Hoy se lo conoce como Parque Provincial Rivadavia.", enablerKeyword: "Parque Bernardino Rivadavia", transmission: "Antes de ser el parque provincial, este gran pulmón verde tenía otro nombre. Ancla su denominación original." },
        trivia: { missionName: "Trivia: Homenaje en Piedra", challenge: { question: "¿A quiénes están dedicados los bustos y esculturas que se encuentran entre los senderos del jardín?", options: ["A los héroes de la independencia", "A los gobernadores de San Juan", "A los grandes poetas argentinos", "A los científicos más destacados"], correctAnswer: "A los grandes poetas argentinos" } },
        nextMissionId: 10
    },
    {
        id: 10, type: 'final', department: "Rivadavia Ancestral", location: "Parque de Rivadavia (Punto de Llegada)",
        missionName: "Misión: Sellar la Brecha Temporal",
        enabler: "¡Guardián, has llegado al nexo! El 'Ancla Temporal Final' para estabilizar la línea del tiempo de San Juan te será revelada por el Guardián Mayor al completar tu informe en la 'Guía del Tiempo'. Ingresa la palabra 'LEGADO' para confirmar la restauración.",
        enablerKeyword: "LEGADO",
        transmission: "Mensaje Urgente del Guardián Mayor: '¡Lo lograron! La Amenaza del Olvido retrocede gracias a su valor. Ingresen el Ancla Final. ¡El legado de San Juan está a salvo!'",
        nextMissionId: null
    }
];

// --- POOL DE EVENTOS DE DISTORSIÓN CON DISPARADORES ESPECÍFICOS ---
const distortionEventsData = [
    {
        id: 'distorsion_1',
        trigger: { onMissionComplete: 3 }, // Se activa al completar la misión con id 3
        visual: { type: 'image', src: 'imagenes/AMENAZA1.png', duration: 4000 }, // 4 segundos
        challenge: {
            type: 'corrupt_transmission',
            title: "¡Transmisión Corrupta!",
            message: "La Amenaza del Olvido intercepta tu señal. Responde rápido o la conexión se perderá...",
            question: "Mis espías dicen que el Libertador se alojó en la celda del convento en 181... ¿Cuál es el último dígito? ¡Rápido!",
            correctAnswer: "5",
            timeLimit: 15,
            bonusPoints: 30,
            penaltyPoints: -10
        }
    },
    {
        id: 'distorsion_2',
        trigger: { onLongTravel: { from: 'Santa Lucía', to: 'Capital' } },
        visual: { type: 'video', src: 'imagenes/AMENAZA.mp4' },
        challenge: {
            type: 'narrative_echo', 
            title: "Estática Temporal",
            message: "No creas que un simple viaje te mantendrá a salvo. Siento tu presencia moviéndose por mis dominios. Cada paso que das... lo escucho."
        }
    },
    {
        id: 'distorsion_3',
        trigger: { onLongTravel: { from: 'Capital', to: 'Rivadavia' } },
        visual: { type: 'video', src: 'imagenes/amenaza1.mp4' },
        challenge: {
            type: 'narrative_echo',
            title: "Eco del Olvido...",
            message: "Te acercas a un lugar de poder. Un lugar que me pertenece. Ten cuidado, Guardián, o te convertirás en otro recuerdo olvidado."
        }
    }
];

// --- FUNCIONES GLOBALES DE AYUDA ---
const formatTime = (totalSeconds) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

const generarPistaDinamica = (respuesta) => {
    const respuestaSinEspacios = respuesta.replace(/ /g, '');
    const longitud = respuestaSinEspacios.length;
    let cantidadARevelar;

    if (longitud <= 4) {
        cantidadARevelar = 1;
    } else if (longitud <= 8) {
        cantidadARevelar = 2;
    } else if (longitud <= 12) {
        cantidadARevelar = 3;
    } else {
        cantidadARevelar = 4;
    }

    const indicesLetras = [];
    respuesta.split('').forEach((char, index) => {
        if (char !== ' ') {
            indicesLetras.push(index);
        }
    });

    for (let i = indicesLetras.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indicesLetras[i], indicesLetras[j]] = [indicesLetras[j], indicesLetras[i]];
    }

    const indicesARevelar = new Set(indicesLetras.slice(0, cantidadARevelar));

    const pistaGenerada = respuesta.split('').map((char, index) => {
        if (char === ' ') {
            return ' ';
        }
        if (indicesARevelar.has(index)) {
            return char;
        }
        return '_';
    }).join('');

    return pistaGenerada;
};


async function sendResultsToBackend(data) {
    const timeToSend = data.finalTimeDisplay || formatTime(data.mainTimer);

    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('URL_QUE_COPIASTE')) {
        console.warn("URL del script no configurada. No se enviarán los datos.");
        return;
    }
    const payload = {
        teamName: data.teamName,
        totalTime: timeToSend,
        totalScore: data.score,
        missionResults: data.missionResults
    };
    try {
        const formData = new FormData();
        formData.append('payload', JSON.stringify(payload));
        
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: formData,
        });
    } catch (error) {
        console.error("Error al enviar la actualización al backend:", error);
    }
}

// --- COMPONENTES DE REACT ---

// --- COMPONENTE MODAL PARA LAS INTERRUPCIONES DE LA AMENAZA ---
const AmenazaModal = ({ event, onComplete }) => {
    const [view, setView] = React.useState('visual');
    const videoRef = React.useRef(null);

    React.useEffect(() => {
        if (view !== 'visual') return;

        if (event.visual.type === 'video' && videoRef.current) {
            videoRef.current.play().catch(e => {
                console.error("Error al auto-reproducir video:", e);
                setView('challenge'); // Si falla la reproducción, saltar al desafío
            });
        } else if (event.visual.type === 'image') {
            const timer = setTimeout(() => {
                setView('challenge');
            }, event.visual.duration);
            return () => clearTimeout(timer);
        }
    }, [event, view]);

    const handleVisualEnd = () => {
        setView('challenge');
    };

    const ChallengeRenderer = () => {
        const { challenge } = event;
        const [feedback, setFeedback] = React.useState({ message: '', type: '' });
        const [isLocked, setIsLocked] = React.useState(false);
        const [answer, setAnswer] = React.useState('');
        const [timer, setTimer] = React.useState(challenge.timeLimit || 0);

        React.useEffect(() => {
            if (challenge.type !== 'corrupt_transmission' || isLocked) return;
            if (timer <= 0) {
                handleSubmit(true); return;
            }
            const interval = setInterval(() => setTimer(t => t > 0 ? t - 1 : 0), 1000);
            return () => clearInterval(interval);
        }, [timer, isLocked]);

        const handleSubmit = (isTimeout = false) => {
            if (isLocked) return;
            setIsLocked(true);
            const isCorrect = !isTimeout && answer.trim() === challenge.correctAnswer;
            const points = isCorrect ? challenge.bonusPoints : (isTimeout ? challenge.penaltyPoints : 0);
            const message = isCorrect
                ? `✔️ Señal recuperada. ¡Has ganado ${points} Fragmentos extra!`
                : (isTimeout
                    ? `❌ ¡Tiempo agotado! La Amenaza te ha costado ${Math.abs(points)} Fragmentos.`
                    : '❌ Respuesta incorrecta. La conexión se perdió.');

            setFeedback({ message, type: isCorrect ? 'success' : 'error' });
            setTimeout(() => onComplete({ points }), 3000);
        };

        const handleNarrativeContinue = () => {
             if (isLocked) return;
             setIsLocked(true);
             onComplete({ points: 0 });
        }

        switch (challenge.type) {
            case 'corrupt_transmission':
                return (
                    <div className="distortion-container">
                        <h3>{challenge.title}</h3>
                        <p>{challenge.message}</p>
                        <div className="distortion-timer">⏳ {timer}s</div>
                        <p className="distortion-challenge-text">{challenge.question}</p>
                        <input type="text" placeholder="Último dígito" value={answer} onChange={(e) => setAnswer(e.target.value)} disabled={isLocked} />
                        <button className="primary-button" onClick={() => handleSubmit(false)} disabled={isLocked}>RESPONDER</button>
                        {feedback.message && <p className={`feedback ${feedback.type}`}>{feedback.message}</p>}
                    </div>
                );
            case 'narrative_echo':
                 return (
                    <div className="distortion-container">
                         <h3>{challenge.title}</h3>
                         <p className="distortion-narrative-text">{challenge.message}</p>
                         <button className="primary-button" onClick={handleNarrativeContinue} disabled={isLocked}>CONTINUAR MISIÓN...</button>
                    </div>
                 );
            default:
                onComplete({ points: 0 }); // Falla segura si el tipo de desafío no es válido
                return null;
        }
    };

    return (
        <div className="amenaza-modal-overlay">
            <div className="amenaza-modal-content">
                {view === 'visual' && event.visual.type === 'video' && (
                    <video ref={videoRef} className="amenaza-visual" src={event.visual.src} onEnded={handleVisualEnd} muted playsInline />
                )}
                {view === 'visual' && event.visual.type === 'image' && (
                    <img className="amenaza-visual" src={event.visual.src} alt="Interrupción de la Amenaza" />
                )}
                {view === 'challenge' && <ChallengeRenderer />}
            </div>
        </div>
    );
};


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

const EnRutaPage = ({ nextLocation, onArrival, department, onFinishEarly }) => {
    const [isTraveling, setIsTraveling] = React.useState(true);
    React.useEffect(() => {
        const travelTimer = setTimeout(() => {
            setIsTraveling(false);
        }, 10000); 
        return () => clearTimeout(travelTimer);
    }, []);
    return (
        <div className="en-ruta-container">
            <img src="imagenes/VIAJANDO.png" alt="Portal Temporal Estilizado" className="portal-image" onError={(e) => { e.target.onerror = null; e.target.src='https://images.unsplash.com/photo-1520034475321-cbe63696469a?q=80&w=800&auto=format&fit=crop'; }} />
            <h3>VIAJANDO A TRAVÉS DEL TIEMPO...</h3>
            <p>Próxima Sincronización: <strong>{nextLocation}</strong> ({department})</p>
            <p className="progress-info">Sincronizando coordenadas temporales...</p>
            <div className="progress-bar-container"><div className="progress-bar-filler"></div></div>
            <p>¡Mantén el rumbo, Guardián! Evita las 'distorsiones temporales' (¡y las multas de tránsito!).</p>
            <button className="primary-button" onClick={onArrival} disabled={isTraveling}>{isTraveling ? 'SINCRONIZANDO...' : 'LLEGADA CONFIRMADA'}</button>
            <button className="finish-early-button" onClick={onFinishEarly}>Terminar Aquí</button>
        </div>
    );
};

const LongTravelPage = ({ onArrival, nextDepartment, onFinishEarly, onTriggerEvent }) => {
    const [isTraveling, setIsTraveling] = React.useState(true);
    
    React.useEffect(() => {
        const travelTimer = setTimeout(() => {
            setIsTraveling(false);
        }, 10000);

        let eventTimer;
        if (onTriggerEvent) {
            eventTimer = setTimeout(() => {
                onTriggerEvent();
            }, 5000);
        }

        return () => {
            clearTimeout(travelTimer);
            if(eventTimer) clearTimeout(eventTimer);
        }
    }, [onTriggerEvent]);
    
    const imageUrl = nextDepartment === 'Capital' ? 'imagenes/VIAJANDO1.png' : nextDepartment === 'Rivadavia' ? 'imagenes/VIAJANDO2.png' : 'imagenes/VIAJANDO.png';
    return (
        <div className="en-ruta-container">
            <img src={imageUrl} alt={`Viajando a ${nextDepartment}`} className="portal-image" />
            <h3>HORA DE VIAJAR MÁS LEJOS</h3>
            <p>Rápido, debemos movernos a <strong>{nextDepartment}</strong>, han aparecido nuevos fragmentos de la historia que debemos recoger.</p>
            <p className="progress-info">Abriendo portal de largo alcance...</p>
            <div className="progress-bar-container"><div className="progress-bar-filler"></div></div>
            <p style={{fontStyle: 'italic', fontSize: '0.9rem', opacity: 0.8}}>Es importante que respetes las señales de tránsito, hay controles secretos que pueden restarte puntos.</p>
            <button className="primary-button" onClick={onArrival} disabled={isTraveling}>{isTraveling ? 'VIAJANDO...' : 'HEMOS LLEGADO'}</button>
            <button className="finish-early-button" onClick={onFinishEarly}>Terminar Aquí</button>
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
        
        <Leaderboard />
    </div>
);

const AbortedGamePage = ({ score, finalTime, teamName }) => (
    <div className="end-container">
        <img src="https://cdn-icons-png.flaticon.com/512/784/784408.png" alt="Medalla o Trofeo Guardián" className="medal-image"/>
        <h3>MISION TEMPORAL DETENIDA</h3>
        <p><strong>{teamName}</strong></p>
        <p>Has estabilizado sólo una parte del tiempo de San Juan. ¡La ´Amenaza del Olvido´ ha logrado avanzar en la línea del tiempo.</p>
        
        <p><strong>Fragmentos de Historia Restaurados: {score}</strong></p>
        <p><strong>Tiempo Total de la Misión: {finalTime}</strong></p>
        
        <p>¡Has hecho un gran esfuerzo, tu Medalla de "Guardián del Tiempo"! 🏅 Los "Custodios Mayores" y otros reconocimientos serán anunciados en el Concilio de Guardianes.</p>
        <p style={{fontSize: "0.9rem", marginTop: "20px"}}><em>No olvides compartir tu hazaña y prepararte para la celebración.</em></p>
        
        <Leaderboard />
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

const AnchorSection = ({ stage, onComplete, onHintRequest, score }) => {
    const { anchor } = stage;
    const [keyword, setKeyword] = React.useState('');
    const [error, setError] = React.useState('');
    const [anchorTimer, setAnchorTimer] = React.useState(0);
    const [isLocked, setIsLocked] = React.useState(false);
    const [feedback, setFeedback] = React.useState({ message: '', type: '' });
    const [glowClass, setGlowClass] = React.useState('');
    const [pistaGenerada, setPistaGenerada] = React.useState(null);
    const [incorrectAttempts, setIncorrectAttempts] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (!isLocked) setAnchorTimer(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isLocked]);
    
    const handleHintRequest = () => {
        if (score >= 25 && !pistaGenerada) {
            onHintRequest();
            const pista = generarPistaDinamica(anchor.enablerKeyword);
            setPistaGenerada(pista);
        }
    };

    const calculateAnchorPoints = (timeInSeconds) => {
        if (timeInSeconds <= 60) return 100;
        if (timeInSeconds <= 120) return 80;
        if (timeInSeconds <= 180) return 60;
        if (timeInSeconds <= 240) return 40;
        if (timeInSeconds <= 300) return 20;
        return 0;
    };

    const handleUnlockInternal = () => {
        if (isLocked) return;

        if (keyword.toUpperCase().trim() === anchor.enablerKeyword.toUpperCase().trim()) {
            setIsLocked(true);
            const points = calculateAnchorPoints(anchorTimer);
            setError('');
            setGlowClass('success-glow');
            setFeedback({ message: `✔️ ¡Ancla estabilizada! Has recuperado ${points} Fragmentos.`, type: 'success' });
            setTimeout(() => onComplete({ points: points, time: anchorTimer }), 2500);
        } else {
            const newAttemptCount = incorrectAttempts + 1;
            setIncorrectAttempts(newAttemptCount);
            setGlowClass('error-glow');
            setTimeout(() => setGlowClass(''), 1500);

            if (newAttemptCount >= 3) {
                setError('');
                setIsLocked(true);
                setFeedback({ message: `❌ ¡Se agotaron los intentos! La distorsión se consolida. Avanzando...`, type: 'error' });
                setTimeout(() => onComplete({ points: 0, time: anchorTimer }), 2500);
            } else {
                const attemptsLeft = 3 - newAttemptCount;
                setError(`🚫 Ancla Temporal incorrecta. Quedan ${attemptsLeft} ${attemptsLeft === 1 ? 'intento' : 'intentos'}.`);
            }
        }
    };

    const handleSkip = () => {
        if (isLocked) return;
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

            {error && <p className="feedback error">{error}</p>}
            
            {!pistaGenerada && (
                <div className="hint-request-container">
                    <button
                        className="primary-button"
                        onClick={handleHintRequest}
                        disabled={score < 25 || isLocked}>
                        SOLICITAR PISTA (-25 Fragmentos)
                    </button>
                </div>
            )}
            
            {pistaGenerada && (
                <div className="hint-box hint-dynamic">
                    <p><strong>💡 Pista Recuperada:</strong> {pistaGenerada}</p>
                </div>
            )}

            <input type="text" placeholder="Ingresa el 'Ancla Temporal'" value={keyword} onChange={handleInputChange} onKeyPress={(e) => e.key === 'Enter' && handleUnlockInternal()} disabled={isLocked} />
            
            <div className="button-group">
                <button className="secondary-button" onClick={handleSkip} disabled={isLocked}>No sé</button>
                <button className="primary-button" onClick={handleUnlockInternal} disabled={isLocked}>🗝️ ANCLAR RECUERDO</button>
            </div>
            
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
            onComplete(200);
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

const Leaderboard = () => {
  const LEADERBOARD_URL = 'https://script.google.com/macros/s/AKfycbym5-onTOyzlqZn_G4O-5acxAZzReYjIOY5SF8tBh3TtT2jEFVw6IZ2MMMtkHGtRl0F/exec'; 

  const [ranking, setRanking] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchRanking = async () => {
      if (!LEADERBOARD_URL || LEADERBOARD_URL.includes('URL_QUE_COPIASTE')) {
        setError('URL del ranking no configurada.');
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch(LEADERBOARD_URL);
        if (!response.ok) {
          throw new Error('La respuesta del servidor no fue correcta.');
        }
        const data = await response.json();
        if (data.error) {
           throw new Error(data.error);
        }
        setRanking(data);
      } catch (err) {
        setError('No se pudo cargar el ranking. Intenta más tarde.');
        console.error("Error al obtener el ranking:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRanking();
  }, []);

  if (isLoading) {
    return <p className="feedback">Cargando el Ranking de Guardianes...</p>;
  }

  if (error) {
    return <p className="feedback error">{error}</p>;
  }

  return (
    <div className="leaderboard-container">
      <h3>CONCILIO DE GUARDIANES</h3>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Guardián</th>
            <th>Fragmentos</th>
            <th>Tiempo</th>
          </tr>
        </thead>
        <tbody>
          {ranking.slice(0, 10).map((team, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{team.teamName}</td>
              <td>{team.score}</td>
              <td>{team.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


// --- BLOQUE PRINCIPAL DE LA APP ---
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
    missionResults: [], 
    pendingAnchorResult: null,
    activeModalEvent: null,
    postModalStatus: null
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
        if (appState.status !== 'login' && appState.status !== 'finished' && appState.status !== 'aborted' && !appState.activeModalEvent) {
            interval = setInterval(() => {
                setAppState(prev => ({ ...prev, mainTimer: prev.mainTimer + 1 }));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [appState.status, appState.activeModalEvent]);

    const currentStageData = eventData.find(m => m.id === appState.currentMissionId);

    const handleLogin = (code, name) => {
        const initialState = getInitialState();
        const fullState = { ...initialState, status: 'in_game', squadCode: code, teamName: name };
        setAppState(fullState);
        sendResultsToBackend(fullState);
    };
    
    const handleAnchorComplete = (anchorResult) => {
        if (!currentStageData) return;
        const newScore = appState.score + anchorResult.points;
        setAppState(prev => ({ ...prev, score: newScore, subStage: 'trivia', pendingAnchorResult: anchorResult }));
    };
    
    const handleRequestHint = () => {
        setAppState(prev => ({
            ...prev,
            score: Math.max(0, prev.score - 25)
        }));
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
        const nextMission = eventData.find(m => m.id === currentStageData.nextMissionId);

        const newState = {
            ...appState,
            score: newScore,
            missionResults: updatedResults,
            pendingAnchorResult: null,
        };
        
        const triggeredEvent = distortionEventsData.find(e => e.trigger?.onMissionComplete === currentStageData.id);
        
        if (triggeredEvent) {
            const nextStatus = nextMission.department !== currentStageData.department ? 'long_travel' : 'on_the_road';
            setAppState({
                ...newState,
                activeModalEvent: triggeredEvent,
                postModalStatus: nextStatus, // Guardamos a dónde ir después del modal
            });
        } else {
            if (!nextMission) { handleFinalComplete(0); return; }
            const nextStatus = nextMission.department !== currentStageData.department ? 'long_travel' : 'on_the_road';
            const finalNewState = {...newState, status: nextStatus };
            setAppState(finalNewState);
            sendResultsToBackend(finalNewState);
        }
    };

    const handleModalComplete = (result) => {
        const newScore = Math.max(0, appState.score + (result.points || 0));
        
        const newState = {
            ...appState,
            score: newScore,
            activeModalEvent: null, // Cerramos el modal
            status: appState.postModalStatus || appState.status, // Volvemos al flujo guardado, o continuamos si estábamos en un viaje
            postModalStatus: null,
        };
        setAppState(newState);
        sendResultsToBackend(newState);
    }

    const handleFinalComplete = (bonusPoints) => {
        const totalSeconds = appState.mainTimer;
        const finalTime = formatTime(totalSeconds);
        const finalScore = (appState.score || 0) + (bonusPoints || 0);
        
        const finalState = { ...appState, score: finalScore, status: 'finished', finalTimeDisplay: finalTime };
        
        setAppState(finalState);
        sendResultsToBackend(finalState);
    };

    const handleArrival = () => {
        if (!currentStageData || typeof currentStageData.nextMissionId !== 'number') return;
        const nextMission = eventData.find(m => m.id === currentStageData.nextMissionId);
        if (nextMission) {
            setAppState(prev => ({ ...prev, currentMissionId: nextMission.id, status: 'in_game', subStage: 'anchor' }));
        } else {
            handleFinalComplete(0);
        }
    };

    const handleResetDevelopment = () => {
        if (window.confirm("¿Seguro que quieres reiniciar toda la misión y borrar los datos guardados? (Solo para desarrollo)")) {
            localStorage.removeItem('guardianesAppState');
            setAppState(getInitialState());
        }
    };

    const handleFinishEarly = () => {
        if (window.confirm('¿Estas seguro? Esto finalizará tu partida')) {
            const totalSeconds = appState.mainTimer;
            const finalTime = formatTime(totalSeconds);
            const finalScore = appState.score || 0;
            
            const finalState = { 
                ...appState, 
                score: finalScore, 
                status: 'aborted',
                finalTimeDisplay: finalTime 
            };
            
            setAppState(finalState);
            sendResultsToBackend(finalState);
        }
    };

    const renderContent = () => {
        if (appState.status === 'in_game' && !currentStageData) {
            return <p style={{padding: "20px"}}>Detectando anomalía temporal...</p>;
        }

        switch (appState.status) {
            case 'login':
                return <LoginPage onLogin={handleLogin} setErrorMessage={(msg) => setAppState(prev => ({ ...prev, errorMessage: msg }))} errorMessage={appState.errorMessage} />;
            
            case 'long_travel': {
                const fromDept = currentStageData.department;
                const nextMission = eventData.find(m => m.id === currentStageData.nextMissionId);
                if (!nextMission) { handleFinalComplete(0); return null; }
                const toDept = nextMission.department;

                const travelEvent = distortionEventsData.find(e => 
                    e.trigger?.onLongTravel?.from === fromDept && e.trigger?.onLongTravel?.to === toDept
                );
                
                return <LongTravelPage 
                            nextDepartment={toDept} 
                            onArrival={handleArrival} 
                            onFinishEarly={handleFinishEarly}
                            onTriggerEvent={travelEvent ? () => setAppState(prev => ({...prev, activeModalEvent: travelEvent})) : null}
                        />;
            }
            
            case 'on_the_road': {
                const nextMission = eventData.find(m => m.id === currentStageData.nextMissionId);
                if (!nextMission) {
                    handleFinalComplete(0);
                    return <EndGamePage score={appState.score} finalTime={appState.finalTimeDisplay} teamName={appState.teamName} />;
                }
                return <EnRutaPage 
                            nextLocation={nextMission.location} 
                            department={nextMission.department} 
                            onArrival={handleArrival}
                            onFinishEarly={handleFinishEarly}
                        />;
            }

            case 'in_game': {
                if(currentStageData.type === 'final') return <FinalSection stage={currentStageData} onComplete={handleFinalComplete} />;
                
                if (appState.subStage === 'anchor') return <AnchorSection 
                                                                stage={currentStageData} 
                                                                onComplete={handleAnchorComplete}
                                                                onHintRequest={handleRequestHint}
                                                                score={appState.score}
                                                            />;
                
                if (appState.subStage === 'trivia') return <TriviaSection stage={currentStageData} onComplete={handleTriviaComplete} />;
                break;
            }

            case 'finished':
                return <EndGamePage score={appState.score} finalTime={appState.finalTimeDisplay} teamName={appState.teamName} />;
            
            case 'aborted':
                return <AbortedGamePage score={appState.score} finalTime={appState.finalTimeDisplay} teamName={appState.teamName} />;
            
            default:
                return <p>Error: Estado desconocido.</p>;
        }
    };

    return (
        <div className="app-container">
            {appState.activeModalEvent && <AmenazaModal event={appState.activeModalEvent} onComplete={handleModalComplete} />}

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