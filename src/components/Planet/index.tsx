/* eslint-disable no-nested-ternary */

import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../GlobalRedux/hooks';
import { fetchPlanetData } from '../../GlobalRedux/store/reducers/planet';
import { planetText } from '../../utils/planetText';

import SimpleLoader from '../SimpleLoader';
import { useParams } from 'react-router-dom';
import PlanetComponent from './Planet';

export default function Planet() {
  const dispatch = useAppDispatch();
  const { name } = useParams();
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const planetWidth = useAppSelector((state) => state.home.currentWidth);
  const planetData = useAppSelector((state) => state.planet.planetData);
  const loading = useAppSelector((state) => state.planet.loading);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const planetInfo = planetText[0][name as keyof (typeof planetText)[0]];

  useEffect(() => {
    dispatch(fetchPlanetData());
  }, [dispatch]);

  return loading ? (
    <SimpleLoader />
  ) : (
    <div
      className="p-8 orbitron-font flex flex-col items-center justify-center w-full gap-5"
      style={
        isSideBarOpen
          ? isLargeScreen
            ? { width: planetWidth, float: 'right' }
            : { width: '100%', float: 'none' }
          : {}
      }
    >
      <div className="xl:max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-7xl gradient-text font-bold tracking-widest leading-tight">
          {planetInfo.name}
        </h1>
      </div>
      <p className="px-4 md:px-16 text-justify">{planetInfo.text}</p>
      <PlanetComponent planetData={planetData} />
    </div>
  );
}
