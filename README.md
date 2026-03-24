Warning
Contains adult words — this game includes some coarse and adult language in its word pool. Not suitable for young children or sensitive audiences. Use discretion when playing with family groups that include minors.

Overview
Magnetic Mayhem is a local multiplayer, touch-first word-magnet party game built for large tablet displays such as cozyla. Players drag tactile-looking magnetic word tiles into a shared play area, park a player marker, arrange words into sentences or phrases, and then rate the results. The UI intentionally mimics real fridge magnets with random rotation and scale for a playful, tactile feel.

Installation
Files required  
Place index.html, manifest.json, and service-worker.js together on a static host or local server.

How to run  
Open index.html in a modern browser on your tablet. For full service worker support use HTTPS or a local server. No backend is required. Profiles and scores are stored in the browser localStorage.

Controls
Touch first  
Tap and drag magnets from the word pool into the play area. Drag player markers to position them. Touch is the primary input and is fully supported.

Pointer and mouse  
Left-click and drag magnets or markers. Right-click is ignored.

Round flow  
Use the Start Game tile to begin a timed round. When time ends the board freezes and the ratings modal appears.

Profiles  
Open Settings to save or load player profiles and upload avatar images.

Gameplay
Setup  
Use the setup wizard to choose number of players, rounds, round length, and theme. Save player names and avatars as profiles.

Play loop

Start a round and arrange magnets near your marker.

When time expires the game clusters nearby magnets into sentence groups.

Clusters are assigned to players by proximity to markers or round-robin if no markers exist.

The ratings modal shows each player’s sentences; assign a score from 1 to 5.

Scores persist between rounds and are saved in localStorage.

Scoring  
Ratings add 1–5 points per player per round. Final scores are shown at the end of the game.

Customization and Troubleshooting
Themes and appearance  
Choose from built-in themes: Dark, Pastel, Rainbow, Christmas, Light. Magnets receive a random rotate and scale on creation to preserve the slanted, tactile look.

Word pool  
Edit the arrays near the top of the script to change seed words and phrases. Adjust VISIBLE_MAGNETS to show more or fewer tiles.

Ratings modal visuals  
The ratings screen clones magnet visuals and preserves rotation and scale. If clones appear straight, check for console errors and ensure the script is running without interruption.

Markers missing  
If player markers are not visible, finish the setup wizard or regenerate the word pool to recreate markers.

Performance  
Large VISIBLE_MAGNETS values can slow older tablets. Reduce that constant for smoother play.

Reset state  
To clear saved profiles and scores, remove mm_profiles_jounty and mm_scores_jounty from browser localStorage or start a new game via the New Game flow.

Quick start tip  
For the best family experience on a large tablet such as cozyla: run the game full-screen, upload simple avatar images for each player, choose a short round time for fast rounds, and remember the game contains adult words so plan players accordingly.
