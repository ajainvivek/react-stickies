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
* Draggable & Resizable Stickies
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

// Grid configuration
grid: ?Object = {
  // These are all in grid units, not pixels
  w: number,
  h: number,
  minW: ?number = 0,
  maxW: ?number = Infinity,
  minH: ?number = 0,
  maxH: ?number = Infinity,

  // Rows have a static height, but you can change this based on breakpoints
  // if you like.
  rowHeight: ?number = 150,

  // {name: pxVal}, e.g. {lg: 1200, md: 996, sm: 768, xs: 480}
  // Breakpoint names are arbitrary but must match in the cols and layouts objects.
  breakpoints: ?Object = {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},

  // # of cols. This is a breakpoint -> cols map, e.g. {lg: 12, md: 10, ...}
  cols: ?Object = {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},

  // layouts is an object mapping breakpoints to layouts.
  // e.g. {lg: Layout, md: Layout, ...}
  layouts: {[key: $Keys<breakpoints>]: Layout}

  // Layout is an array of object with the format:
  // {x: number, y: number, w: number, h: number}
  // The index into the layout must match the key used on each item component.
  // If you choose to use custom keys, you can specify that key in the layout
  // array objects like so:
  // {i: string, x: number, y: number, w: number, h: number}
  layout: ?array = null, // If not provided, use data-grid props on children
  //
  // Flags
  //
  isDraggable: ?boolean = true,
  isResizable: ?boolean = true,
  // Uses CSS3 translate() instead of position top/left.
  // This makes about 6x faster paint performance
  useCSSTransforms: ?boolean = true,

  // Callback so you can save the layout.
  // Calls back with (currentLayout) after every drag or resize stop.
  onLayoutChange: (layout: Layout) => void,

}


//
// Callbacks
//

// Callback so you can save the notes.
// Calls back when note is updated
onChange: (Array | notes, String | state (add/update/delete) )
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
- [x] Notes position handling
- [x] Resizable handles on corners
- [ ] ---- 
