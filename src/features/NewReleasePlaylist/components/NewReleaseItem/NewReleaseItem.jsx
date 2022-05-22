import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setArtistAlias } from "Slice/artistPageDataSlice";

function NewReleaseItem({ newReleasePlaylist = {}, itemIndex }, ref) {
  const { thumbnailM, title, artists } = newReleasePlaylist;
  const itemRef = useRef();
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    getWidth() {
      return itemRef.current?.getBoundingClientRect().width;
    },
  }));

  return (
    <div className="row__item item--new-playlist" ref={itemRef}>
      <div className="row__item-container flex--top-left">
        <div className="row__item-display br-5">
          <div
            className="row__item-img img--square"
            style={{
              background: `url('${thumbnailM}') no-repeat center center / cover`,
            }}
          ></div>
          <div className="row__item-actions">
            <div className="btn--play-new-playlist">
              <div className="control-btn btn-toggle-play">
                <i className="bi bi-play-fill"></i>
              </div>
            </div>
          </div>
          <div className="overlay"></div>
        </div>
        <div className="row__item-info new-playlist--info">
          <span className="row__info-name is-twoline">{title}</span>
          <h3 className="row__info-creator">
            {artists.map((artist, index) => (
              <React.Fragment key={index}>
                <NavLink
                  to={"/artist/name=" + artist.alias}
                  className="is-ghost"
                  onClick={() => {
                    dispatch(setArtistAlias(artist.alias));
                  }}
                >
                  {artist.name}
                </NavLink>
                {index < artists.length - 1 && ","}
              </React.Fragment>
            ))}
          </h3>
          <div className="row__item-detail">
            <div className="info__detail-order">#{itemIndex}</div>
            <div className="info__detail-time">
              {newReleasePlaylist?.album
                ? newReleasePlaylist.album.releaseDate.replaceAll("/", ".")
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(NewReleaseItem);
