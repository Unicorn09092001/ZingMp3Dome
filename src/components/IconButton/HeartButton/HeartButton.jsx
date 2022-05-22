import clsx from "clsx";
import React, { useMemo, useState } from "react";
import "../SongIconButton.scss";
import {
  getFavoriteSongs,
  updateFavoriteSongs,
  removeFavoriteSong,
  getFavoritePlaylists,
  updateFavoritePlaylists,
  removeFavoritePlaylist,
} from "app/services";
import { useSelector } from "react-redux";

function HeartButton({
  primary: isPrimary = false,
  hideOnMobile = false,
  optionalClass = "",
  songInfo,
  playlistInfo,
}) {
  const { isFavorite } = useSelector((state) => state.songCurrentData);
  const [primary, setPrimary] = useState(isPrimary);
  const heartIcon = useMemo(
    () => (primary ? "bi-heart-fill" : "bi-heart"),
    [primary]
  );

  const handleChangePrimary = () => {
    let isCheckFavoriteSong = false;
    let isCheckFavoritePlaylist = false;
    setPrimary(!primary);
    if (songInfo) {
      getFavoriteSongs().then((songList) => {
        songList.data.length === 0
          ? updateFavoriteSongs({ ...songInfo })
          : songList.data.forEach((song, index) => {
              if (song.encodeId === songInfo.encodeId) {
                removeFavoriteSong(song.id);
                isCheckFavoriteSong = true;
              } else if (index === songList.data.length - 1) {
                isCheckFavoriteSong
                  ? (isCheckFavoriteSong = false)
                  : updateFavoriteSongs({ ...songInfo });
              }
            });
      });
    }
    if (playlistInfo) {
      getFavoritePlaylists().then((playlists) => {
        playlists.data.length === 0
          ? updateFavoritePlaylists({
              title: playlistInfo.title,
              encodeId: playlistInfo.encodeId,
              thumbnail: playlistInfo.thumbnail,
              thumbnailM: playlistInfo.thumbnailM,
              creator: playlistInfo.userName,
            })
          : playlists.data.forEach((playlist, index) => {
              if (playlist.encodeId === playlistInfo.encodeId) {
                removeFavoritePlaylist(playlist.id);
                isCheckFavoritePlaylist = true;
              } else if (index === playlists.data.length - 1) {
                isCheckFavoritePlaylist
                  ? (isCheckFavoritePlaylist = false)
                  : updateFavoritePlaylists({
                      title: playlistInfo.title,
                      encodeId: playlistInfo.encodeId,
                      thumbnail: playlistInfo.thumbnail,
                      thumbnailM: playlistInfo.thumbnailM,
                      creator: playlistInfo.userName,
                    });
              }
            });
      });
    }
  };

  return (
    <div
      className={clsx(optionalClass, {
        "hide-on-mobile": hideOnMobile,
      })}
      onClick={handleChangePrimary}
    >
      <i
        className={clsx("btn--icon", "icon--heart", "bi", heartIcon, {
          primary: primary,
        })}
      ></i>
    </div>
  );
}

export default HeartButton;
