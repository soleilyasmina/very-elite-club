# Very Elite Club

## TL:DR of Contents

- [Abstract](#abstract)
- [Game Loop](#game-loop)
- [Create / Join Room](#create--join-room)
- [Starting a Game](#starting-a-game)

## Abstract
[veryelite.club](veryelite.club) is a MERN stack game server, hosting a series of multiplayer games, with live updates via WebSockets.

### Technologies Used:
- MongoDB
- Express
- React
- Node.js

## Game Loop

### Create / Join Room

When opening the site at its root, the user is prompted with a menu to Create/Join a room. Depending on which they click, the workflow goes as follows:

#### Sample Room Structure
```js
{
  "_id": "aecffc5725d97af67a85e97f",
  "host": "soleilyasmina",
  "code": "OXJF",
  "members": [
    { 
      "name": "soleilyasmina",
      "wins": 1
    },
    {
      "name": "isonlymalaise",
      "wins": 0
    }
  ]
}
```

#### Create Room

1. A user is prompted to pick a username, and choose a public/private room.
2. If private is chosen, a room code (4-digit A-Z) and a room password (6-digit A-Z) are generated. Otherwise, just a room code is generated.
3. Upon submitting said form, a new room is created.
4. The user is redirected to the game's start menu, with the code for that room (and password, potentially) displayed on the top right.

#### Join Room
1. A user is prompted to enter a room code, (potentially a password), and pick a username.
2. If the user enters a matching room code and password (if necessary), the user is added to that room.
3. The user is redirected to the room's main menu, with the code for that room  (and password, potentially) displayed on the top right.

### Starting a Game

When more than one player is in a room, a list of possible games are listed. A user can select a game, and then a menu for that game will appear, with its players divided into teams. The teams can then be chosen by the host, and the game can be started.

#### Sample Game Data Structure (Tic-Tac-Toe)

```js
{
  "_id": "f636c0c46e58511b3c106a77",
  "winner": null,
  "players": [
    "soleilyasmina",
    "isonlymalaise"
  ],
  "board": [
    "X",
    "X",
    "O",
    "",
    "",
    "X",
    "",
    "O",
    "O"
  ],
}
```

#### Midgame

Whenever a game update is attempted, it emits a game-update event to the WebSockets, with a code, and a game state. If the request is successful, it gets transmitted to all of the other machines, after evaluating its win status.

#### Endgame

When the game is won, a /:game_id/gameover DELETE request is sent to the server, updating the wins of the current players.

#### Postgame

The host is prompted with the following options:
1. Play Again
2. Return to Room

##### Play Again

If the player chooses this option, they are prompted to choose between __same players__ and __new players__. If they choose __same players__, the game restarts with the same players. Otherwise, the team choosing menu appears, and the game restarts with the new teams / players.

##### Return to Room

This process restarts from [Starting a Game](#starting-a-game).
