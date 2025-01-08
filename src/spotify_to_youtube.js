// ==UserScript==
// @name         Spotify Playlist to YouTube
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Adds a button to Spotify playlists which lists their first YouTube results
// @author       Osiris-Team
// @match        https://open.spotify.com/playlist/*
// @grant        GM_xmlhttpRequest
// @connect      youtube.com
// @connect      www.youtube.com
// ==/UserScript==

(function() {
    'use strict';

    console.log("[Spotify to YouTube] Script started");

    // Create and add the button
    function addButton() {
        console.log("[Spotify to YouTube] Adding button to the page");
        const button = document.createElement('button');
        button.innerHTML = 'Find YouTube Links';
        button.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            padding: 10px 20px;
            background-color: #1db954;
            color: white;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        `;

        button.addEventListener('mouseenter', () => {
            button.style.backgroundColor = '#1ed760';
        });

        button.addEventListener('mouseleave', () => {
            button.style.backgroundColor = '#1db954';
        });

        button.addEventListener('click', getSongsAndShowOverlay);
        document.body.appendChild(button);
        console.log("[Spotify to YouTube] Button added successfully");
    }

    // Extract song information from the page
    function extractSongInfo() {
        console.log("[Spotify to YouTube] Extracting song information from the page");
        const songs = [];
        const songElements = document.querySelector('[data-testid="playlist-tracklist"]').querySelectorAll('[data-testid="tracklist-row"]');

        if (!songElements.length) {
            console.warn("[Spotify to YouTube] No song elements found on the page");
        }

        songElements.forEach((element, index) => {
            console.log(`[Spotify to YouTube] Processing song element ${index + 1}`);
            const titleElement = element.querySelector('[data-testid="internal-track-link"]');
            const artistElement = Array.from(element.querySelectorAll('a')).find(el => el.href.includes("artist"));

            if (titleElement && artistElement) {
                const title = titleElement.textContent.trim();
                const artist = artistElement.textContent.trim();
                console.log(`[Spotify to YouTube] Found song: Title="${title}", Artist="${artist}"`);
                songs.push({
                    title: title,
                    artist: artist
                });
            } else {
                console.warn(`[Spotify to YouTube] Missing title or artist for song element ${index + 1}`);
            }
        });

        console.log(`[Spotify to YouTube] Extracted ${songs.length} songs`);
        return songs;
    }

    // Get the first YouTube result URL
    async function getFirstYoutubeResult(searchQuery) {
        console.log(`[Spotify to YouTube] Searching YouTube for query: "${searchQuery}"`);
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`,
                onload: function(response) {
                    console.log(`[Spotify to YouTube] Received response from YouTube for query: "${searchQuery}"`);
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(response.responseText, 'text/html');

                    // Extract video ID from the response
                    const videoData = response.responseText.match(/"videoId":"([^"]+)"/);
                    if (videoData && videoData[1]) {
                        const videoUrl = `https://www.youtube.com/watch?v=${videoData[1]}`;
                        console.log(`[Spotify to YouTube] Found video: ${videoUrl}`);
                        resolve(videoUrl);
                    } else {
                        console.error(`[Spotify to YouTube] No video found for query: "${searchQuery}"`);
                        reject('No video found');
                    }
                },
                onerror: function(error) {
                    console.error(`[Spotify to YouTube] Error during YouTube search for query: "${searchQuery}"`, error);
                    reject(error);
                }
            });
        });
    }

    // Create an overlay with clickable YouTube links
    function createOverlay(links) {
        console.log("[Spotify to YouTube] Creating overlay with YouTube links");
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        `;

        const closeButton = document.createElement('button');
        closeButton.innerHTML = 'Close';
        closeButton.style.cssText = `
            margin-bottom: 20px;
            padding: 10px 20px;
            background-color: #ff4d4d;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
        `;
        closeButton.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        overlay.appendChild(closeButton);

        links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.target = '_blank';
            linkElement.style.cssText = `
                color: #1db954;
                text-decoration: none;
                font-size: 16px;
                margin-bottom: 10px;
            `;
            linkElement.textContent = `${link.title} by ${link.artist}`;
            overlay.appendChild(linkElement);
        });

        document.body.appendChild(overlay);
        console.log("[Spotify to YouTube] Overlay added to the page");
    }

    // Process songs and show overlay with links
    async function getSongsAndShowOverlay() {
        console.log("[Spotify to YouTube] Button clicked. Starting to fetch YouTube links.");
        const songs = extractSongInfo();

        if (songs.length === 0) {
            console.warn("[Spotify to YouTube] No songs found to process.");
            alert('No songs found. Please make sure the playlist is loaded.');
            return;
        }

        const button = document.querySelector('button');
        button.disabled = true;
        button.innerHTML = 'Fetching links...';
        console.log("[Spotify to YouTube] Button disabled and label updated");

        const links = [];
        for (let i = 0; i < songs.length; i++) {
            const song = songs[i];
            const searchQuery = `${song.title} ${song.artist} official music video`;
            console.log(`[Spotify to YouTube] Processing song ${i + 1}/${songs.length}: "${searchQuery}"`);

            try {
                const youtubeUrl = await getFirstYoutubeResult(searchQuery);
                links.push({ title: song.title, artist: song.artist, url: youtubeUrl });
            } catch (error) {
                console.error(`[Spotify to YouTube] Error fetching YouTube link for "${song.title}"`, error);
            }
        }

        createOverlay(links);

        button.disabled = false;
        button.innerHTML = 'Find YouTube Links';
        console.log("[Spotify to YouTube] All links processed. Button re-enabled.");
    }

    // Wait for the page to load before adding the button
    function init() {
        console.log("[Spotify to YouTube] Initializing script");
        const checkForPlaylist = setInterval(() => {
            console.log("[Spotify to YouTube] Checking for playlist content");
            if (document.querySelector('[data-testid="tracklist-row"]')) {
                console.log("[Spotify to YouTube] Playlist content detected");
                clearInterval(checkForPlaylist);
                addButton();
            }
        }, 1000);

        setTimeout(() => {
            console.log("[Spotify to YouTube] Stopping playlist check due to timeout");
            clearInterval(checkForPlaylist);
        }, 30000);
    }

    init();
})();
