/* eslint-disable no-nested-ternary */

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useAppDispatch, useAppSelector } from '../../GlobalRedux/hooks';
import { fetchRestCountries } from '../../GlobalRedux/store/reducers/country';
import { fetchGraph } from '../../GlobalRedux/store/reducers/graph';
import { fetchRadio } from '../../GlobalRedux/store/reducers/infos';
import { fetchFavoritesCountries } from '../../GlobalRedux/store/reducers/user';
import { fetchPictures } from '../../GlobalRedux/store/reducers/picture';

import RestCountriesInfos from '../RestCountriesInfos';
import GraphCountry from '../GraphCountry';
import SimpleLoader from '../SimpleLoader';
import Infos from '../Infos';
import Pictures from '../Pictures';

export default function Country() {
  const dispatch = useAppDispatch();
  const { id } = useParams(); // Récupération de l'ID du pays depuis l'URL
  const countryId = id; // Utilisation de l'ID du pays
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const Width = useAppSelector((state) => state.home.currentWidth);

  const category = useAppSelector((state) => state.graph.category);
  const data = useAppSelector((state) => state.country.data);
  const radio = useAppSelector((state) => state.infos.radio);
  const insolite = useAppSelector((state) => state.infos.insolite);
  const celebrity = useAppSelector((state) => state.infos.celebrity);
  const pictures = useAppSelector((state) => state.picture.pictures);

  const loadingCountry = useAppSelector((state) => state.country.loading);
  const loadingPicture = useAppSelector((state) => state.picture.loading);
  const loadingGraph = useAppSelector((state) => state.graph.loading);
  const loadingInfos = useAppSelector((state) => state.infos.loading);
  const favoritesCountries = useAppSelector(
    (state) => state.user.favoritesCountries
  );
  const isLogged = useAppSelector((state) => state.user.isLogged);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchRestCountries(countryId as string));
      await dispatch(fetchPictures(countryId as string));
      await dispatch(fetchGraph(countryId as string));
      await dispatch(fetchRadio(countryId as string));
    };

    fetchData();
    if (isLogged) {
      dispatch(fetchFavoritesCountries());
    }
  }, [dispatch, isLogged, countryId]);

  if (countryId === 'ATA') {
    return (
      <div
        className="p-8 flex flex-col items-center justify-center w-full gap-5"
        style={
          isSideBarOpen
            ? isLargeScreen
              ? { width: Width, float: 'right' }
              : { width: '100%', float: 'none' }
            : {}
        }
      >
        <img
          src="https://media.tenor.com/PFQXvlb1MicAAAAd/walking-emperor-penguin-migration.gif"
          alt="pingouins"
        />
      </div>
    );
  }

  return (
    <div
      className="orbitron-font flex flex-col items-center justify-center w-full gap-5"
      style={
        isSideBarOpen
          ? isLargeScreen
            ? { width: Width, float: 'right' }
            : { width: '100%', float: 'none' }
          : {}
      }
    >
      {loadingCountry ? (
        <SimpleLoader />
      ) : (
        <>
          <div id="informations" className="xl:max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-7xl gradient-text font-bold tracking-widest leading-tight">
              Basic informations
            </h2>
          </div>
          <RestCountriesInfos
            countryData={data}
            countryId={countryId as string}
            favoritesCountries={favoritesCountries}
          />
        </>
      )}
      {loadingPicture ? (
        <SimpleLoader />
      ) : (
        <>
          <div id="pictures" className="xl:max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-7xl gradient-text font-bold tracking-widest leading-tight">
              Landscapes
            </h2>
          </div>
          <Pictures pictures={pictures} />
        </>
      )}
      {loadingInfos ? (
        <SimpleLoader />
      ) : (
        <>
          <div id="original" className="xl:max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-7xl gradient-text font-bold tracking-widest leading-tight">
              Original informations
            </h2>
          </div>
          <Infos radio={radio} insolite={insolite} celebrity={celebrity} />
        </>
      )}
      {loadingGraph ? (
        <SimpleLoader />
      ) : (
        <>
          <div id="detailed" className="xl:max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-7xl gradient-text font-bold tracking-widest leading-tight">
              Detailed analysis
            </h2>
          </div>
          <GraphCountry category={category} />
        </>
      )}
    </div>
  );
}
