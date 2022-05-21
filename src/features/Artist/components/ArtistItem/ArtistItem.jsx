import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import {
  getFavoriteArtists,
  updateFavoriteArtists,
  removeFavoriteArtist,
} from "app/services";

function ArtistItem({ artist, defaultFavorite }, ref) {
  let isfavoriteArtist = false;
  const { totalFollow, thumbnail, name } = artist;
  const itemRef = useRef();
  const [isFavorite, setIsfavorite] = useState(defaultFavorite);

  const favoriteArtists = useSelector((state) => state.personalArtist.list);

  useEffect(() => {
    favoriteArtists.forEach((favoriteArtist) => {
      if (favoriteArtist.id === artist.id) {
        setIsfavorite(true);
      }
    });
  }, []);

  const handleChooseArtist = () => {
    setIsfavorite(!isFavorite);
    let isCheckFavoriteArtist = false;
    getFavoriteArtists().then((artistList) => {
      artistList.data.length === 0
        ? updateFavoriteArtists({ ...artist })
        : artistList.data.forEach((item, index) => {
            if (item.id === artist.id) {
              isCheckFavoriteArtist = true;
              removeFavoriteArtist(item.airtistId);
            } else if (index === artistList.data.length - 1) {
              isCheckFavoriteArtist
                ? (isCheckFavoriteArtist = false)
                : updateFavoriteArtists({ ...artist });
            }
          });
    });
  };

  useImperativeHandle(ref, () => ({
    getWidth() {
      return itemRef.current?.getBoundingClientRect().width;
    },
  }));

  return (
    <div className="row__item item--artist" ref={itemRef}>
      <div className="row__item-container flex--top-left">
        <div className="row__item-display is-rounded">
          <div
            className="row__item-img img--square is-rounded"
            style={{
              background: `url('${thumbnail}') no-repeat center center / contain`,
            }}
          ></div>
          <div className="row__item-actions">
            <div className="btn--play-playlist">
              <div className="control-btn btn-toggle-play">
                <i className="bi bi-play-fill icon-play"></i>
              </div>
            </div>
          </div>
          <div className="overlay"></div>
        </div>
        <div className="row__item-info media artist--info">
          <div className="media__left">
            <div
              href="#"
              className="row__info-name is-ghost mt-15 lh-19 text-center"
            >
              {name}&nbsp;
              <i className="bi bi-star-fill row__info-icon">
                <div className="icon-overlay"></div>
              </i>
            </div>
            <h3 className="row__info-creator text-center">
              {totalFollow} quan tâm
            </h3>
          </div>
        </div>
        <div className="row__item-btn">
          <button
            className="button is-small button-primary"
            onClick={() => handleChooseArtist()}
          >
            <i className="bi bi-check2"></i>
            {favoriteArtists.map((favoriteArtist, index) => {
              let renderContent = "";
              if (favoriteArtist.id === artist.id) {
                isfavoriteArtist = true;
                renderContent = (
                  <span>&nbsp;{isFavorite ? "Đã quan tâm" : "Quan tâm"}</span>
                );
              }
              if (index === favoriteArtists.length - 1) {
                if (isfavoriteArtist) {
                  isfavoriteArtist = false;
                } else {
                  renderContent = (
                    <span>&nbsp;{isFavorite ? "Đã quan tâm" : "Quan tâm"}</span>
                  );
                }
              }
              return renderContent;
            })}
          </button>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(ArtistItem);
