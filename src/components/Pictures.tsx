/* eslint-disable jsx-a11y/media-has-caption */

import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../utils/motion';
import { useAppSelector } from '../GlobalRedux/hooks';
import { Picture } from '../@types/pictures';

import SimpleLoader from './SimpleLoader';

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

  return (
    <section className="p-8 flex flex-col items-center justify-center w-full gap-5 orbitron-font">
      <motion.div
        variants={staggerContainer(0.1, 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="flex flex-col items-center justify-center w-full gap-5"
      >
        <div
          id="landscapes"
          className="container px-4 mx-auto w-full text-center"
        >
          {pictures.map((picture, index) => (
            <div key={index}>
              <img src={picture.url} alt={picture.description} />
              <p>{picture.author}</p>
              <p>{picture.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Pictures;
