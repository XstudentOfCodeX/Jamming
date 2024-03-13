const clientId = '0cddbe26103848499a78cd2f7dfa1427'; // Insert client ID here.
const redirectUri = 'http://localhost:3000/'; // accepted Spotify redirect URIs on the Spotify API.
let accessToken = '';
let userID;

// Retrieves the access token from the URL if present, otherwise redirects to Spotify authorization.

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];

      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
       
    }
  },

// Uses fetch to get current user's ID using the access token

  async getCurrentUserId() {
    if (userID) return userID;

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    const url = "https://api.spotify.com/v1/me";

    try {
      const response = await fetch(url, { headers: headers });
      if (response.ok) {
        const jsonResponse = await response.json();
        userID = jsonResponse.id;
        return userID;
      }
    } catch (error) {
      console.log(error);
    }
  },

//searchs for tracks based on the search parameter.

  async search(term) {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    const url = `https://api.spotify.com/v1/search?type=track&q=${term}`;

    try {
      const response = await fetch(url, { headers: headers });
      if (response.ok) {
        const jsonResponse = await response.json();

        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  },



//Saves a playlist by creating a new one or updating a already created one.

  async savePlaylist(name, URIs, id) {
    if (!name || !URIs.length) return;

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    const currentUser = await Spotify.getCurrentUserId();

    if (id) {
      try {
        const url = `https://api.spotify.com/v1/playlists/${id}`;
        const response = await fetch(url, {
          headers: headers,
          method: "PUT",
          body: JSON.stringify({ name: name }),
        });
        if (response.ok) {
          try {
            const url = `https://api.spotify.com/v1/playlists/${id}/tracks`;
            const response = await fetch(url, {
              headers: headers,
              method: "PUT",
              body: JSON.stringify({ uris: URIs }),
            });
            if (response.ok) {
              const jsonResponse = await response.json();
              console.log(jsonResponse);
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const url = `https://api.spotify.com/v1/users/${currentUser}/playlists`;
      try {
        const response = await fetch(url, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: name }),
        });
        if (response.ok) {
          const jsonResponse = await response.json();
          const playlistID = jsonResponse.id;
          const url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;

          try {
            const response = await fetch(url, {
              headers: headers,
              method: "POST",
              body: JSON.stringify({ uris: URIs }),
            });
            if (response.ok) {
              const jsonResponse = await response.json();
              console.log(jsonResponse);
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  },

// Retrieves the playlists belonging to the current user.
  async getUserPlaylists() {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    const currentUser = await Spotify.getCurrentUserId();
    const url = `https://api.spotify.com/v1/users/${currentUser}/playlists?limit=50`;

    try {
      const response = await fetch(url, { headers: headers });
      if (response.ok) {
        const jsonResponse = await response.json();

        if (!jsonResponse.items) return [];

        const ownedPlaylists = jsonResponse.items.filter(
          (item) => item.owner.id === currentUser
        );
        return ownedPlaylists.map((playlist) => ({
          id: playlist.id,
          name: playlist.name,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  },

// Gets a specific playlist by ist ID
  async getPlaylist(id) {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    const url = `https://api.spotify.com/v1/playlists/${id}`;

    try {
      const response = await fetch(url, { headers: headers });
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse;
      }
    } catch (error) {
      console.log(error);
    }
  },
}; 





export default Spotify;
