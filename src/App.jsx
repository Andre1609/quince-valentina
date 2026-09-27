import React, { useState, useEffect, useRef } from 'react';
import RSVPForm from './RSVPForm';
import './App.css'; 

// Importación de tus imágenes
import vestidoImg from './assets/vestido.jpg'; 
import ternoImg from './assets/terno.jpg';
import sobreImg from './assets/sobre.webp';
import sobreAbiertoImg from './assets/sobre-abierto.jpg';
import musicaFondo from './assets/musica-fondo.mp3';
import marcoAuroraImg from './assets/marco-aurora.jpg';
import nombreValentinaImg from './assets/nombre-valentina-3d.jpg';
import coronaPrincesaImg from './assets/corona-princesa.jpg';
import cajaRegaloImg from './assets/caja-regalo.webp';


function App() {
  const [isOpened, setIsOpened] = useState(false);
  const audioRef = useRef(null);

  const handleAbrirInvitacion = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Reproducción automática bloqueada:", error);
      });
    }
  };

  // ======= CONFIGURACIÓN DE FECHA =======
  const EVENT_DATE = new Date('2026-09-25T20:30:00'); 
  
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [isToday, setIsToday] = useState(false);
  const [dressCode, setDressCode] = useState('mujeres'); 

  // Lógica del Countdown
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = EVENT_DATE - now;

      if (diff <= 0) {
        setIsToday(true);
        return;
      }

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff / 3600000) % 24);
      const mins = Math.floor((diff / 60000) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, mins, secs });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animaciones al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [isOpened]);

  return (
    <div className="App">
      <audio ref={audioRef} src={musicaFondo} loop />

      {!isOpened ? (
        /* ===== PANTALLA 1: INVITACIÓN CERRADA ===== */
        <div className="welcome-screen">
          <div className="welcome-content">
            <h1 className="welcome-subtitle">Mis 15 años</h1>
            <p className="welcome-date-elegant">25 . 09 . 2026</p>
            <div className="envelope-container">
              <img src={sobreImg} alt="Sobre cerrado" className="envelope-image" />
            </div>
            <h2 className="welcome-name">Valentina</h2>
            <button className="open-btn-elegant" onClick={handleAbrirInvitacion}>
              ABRIR
            </button>
          </div>
        </div>
      ) : (
        /* ===== PANTALLA 2: INVITACIÓN ABIERTA ===== */
        <div className="opened-screen">

          {/* Portada */}
          <div className="portada-container">
            <div
              className="portada-fondo-blur"
              style={{ backgroundImage: `url(${sobreAbiertoImg})` }}
            ></div>
            <img
              src={sobreAbiertoImg}
              alt="Invitación Abierta de Valentina"
              className="full-screen-image"
            />
          </div>

          {/* Contador */}
          <div className="countdown-section">
            <h2 className="countdown-title">Faltan</h2>
            {isToday ? (
              <p className="today">¡Hoy es el gran día!</p>
            ) : (
              <div className="countdown">
                <div className="cd-unit">
                  <span>{String(timeLeft.days).padStart(2, '0')}</span>
                  <label>días</label>
                </div>
                <div className="cd-divider"></div>
                <div className="cd-unit">
                  <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                  <label>horas</label>
                </div>
                <div className="cd-divider"></div>
                <div className="cd-unit">
                  <span>{String(timeLeft.mins).padStart(2, '0')}</span>
                  <label>min</label>
                </div>
                <div className="cd-divider"></div>
                <div className="cd-unit">
                  <span>{String(timeLeft.secs).padStart(2, '0')}</span>
                  <label>seg</label>
                </div>
              </div>
            )}
          </div>

          {/* Princesa */}
          <div className="seccion-princesa">
            <img src={marcoAuroraImg} alt="Princesa Aurora" className="img-princesa" />
          </div>

          {/* Separador */}
          <div className="separador-decorativo">
            <svg className="separador-icono" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 9l10 13L22 9 12 2zm0 2.5L18.5 9H14l-2-4.5zM12 4.5L9.5 9H5.5l6.5-4.5zM5.29 10.5H9.7l1.8 8.1-6.21-8.1zm7.5 8.1l1.8-8.1h4.41l-6.21 8.1z"/>
            </svg>
          </div>

          {/* Corona */}
          <div className="seccion-corona">
            <img src={coronaPrincesaImg} alt="Corona de Quinceañera" className="img-corona" />
          </div>
            
          {/* Agradecimientos */}
          <section className="agradecimientos">
            <p className="eyebrow">Con todo mi cariño, agradezco</p>

            <div className="agradecimientos-bloque">
              <p className="agradecimientos-label">A mis padres</p>
              <h3 className="agradecimientos-nombres">
                Carlos Flores Grandez<br />
                <span className="agradecimientos-y">&</span><br />
                Gissela Reyes Mayo
              </h3>
              <p className="agradecimientos-frase">
                Por su amor incondicional, su guía y su apoyo a lo largo de este camino que me ha traído hasta este día tan especial, el cual celebro con gran alegría y emoción.
              </p>
            </div>

            <div className="agradecimientos-divider"></div>

            <div className="agradecimientos-bloque">
              <p className="agradecimientos-label">Y a mis padrinos</p>
              <h3 className="agradecimientos-nombres agradecimientos-padrinos">
                Esther Mayo Quispe<br />
                Violeta Mayo Quispe<br />
                Ronald Reyes Mayo<br />
                Diego Alza Guzman
              </h3>
              <p className="agradecimientos-frase">
                Por su cariño, aliento y apoyo, y por ser parte de este momento tan significativo.
              </p>
            </div>
          </section>

          {/* ======= MENSAJE ======= */}
          <section className="message">
            <div className="message-card">
              {/* 👇 Agregamos este título 👇 */}
              <h3 className="message-title">Nuestra mayor bendición</h3>
              
              <p className="reveal">
                "Dios y la vida nos han bendecido viendo crecer a nuestra hija, convertida hoy en una joven maravillosa. Al llegar a sus 15 años, queremos compartir nuestra felicidad con quienes han sido parte de su camino. ¡Acompáñenos a festejar este gran día!" 
              </p>
            </div>
          </section>


          {/* Detalles */}
          <section className="details">
            <p className="eyebrow">Detalles</p>

            <div className="detail-row reveal">
              <p className="detail-label">Ceremonia</p>
              <div className="detail-body">
                <div className="ceremonia-info">
                  <div className="ceremonia-texto">
                    <p>Hacienda Alessa - Salón de Recepciones</p>
                    <p className="detail-address">Av. Los Ciruelos 357, San Juan de Lurigancho</p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Av.+Los+Ciruelos+357,+San+Juan+de+Lurigancho" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="detail-link"
                    >
                      Cómo llegar
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-row reveal" style={{ alignItems: 'flex-start' }}>
              <p className="detail-label" style={{ marginTop: '0.5rem' }}>Vestimenta</p>
              <div className="detail-body" style={{ width: '100%' }}>
                <div className="rsvp-toggle" style={{ justifyContent: 'flex-start', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <button
                    type="button"
                    className={`toggle-option ${dressCode === 'mujeres' ? 'active' : ''}`}
                    style={{ color: dressCode !== 'mujeres' ? 'var(--wine)' : undefined, opacity: dressCode !== 'mujeres' ? 0.5 : 1 }}
                    onClick={() => setDressCode('mujeres')}
                  >
                    Damas
                  </button>
                  <button
                    type="button"
                    className={`toggle-option ${dressCode === 'varones' ? 'active' : ''}`}
                    style={{ color: dressCode !== 'varones' ? 'var(--wine)' : undefined, opacity: dressCode !== 'varones' ? 0.5 : 1 }}
                    onClick={() => setDressCode('varones')}
                  >
                    Varones
                  </button>
                </div>

                <div className="vestimenta-layout">
                  {dressCode === 'mujeres' ? (
                    <>
                      <img src={vestidoImg} alt="Mujeres" style={{ width: '90px', height: '180px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--brass-light)', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                        <p style={{ color: 'var(--brass)', fontSize: '1rem', marginBottom: '0.3rem' }}>Vestido</p>
                        <p style={{ fontSize: '0.85rem', opacity: 0.7, overflowWrap: 'break-word', margin: 0, paddingBottom: '0.5rem' }}>La quinceañera se reserva el color rosa en todos sus tonos</p>
                        <div className="palette">
                          <span style={{ backgroundColor: 'var(--brass)' }}></span>
                          <span style={{ backgroundColor: '#af2437' }}></span>
                          <span style={{ backgroundColor: 'var(--wine)' }}></span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <img src={ternoImg} alt="Varones" style={{ width: '90px', height: '180px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--brass-light)', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                        <p style={{ color: 'var(--brass)', fontSize: '1rem', marginBottom: '0.2rem' }}>Terno y zapatos de vestir</p>
                        <p style={{ fontSize: '0.85rem', opacity: 0.7, overflowWrap: 'break-word', margin: 0 }}>Se recomiendan colores oscuros</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        
          {/* Sección de regalos */}
          <section className="regalos">
            <div className="regalos-content">
              <h2 className="regalos-titulo">Un detalle para celebrar juntos</h2>
                <p className="regalos-subtitulo">
                Como parte de esta celebración, agradeceré mucho contar con un regalo de tu parte.
              </p>
            

              <div className="regalo-destacado">
                <div className="resplandor-divino"></div>
                <img src={cajaRegaloImg} alt="Caja de regalo" className="regalo-caja-img" />
                
              </div>
            </div>
          </section>

      
          {/* RSVP */}
          <section className="rsvp">
            <p className="eyebrow">Confirma tu Asistencia</p>
            <p className="rsvp-sub">Por favor confirmar antes del 25/09/2026</p>
            <RSVPForm />
          </section>

          {/* Footer */}
          <footer className="footer">
            <p className="footer-numeral" aria-hidden="true">XV</p>
            <p className="footer-text">Con cariño te espera,</p>
            <p className="footer-name">Valentina Flores Reyes</p>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
