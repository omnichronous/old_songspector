# Songspector

A music dashboard that polls Last.fm for the user's currently playing track and displays a YouTube video and lyrics of the song, as well as related videos. The app is written in JavaScript for Node.js.

[See it in action here.](http://songspector-omnichronous.rhcloud.com/)

## Installation

To run the app locally, download to a dir and make sure you have Node.js and npm installed.

Install the dependancies:

    npm install

Start the server:
    
    node server.js

Visit [localhost](http://localhost) while playing a song.

## Usage

If you are testing with your own Last.fm username make sure you have real-time listening data enabled in [your settings](http://www.last.fm/settings/inboxoptions).

## Contributing

Feel free to message me with ideas or add more features yourself.

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## TODO

- [ ] * Comments
- [ ] ** Shouts from Last.fm track page
- [ ] ** Comments from YouTube video
- [ ] * Stats
- [ ] ** User's own playcount for the track
- [ ] ** Listening history

## Credits

* Node.js
* Express
* Last.fm API
* YouTube API
* @sjaak666 - author of the awesome [metalminer](https://github.com/sjaak666/metalminer) package


## License

[GNU General Public License v2.0](http://www.gnu.org/licenses/gpl-2.0.txt)