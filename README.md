# React-Stickies

Sticky Notes for React Application (DraftJS Based)

![Stickies](http://i.giphy.com/j4U83Mnt5BW7u.gif)
> Screencast of stickies

## Installation

Install the React-Stickies [package](https://www.npmjs.org/package/react-stickies) package using [npm](https://www.npmjs.com/):

```bash
npm install react-stickies --save
```

Make sure you have included draftjs styles in your app.

```html
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/draft-js/0.7.0/Draft.min.css">
```

## Features

* Pure React Sticky Notes
* Draggable Stickies
* Inline Content Editable
* Configurable Sticky Colors
* Last Updated TimeStamp
* Configurable Tape
* Configurable Drag & Drop Zone

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
      this.onChange = this.onChange.bind(this)
      this.onSave = this.onSave.bind(this)
    }  
    onSave () {
      // Make sure to delete the editorState before saving to backend
      const notes = this.state.notes;
      notes.map(note => {
        delete note.editorState;
      })
      // Make service call to save notes
      // Code goes here...
    }
    onChange (notes) {
      this.setState({ // Update the notes state
        notes
      })
    }
    return (
      <ReactStickies
        notes={this.state.notes}
        onChange={this.onChange}
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

// Drag Bound Region to parent default is drag & drop anywhere
// Edit wrapperStyle accordingly to fit to parent bound region
bounds: ?String = "parent"

//
// Callbacks
//

// Callback so you can save the notes.
// Calls back when note is updated
onChange: (Array | notes )
onTitleChange: (String | text, Object | note)
onAdd: (Object | note)
onDelete: (Object | note)

//
// Styles
//

// Styles which could be modified
wrapperStyle: (Object | {} )
noteStyle: (Object | {} )
noteStyle: (Object | {} )
noteHeaderStyle: (Object | {} )
noteBodyStyle: (Object | {} )
noteFooterStyle: (Object | {} )

```


## Contribute

If you have a feature request, please add it as an issue or make a pull request.

## TODO List

- [x] Basic Notes with CRUD
- [x] Draggable Notes
- [x] Update Notes state
- [ ] Notes position handling
- [ ] Resizable handles on corners
