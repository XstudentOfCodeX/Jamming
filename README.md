#Create a spotify playlist.


This project allows users to create playlists using the Spotify API. Users can search for tracks, create new playlists, and add tracks to existing playlists on their Spotify account.

## Features

- **Search Tracks**: Search for tracks on Spotify by name.
- **Create Playlists**: Create new playlists on your Spotify account.
- **Add Tracks to Playlists**: Add tracks to new or existing playlists.

## Technologies Used

- **React**: For building the user interface.
- **CSS**: For styling the application.
- **JavaScript**: For logic and functionality.
- **Spotify API**: For interacting with Spotify to manage playlists and search for tracks.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/spotify-playlist-creator.git

2. Navigate to the project directory:
   - cd spotify-playlist-creator

3. Install dependencies:
   -npm install



## Usage

1. Start Dev server
  - npm start
  - Open your browser and go to http://localhost:3000



##Spotify API setup

1. To use the Spotify API, you need to register your application on the Spotify Developer Dashboard (https://developer.spotify.com/dashboard/applications) and obtain your client ID.

  -Replace the clientId variable in SpotifyApi.js with your Spotify application client ID:
  -const clientId = 'your_client_id_here'; // Replace with your client ID
  -Ensure that the redirectUri variable matches one of the Redirect URIs specified in your Spotify application       
   settings.



##Functionality

#Authentication
1. The application retrieves an access token from the URL after the user authenticates with Spotify.
  -const accessToken = Spotify.getAccessToken();
   
 #Searching for Tracks
 -Search for tracks by term:
 -const tracks = await Spotify.search('search term');

 
 #Creating a Playlist
  -Create a new playlist or update an existing one:
  -await Spotify.savePlaylist('My Playlist', ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh'], 'existing_playlist_id');

  
 #Retrieving User Playlists
  -Get the playlists of the current user:
  -const playlists = await Spotify.getUserPlaylists();


License
This project is licensed under the MIT License - see the LICENSE file for details.

Contributing
Contributions are welcome! Please fork the repository and submit a pull request.







