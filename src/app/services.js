import axios from "axios";

const API_CHART_PAGE = "https://music-player-pink.vercel.app/api/chart-home";

const API_NEW_RELEASE_PAGE =
  "https://music-player-pink.vercel.app/api/playlist?id=ZWZB969E";

const API_PATH_SONG = "https://music-player-pink.vercel.app/api/song?id=";

const API_SONG_INFO = "https://music-player-pink.vercel.app/api/info?id=";

const API_EXPLORE_PAGE = "https://music-player-pink.vercel.app/api/home?page=";

const API_TOP100_PAGE = "https://music-player-pink.vercel.app/api/top100";

const API_PLAYLIST_INFO =
  "https://music-player-pink.vercel.app/api/playlist?id=";

const API_FAVORITE_SONGS =
  "https://6220cd52afd560ea699df17d.mockapi.io/favoriteSongList/";

const API_FAVORITE_PLAYLIST =
  "https://6220cd52afd560ea699df17d.mockapi.io/favoritePlaylist/";

const API_FAVORITE_ARTISTS =
  "https://6220cd52afd560ea699df17d.mockapi.io/airtists/";

export const getApiChartPage = () => {
  return axios.get(API_CHART_PAGE);
};

export const getApiNewReleasePage = () => {
  return axios.get(API_NEW_RELEASE_PAGE);
};

export const getSongById = (encodeId) => {
  var url = API_PATH_SONG + encodeId;
  return axios.get(url);
};

export const getPlaylistById = (encodeId) => {
  var url = API_PLAYLIST_INFO + encodeId;
  return axios.get(url);
};

export const getSongInfoById = (encodeId) => {
  var url = API_SONG_INFO + encodeId;
  return axios.get(url);
};

export const getApiExplorePage = (id) => {
  var url = API_EXPLORE_PAGE + id;
  return axios.get(url);
};

export const getApiTop100Page = () => {
  return axios.get(API_TOP100_PAGE);
};

export const getFavoriteSongs = () => {
  return axios.get(API_FAVORITE_SONGS);
};

export const updateFavoriteSongs = (obj) => {
  return axios.post(API_FAVORITE_SONGS, obj);
};

export const removeFavoriteSong = (id) => {
  var url = API_FAVORITE_SONGS + id;
  return axios.delete(url);
};

export const getFavoritePlaylists = () => {
  return axios.get(API_FAVORITE_PLAYLIST);
};

export const updateFavoritePlaylists = (obj) => {
  return axios.post(API_FAVORITE_PLAYLIST, obj);
};

export const removeFavoritePlaylist = (id) => {
  var url = API_FAVORITE_PLAYLIST + id;
  return axios.delete(url);
};

export const getFavoriteArtists = () => {
  return axios.get(API_FAVORITE_ARTISTS);
};

export const updateFavoriteArtists = (obj) => {
  return axios.post(API_FAVORITE_ARTISTS, obj);
};

export const removeFavoriteArtist = (id) => {
  var url = API_FAVORITE_ARTISTS + id;
  return axios.delete(url);
};
