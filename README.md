## Project Setup

Initialise the project with npm.
Initialise git repo

## Project Structure

Organise files into the following structure:
index.html (for the HTML layout).
style.scss (for SCSS styles).
main.ts (the main TypeScript entry point).
game.ts (handles game logic).
board.ts (handles the board layout and display).
player.ts (handles player details).

## HTML Structure (index.html)

Create the main container for the game.
Add the grid for the Connect 4 board.
Include buttons like "Reset Game."
Link the compiled JavaScript (main.js) and CSS (style.css).

## SCSS Styling (style.scss)

Style the game board:
Create a grid layout for the board (7 columns x 6 rows).
Style each cell to represent empty slots and player tokens.
Style player tokens (e.g., red for player 1, yellow for player 2).
Style buttons (like the reset button).
Style the main layout (centered on the page, responsive if needed).

## Game Logic Implementation - Complete

Player Turns: Implement the turn-taking logic first. This is foundational to the gameplay.
Token Placement: Develop the logic for placing tokens into the correct column. This will interact with the turn logic.
Win Condition: Create the logic to detect when a player has won the game. This is crucial to the game's core functionality.
Draw Condition: Implement logic to detect if the game ends in a draw.

## Interactivity - Complete

Event Listeners: Set up event listeners for clicks on the columns to handle token placement. This ties the game logic to the user interface.
Highlighting Columns: Add a hover effect to show where the token will drop. This improves the user experience.

## UI/UX Enhancements - Complete

Responsive Design: Ensure the game looks good and functions well on various device sizes.
Sound Effects: Add sound effects for actions like token drops and winning. This step can be added here since it enhances the user experience. - Will add

## Game Reset and Replay - Complete

Reset Button: Add a button to reset the game board. This allows for easy replayability.
Replay and Score Tracking: Implement a simple score tracker if desired, allowing for consecutive games without page refresh.

## AI Player (Optional)

Single-Player Mode: If you want to add a single-player mode, this is where you can implement a basic AI.

## Testing and Refinement

Bug Testing: Thoroughly test the game to ensure all features work as intended and fix any bugs.
User Feedback: Gather feedback from others and refine the game based on their input.

## Deployment

Hosting: Deploy your game to a hosting service for public access.
Share and Iterate: Share your game and continue to iterate based on feedback.
