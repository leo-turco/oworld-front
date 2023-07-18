import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../GlobalRedux/hooks';
import { IPlanet, Mars } from '../../@types/planetDatas';
import { fadeIn } from '../../utils/motion';

import SimpleLoader from './../SimpleLoader';
import { useParams } from 'react-router-dom';

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function PlanetComponent({ planetData }: { planetData: IPlanet }) {
  const { name } = useParams();
  const planetName = name ? capitalizeFirstLetter(name) : '';
  const planet = planetData[planetName as keyof typeof planetData] || null;
  console.log('planetData :', planet);

  const infiniteLoadingInfos = useAppSelector(
    (state) => state.planet.infiniteLoading
  );

  if (infiniteLoadingInfos || Object.keys(planetData).length === 0) {
    return <SimpleLoader />;
  }

  const parseValue = (valueString: string) => {
    let match = valueString.match(/([\d.]+) years/);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }

    match = valueString.match(/([\d.]+) days/);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }

    match = valueString.match(/([\d.]+) hours/);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }

    match = valueString.match(/(-?[\d.]+) °C/);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }

    match = valueString.match(/(-?[\d,]+) km/);
    if (match && match[1]) {
      return parseFloat(match[1].replace(',', ''));
    }

    return 0;
  };

  const orbitalPeriod = parseValue(planet.orbitalPeriod);
  const rotationPeriod = parseValue(planet.rotationPeriod);
  const averageTemperature = parseValue(planet.averageTemperature);
  const diameter = parseValue(planet.diameter);

  const infoItems = [
    { title: 'Mass', value: planet.mass },
    {
      title: 'Diameter',
      value: diameter,
      unit: 'km',
    },
    {
      title: 'Orbital Period',
      value: orbitalPeriod,
      unit: 'Years',
    },
    {
      title: 'Rotation Period',
      value: rotationPeriod,
      unit: 'Hours',
    },
    {
      title: 'Average Temperature',
      value: averageTemperature,
      unit: '°C',
    },
  ];

  return (
    <motion.div
      className="orbitron-font flex flex-col md:flex-row items-center justify-center w-full h-full"
      style={{ height: 'auto', position: 'relative' }}
    >
      <motion.div
        className="flex flex-col items-center justify-center md:w-1/3"
        variants={fadeIn('up', 'spring', 0.5, 1)}
        initial="hidden"
        animate="show"
      >
        <motion.img
          className="w-96 h-96"
          src={`/${planetName}.png`}
          alt={'Picture of ' + planetName}
        />
      </motion.div>

      <motion.div
        className="flex flex-col items-center justify-center text-center md:w-1/3"
        variants={fadeIn('up', 'spring', 1, 1)}
        initial="hidden"
        animate="show"
      >
        {infoItems.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="stat-title text-base-content">{item.title}</div>
            <div className="stat-value text-secondary-focus">
              {item.unit ? (
                <CountUp
                  start={0}
                  end={item.value}
                  duration={8}
                  separator=","
                />
              ) : (
                item.value
              )}
              {item.unit && ` ${item.unit}`}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default PlanetComponent;
