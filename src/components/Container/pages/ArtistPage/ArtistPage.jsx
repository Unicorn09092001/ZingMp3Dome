import ContentNavBar from "components/Container/components/ContentNavBar/ContentNavBar";
import { toggleThickenHeader } from "configSlice";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";
import AppHeader from "../../components/AppHeader/AppHeader";
import { setIsLoadingTab } from "Slice/isLoadingTabSlice";
import LoadingAnimate from "components/Container/components/LoadingAnimate/LoadingAnimate";
import { getApiArtistPage } from "app/services";
import { setArtistSection } from "Slice/artistPageDataSlice";

function ArtistPage() {
  const dispatch = useDispatch();
  const containerRef = useRef();
  const isLoading = useSelector((state) => state.isLoadingTab.isLoading);
  const artistData = useSelector((state) => state.artistPageData);

  useEffect(() => {
    dispatch(setIsLoadingTab(true));
    getApiArtistPage(artistData.alias).then((res) => {
      dispatch(setArtistSection(res.data.data.sections));
      dispatch(setIsLoadingTab(false));
    });
  }, [artistData.alias]);

  useEffect(() => {
    const containerElement = containerRef.current;
    const handleScrollContainer = (e) => {
      const scrollTop = e.target.scrollTop;

      dispatch(toggleThickenHeader(scrollTop > 10));
    };

    containerElement.addEventListener("scroll", handleScrollContainer);

    return () =>
      containerElement.removeEventListener("scroll", handleScrollContainer);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="app__container tab--personal" ref={containerRef}>
      {isLoading ? (
        <LoadingAnimate />
      ) : (
        <>
          <div className="content">
            <div className="content__navbar">
              <div className="content__navbar-container">
                <ul className="content__navbar-menu">
                  <li className="content__navbar-item active">
                    <NavLink to="." end>
                      Tổng quan
                    </NavLink>
                  </li>
                  <li className="content__navbar-item">
                    <NavLink to="feed">Hoạt động</NavLink>
                  </li>
                  <li className="content__navbar-item">
                    <NavLink to="event">Sự kiện</NavLink>
                  </li>
                  <li className="content__navbar-item hide-on-mobile">
                    <NavLink to="songs">Bài hát</NavLink>
                  </li>
                  <li className="content__navbar-item">
                    <NavLink to="single">Single & EP</NavLink>
                  </li>
                  <li className="content__navbar-item hide-on-mobile">
                    <NavLink to="album">Album</NavLink>
                  </li>
                  <li className="content__navbar-item hide-on-tablet-mobile">
                    <NavLink to="video">Mv</NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="content__container">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ArtistPage;
