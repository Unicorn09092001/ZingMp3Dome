import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Container.scss";
import ChartPage from "./pages/ChartPage/ChartPage";
import ExplorePage from "./pages/ExplorePage/ExplorePage";
import FollowPage from "./pages/FollowPage/FollowPage";
import PersonalPage from "./pages/PersonalPage/PersonalPage";
import TabAlbum from "./pages/PersonalPage/pages/TabAlbum";
import TabArtist from "./pages/PersonalPage/pages/TabArtist";
import TabHome from "./pages/PersonalPage/pages/TabHome";
import TabMv from "./pages/PersonalPage/pages/TabMv";
import TabPlaylist from "./pages/PersonalPage/pages/TabPlaylist";
import TabSong from "./pages/PersonalPage/pages/TabSong";
import TabUpload from "./pages/PersonalPage/pages/TabUpload";
import RadioPage from "./pages/RadioPage/RadioPage";
import NewReleasePage from "./pages/NewReleasePage/NewReleasePage";
import Top100Page from "./pages/top100Page/Top100Page";
import PlaylistPage from "./pages/playlistPage/PlaylistPage";

function Container() {
  const playlistId = useSelector((state) => state.playlistCurrent.encodeId);

  return (
    <Routes>
      <Route path="personal/" element={<PersonalPage />}>
        <Route path="" element={<TabHome />} />
        <Route path="songs" element={<TabSong />} />
        <Route path="playlists" element={<TabPlaylist />} />
        <Route path="albums" element={<TabAlbum />} />
        <Route path="mvs" element={<TabMv />} />
        <Route path="artists" element={<TabArtist />} />
        <Route path="upload" element={<TabUpload />} />
      </Route>
      <Route path="/" element={<ExplorePage />} />
      <Route path="zingChart" element={<ChartPage />} />
      <Route path="radio" element={<RadioPage />} />
      <Route path="follow" element={<FollowPage />} />
      <Route path="moi-phat-hanh" element={<NewReleasePage />} />
      <Route path="hub" />
      <Route path="top100" element={<Top100Page />} />
      <Route path="the-loai-video" />
      <Route path={"playlist/id=" + playlistId} element={<PlaylistPage />} />
    </Routes>
  );
}

export default Container;
