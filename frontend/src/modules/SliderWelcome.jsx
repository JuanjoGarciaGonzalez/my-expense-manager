import React, {useState} from 'react'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

const SliderWelcome = ({onClose}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const steps = 5;

    const handleSlideChange = (index) => {
        setCurrentIndex(index);
      }

      const NextButton = ({ onClick }) => (
        <button className="effect effect-2 relative w-[180px] text-[#222831] bg-[#EEEEEE] mb-3 text-xs font-semibold inline-flex items-center justify-center gap-1" onClick={onClick}>
            Siguiente
        </button>
    )

      const PreviousButton = ({ onClick }) => (
          <button className="effect effect-2 relative w-[180px] text-[#222831] bg-[#EEEEEE] mb-3 text-xs font-semibold inline-flex items-center justify-center gap-1" onClick={onClick}>
              Anterior
          </button>
      )

      const FinishButton = ({ onClick }) => (
          <button className="effect effect-2 relative w-[180px] text-[#222831] bg-[#EEEEEE] mb-3 text-xs font-semibold inline-flex items-center justify-center gap-1" onClick={onClick}>
              Finalizar
          </button>
      )


  return (
    <div className='welcome-welcome-container'>
    <Slider
        classNames={`slider-wrapper px-5 py-5`}
        direction="horizontal"
        duration={1000}
        onSlideChange={({ slideIndex }) => handleSlideChange(slideIndex)}
        previousButton={currentIndex > 0 && <PreviousButton onClick={() => setCurrentIndex(currentIndex - 1)} />}
        nextButton={currentIndex < steps - 1 ? <NextButton onClick={() => setCurrentIndex(currentIndex + 1)} /> : <FinishButton onClick={() => onClose()}/>}
      >
        <div key={0} className="slider-content">
          <div className="center inner">
            <div className="welcome-welcome-item relative">
              <h3 className="welcome-welcome-title">Bienvenido a nuestra aplicación de gestión de finanzas</h3>
              <img src="/1.svg" alt="Iconografía 1" />
              <span className="top-0 start-0 absolute step-span">Paso 1</span>
              <p>En esta aplicación podrás registrar tus gastos e ingresos de manera fácil y segura.</p>
            </div>
          </div>
        </div>

        <div key={1}>
          <div className="center">
            <div className="welcome-welcome-item relative">
              <h3 className="welcome-welcome-title">Crea tus categorías de gastos e ingresos</h3>
              <img src="/2.svg" alt="Iconografía 2" />
              <span className="top-0 start-0 absolute step-span">Paso 2</span>
              <p>Puedes crear categorías personalizadas para tus gastos e ingresos, como "Alimentación", "Transporte", "Vivienda", etc.</p>
            </div>
          </div>
        </div>

        <div key={2}>
          <div className="center">
            <div className="welcome-welcome-item relative">
              <h3 className="welcome-welcome-title">Registra tus gastos e ingresos</h3>
              <img src="/3.svg" alt="Iconografía 3" />
              <span className="top-0 start-0 absolute step-span">Paso 3</span>
              <p>Registra tus gastos e ingresos en la categoría correspondiente, indicando el monto y la fecha.</p>
            </div>
          </div>
        </div>

        <div key={3}>
          <div className="center">
            <div className="welcome-welcome-item relative">
              <h3 className="welcome-welcome-title">Clasifica tus gastos e ingresos como ordinarios o extraordinarios</h3>
              <img src="/4.svg" alt="Iconografía 4" />
              <span className="top-0 start-0 absolute step-span">Paso 4</span>
              <p>Puedes clasificar tus gastos e ingresos como ordinarios (gastos mensuales) o extraordinarios (gastos ocasionales).</p>
            </div>
          </div>
        </div>

        <div key={4}>
          <div className="center">
            <div className="welcome-welcome-item relative d-flex flex-column justify-content-between">
              <h3 className="welcome-welcome-title">Visualiza tus gastos e ingresos en gráficos y tablas</h3>
              <img src="/5.svg" alt="Iconografía 5" />
              <span className="top-0 start-0 absolute step-span">Paso 5</span>
              <p>Puedes visualizar tus gastos e ingresos en gráficos y tablas para tener una mejor comprensión de tus finanzas.</p>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  )
}

export default SliderWelcome