import React, {useState} from 'react'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

const SliderWelcome = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const steps = 5;

    const handleSlideChange = (index) => {
        setCurrentIndex(index);
      }

      const NextButton = ({ onClick }) => (
        <button className="btn btn-primary effect effect-1" onClick={onClick}>
            Siguiente
        </button>
    )

      const PreviousButton = ({ onClick }) => (
          <button className="btn btn-prev effect effect-3" onClick={onClick}>
              Anterior
          </button>
      )

      const FinishButton = ({ onClick }) => (
          <button className="btn btn-terciary effect effect-1" onClick={onClick}>
              Finalizar
          </button>
      )


  return (
    <Slider
        classNames={`slider-wrapper`}
        direction="horizontal"
        duration={1000}
        onSlideChange={({ slideIndex }) => handleSlideChange(slideIndex)}
        previousButton={currentIndex > 0 && <PreviousButton onClick={() => setCurrentIndex(currentIndex - 1)} />}
        nextButton={currentIndex < steps - 1 ? <NextButton onClick={() => setCurrentIndex(currentIndex + 1)} /> : <FinishButton />}
    >
        <div key={0} className="slider-content">
            <div className="center inner">
                <div className='welcome-welcome-item relative'>
                    <h3 className='welcome-welcome-title'>Primer título</h3>
                    <img src='/1.svg' alt='Iconografía 1'/>
                    <span className='top-0 start-0 absolute step-span'>Paso 1</span>
                </div>
            </div>
        </div>

        <div key={1}>
            <div className="center">
                <div className='welcome-welcome-item relative'>
                    <div className={`welcome-welcome-item-content ${currentIndex === 2 ? 'overflow-hidden' : ''}`}>
                        <h3 className='welcome-welcome-title'>Segundo título</h3>
                    </div>
                    <img src='/2.svg' alt='Iconografía 2'/>
                    <span className='top-0 start-0 absolute step-span'>Paso 2</span>
                </div>
            </div>
        </div>

        <div key={2}>
            <div className="center">
                <div className='welcome-welcome-item relative'>
                    <h3 className='welcome-welcome-title'>Tercer título</h3>
                    <img src='/3.svg' alt='Iconografía 3'/>
                    <span className='top-0 start-0 absolute step-span'>Tercer título</span>
                </div>
            </div>
        </div>

        <div key={3}>
            <div className="center">
                <div className='welcome-welcome-item relative'>
                    <h3 className='welcome-welcome-title'>Cuarto título</h3>
                    <img src='/4.svg' alt='Iconografía 4'/>
                    <span className='top-0 start-0 absolute step-span'>Paso 4</span>
                </div>
            </div>
        </div>

        <div key={4}>
            <div className="center">
                <div className='welcome-welcome-item relative d-flex flex-column justify-content-between'>
                    <h3 className='welcome-welcome-title'>Quinto título</h3>
                    <img src='/5.svg' alt='Iconografía 5'/>
                    <span className='top-0 start-0 absolute step-span'>Paso 5</span>
                </div>
            </div>
        </div>

    </Slider>
  )
}

export default SliderWelcome