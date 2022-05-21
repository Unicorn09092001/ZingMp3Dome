import Album from "features/Album/Album";
import Artist from "features/Artist/Artist";
import Mv from "features/Mv/Mv";
import Playlist from "features/Playlist/Playlist";
import PlayMusic from "features/PlayMusic/PlayMusic";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteArtists } from "app/services";
import { setPersonalArtist } from "features/Artist/personalArtistSlice";

function TabHome() {
  const dispatch = useDispatch();
  const playlistList = useSelector((state) => state.personalPlaylist.list);
  const artistList = useSelector((state) => state.personalArtist.list);

  useEffect(() => {
    getFavoriteArtists().then((res) => {
      dispatch(setPersonalArtist(res.data));
    });
  }, []);

  return (
    <div className="grid container__tab tab-home">
      <PlayMusic />

      <Playlist
        playlistList={playlistList}
        hasCreateItem
        noWrap
        sectionName="Playlist"
        navigable
      />

      <Album optionalClass={"mt-50"} noWrap sectionName="Album" navigable />

      <Mv optionalClass={"mt-50"} noWrap sectionName="MV" navigable />

      <Artist
        optionalClass={"mt-30"}
        noWrap
        sectionName="Artist"
        navigable
        artistList={artistList}
      />
    </div>
  );
}

export default TabHome;
