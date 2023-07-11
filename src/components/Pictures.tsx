/* eslint-disable jsx-a11y/media-has-caption */

import { useAppSelector } from '../GlobalRedux/hooks';
import { Picture } from '../@types/pictures';

import SimpleLoader from './SimpleLoader';
import { useState } from 'react';

interface PicturesComponentProps {
  pictures: Picture[] | null;
}
function Pictures({ pictures }: PicturesComponentProps) {
  const infiniteLoadingInfos = useAppSelector(
    (state) => state.picture.infiniteLoading
  );

  if (infiniteLoadingInfos || !pictures) {
    return <SimpleLoader />;
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pictures.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + pictures.length) % pictures.length
    );
  };

  return (
    <section className="p-8 flex flex-col items-center justify-center w-full gap-5 orbitron-font">
      <div
        className="carousel-container w-full relative"
        style={{ height: '45rem' }}
      >
        {pictures.length && (
          <>
            <img
              className="carousel-image w-full h-full object-cover"
              src={pictures[currentIndex].url}
              alt={pictures[currentIndex].description}
            />
            <div className="carousel-caption absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white text-center">
              <p>{pictures[currentIndex].author}</p>
              <p>
                {pictures.length &&
                  pictures[currentIndex].description.charAt(0).toUpperCase() +
                    pictures[currentIndex].description.slice(1)}
              </p>
            </div>
          </>
        )}
        <div className="carousel-controls absolute top-1/2 transform -translate-y-1/2 left-5 right-5 flex justify-between">
          <button className="btn btn-circle" onClick={prevSlide}>
            ❮
          </button>
          <button className="btn btn-circle" onClick={nextSlide}>
            ❯
          </button>
        </div>
      </div>
    </section>
  );
}

export default Pictures;
