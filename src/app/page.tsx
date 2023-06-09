'use client';

import { useEffect } from 'react';
import { RingLoader } from 'react-spinners';
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import StarsCanvas from '@/components/Stars';
import WorldMap from '@/components/WorldMap';
import { setLoading } from '@/GlobalRedux/store/reducers/home'; // Importez l'action appropriée pour définir l'état spinner
import { Dna } from 'react-loader-spinner';

export default function Home() {
  const dispatch = useAppDispatch();
  const override = useAppSelector((state) => state.home.override);
  const loading = useAppSelector((state) => state.home.spinner);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 3000);
  }, [dispatch]);

  return (
    <main className="min-h-screen m-auto">
      <NavBar />
      <SideBar category={undefined} data={undefined} />
      {loading && (
        <div
          className="Loader m-auto"
          style={isSideBarOpen ? { width: 'calc(100% + 181px)' } : {}}
        >
          <Dna
            visible={loading}
            height="300"
            width="300"
            ariaLabel="dna-loading"
            wrapperStyle={{ margin: '15rem auto' }}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}
      {!loading && <WorldMap />}
      <Footer />
      <StarsCanvas />
    </main>
  );
}
