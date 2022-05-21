import React, { forwardRef, useImperativeHandle, useRef } from "react";

function FavoriteArtistItem({ artist = {} }, ref) {
  const { title, thumbnail, artistsNames, song } = artist;
  const itemRef = useRef();

  useImperativeHandle(ref, () => ({
    getWidth() {
      return itemRef.current?.getBoundingClientRect().width;
    },
  }));

  return (
    <div className="row__item item--fav-artist" ref={itemRef}>
      <div className="row__item-container flex--top-left">
        <div className="row__item-display br-5">
          <div
            className="row__item-img img--square"
            style={{
              background: `url('${thumbnail}') no-repeat center center / cover`,
            }}
          ></div>
          <div className="row__item-actions">
            <div className="btn--fav-artist">
              <div className="control-btn btn-toggle-play">
                <i className="bi bi-play-fill icon-play"></i>
              </div>
            </div>
          </div>
          <div className="overlay"></div>
          <div className="blur"></div>
          <div className="row__item-display-content">
            <h3 className="display__content-title is-oneline">{title}</h3>
            <p className="display__content-artist is-oneline">{artistsNames}</p>
            <div className="display__content-list">
              {song.items.map((item, index) => (
                <div key={index} className="display__content-list-song">
                  <div
                    className="display__content-song-img"
                    style={{
                      background: `url('${item.thumbnail}') no-repeat center center / cover`,
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(FavoriteArtistItem);
