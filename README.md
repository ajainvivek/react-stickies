# React-Stickies

Sticky Notes for React Application (DraftJS Based)

![Stickies](http://i.giphy.com/j4U83Mnt5BW7u.gif)
> Screencast of stickies

## Installation

Install the React-Stickies [package](https://www.npmjs.org/package/react-stickies) package using [npm](https://www.npmjs.com/):

```bash
npm install react-stickies --save
```

## Features

* Pure React Sticky Notes
* Draggable Stickies
* Inline Content Editable
* Configurable Sticky Colors
* Last Updated TimeStamp
* Configurable Tape

## Usage

```javascript
import React, { Component } from 'react';
import ReactStickies from 'react-stickies'; //ES6

class MyFirstStickyNotes extends Component {
  render() {
    constructor(props) {
      super(props);
      this.state = {
        notes: []
      }
    }  
    return (
      <ReactStickies
        notes={this.state.notes}
      />
    )
  }
});
```

### React Stickies Props

```javascript
// Tape with sticky note
tape: ?Boolean = {true|false},

// Display title on header
title: ?Boolean = {true|false},

// Display footer alongside updated timestamp
footer: ?Boolean = {true|false},

// Configurable custom sticky notes colors
colors: ?Array = [HexCodes],

//
// Callbacks
//

// Callback so you can save the notes.
// Calls back when note is updated
onChange: (Array | notes )

```


## Contribute

If you have a feature request, please add it as an issue or make a pull request.

## TODO List

- [x] Basic Notes with CRUD
- [x] Draggable Notes
- [x] Update Notes state
- [ ] Resizable handles on corners
