import HeartButton from "components/IconButton/HeartButton/HeartButton";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { useSelector } from "react-redux";

function AlbumItem({ album }, ref) {
  const { name, image } = album;
  const itemRef = useRef();

  let isFavoritePlaylist = false;

  const favoritePlaylists = useSelector((state) => state.personalPlaylist.list);

  useImperativeHandle(ref, () => ({
    getWidth() {
      return itemRef.current?.getBoundingClientRect().width;
    },
  }));

  return (
    <div className="row__item item--album" ref={itemRef}>
      <div className="row__item-container flex--top-left">
        <div className="row__item-display br-5">
          <div
            className="row__item-img img--square"
            style={{
              background: `url('${image}') no-repeat center center / cover`,
            }}
          ></div>
          <div className="row__item-actions">
            {favoritePlaylists.map((favoriteSong, index) => {
              let renderContent = "";
              if (favoriteSong.encodeId === album.encodeId) {
                isFavoritePlaylist = true;
                renderContent = (
                  <HeartButton
                    key={favoriteSong.encodeId}
                    primary
                    hideOnMobile
                    optionalClass="option-btn"
                    playlistInfo={album}
                  />
                );
              }
              if (index === favoritePlaylists.length - 1) {
                if (isFavoritePlaylist) {
                  isFavoritePlaylist = false;
                } else {
                  renderContent = (
                    <HeartButton
                      key={favoriteSong.encodeId}
                      hideOnMobile
                      optionalClass="option-btn"
                      playlistInfo={album}
                    />
                  );
                }
              }
              return renderContent;
            })}
            <div className="btn--play-playlist">
              <div className="control-btn btn-toggle-play">
                <i className="bi bi-play-fill"></i>
              </div>
            </div>
            <div className="action-btn">
              <i className="btn--icon bi bi-three-dots"></i>
            </div>
          </div>
          <div className="overlay"></div>
        </div>
        <div className="row__item-info">
          <a href="/" className="row__info-name is-twoline">
            {name}
          </a>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(AlbumItem);
