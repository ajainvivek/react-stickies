import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';
import Draggable from 'react-draggable';
import moment from 'moment';
import ContentEditable from './ContentEditable';
import './styles.css';

/**
* @method: guid
* @desc: Generates unique guid
**/
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      colors: props.colors || ['#FBE4BE', '#F7D1D1', '#E4FABC', '#CAE0FA'],
      dateFormat: props.dateFormat || 'lll'
    };
    this.onChange = this.onChange.bind(this);
    this.createBlankNote = this.createBlankNote.bind(this);
    this.handleDragStop = this.handleDragStop.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.notes && !this.props.notes.length) {
      this.createBlankNote();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.notes && this.props.notes.length) {
      this.setState({
        notes: nextProps.notes
      });
    }
  }

  generateRandomColors() {
    const colors = this.state.colors;
    return colors[Math.floor(Math.random() * (colors.length - 1))];
  }

  generateRandomDegree(max, min) {
    return `${Math.floor(Math.random() * (max - min + 1)) + min}deg`;
  }

  handleDragStart(event, data, currentNote) {
    const notes = this.state.notes;
    notes.forEach((note) => {
      if (currentNote.id === note.id) {
        note.contentEditable = false;
      }
    });
    this.setState({
      notes
    });
  }

  handleDragStop(event, data, currentNote) {
    const notes = this.state.notes;
    notes.forEach((note) => {
      if (currentNote.id === note.id) {
        note.position = {
          x: data.x,
          y: data.y
        };
        note.contentEditable = true;
      }
    });
    this.setState({
      notes
    });
  }

  handleTitleChange(html, currentNote) {
    const notes = this.state.notes;
    notes.forEach((note) => {
      if (currentNote.id === note.id) {
        note.title = html.target.value;
      }
    });
    this.setState({
      notes
    });
  }

  onChange(editorState, currentNote) {
    const notes = this.state.notes;
    const dateFormat = this.state.dateFormat;
    notes.forEach((note) => {
      if (currentNote.id === note.id) {
        note.editorState = editorState;
        note.timeStamp = moment().format(dateFormat);
      }
    });
    this.setState({
      notes
    }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.state.notes);
      }
    });
  }

  createBlankNote() {
    const dateFormat = this.state.dateFormat;
    const blankNote = {
      id: guid(),
      editorState: EditorState.createEmpty(),
      title: 'Title',
      color: this.generateRandomColors(),
      degree: this.generateRandomDegree(-2, 2),
      timeStamp: moment().format(dateFormat),
      contentEditable: true
    };
    const notes = this.state.notes;
    notes.push(blankNote);
    this.setState({
      notes
    }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.state.notes);
      }
    });
  }

  deleteNote(currentNote) {
    const notes = this.state.notes;
    notes.forEach((note, index) => {
      if (currentNote.id === note.id) {
        notes.splice(index, 1);
      }
    });
    this.setState({
      notes
    }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.state.notes);
      }
    });
  }

  render() {
    const closeStyle = Object.assign({}, {
      display: (this.state.notes.length === 1) ? 'none' : 'block'
    }, this.props.closeStyle || {});
    const addStyle = this.props.addStyle || {};
    const closeIcon = this.props.closeIcon || '';
    const addIcon = this.props.addIcon || '';
    const noteStyle = note => (
      Object.assign({}, {
        background: note.color,
        transform: note.degree
      }, this.props.noteStyle || {})
    );
    const noteHeaderStyle = Object.assign({}, {
      display: this.props.header === false ? 'none' : 'block'
    }, this.props.noteHeaderStyle || {});
    const noteBodyStyle = this.props.noteBodyStyle || {};
    const noteTitleStyle = Object.assign({}, {
      display: this.props.title === false ? 'none' : 'block'
    }, this.props.noteTitleStyle || {});
    const noteFooterStyle = Object.assign({}, {
      display: this.props.footer === false ? 'none' : 'block'
    }, this.props.noteFooterStyle || {});

    return (
      <div className="react-stickies-wrapper clearfix">
        {this.state.notes.map((note, index) => (
          <Draggable
            defaultPosition={note.defaultPosition}
            position={note.position}
            onStart={(event, data) => {
              this.handleDragStart(event, data, note);
              if (typeof this.props.handleDragStart === 'function') {
                this.props.handleDragStart(event, data, note);
              }
            }}
            onDrag={(event, data) => {
              if (typeof this.props.handleDragging === 'function') {
                this.props.handleDragging(event, data, note);
              }
            }}
            onStop={(event, data) => {
              this.handleDragStop(event, data, note);
              if (typeof this.props.handleDragStop === 'function') {
                this.props.handleDragStop(event, data, note);
              }
            }}
            key={index}
          >
            <aside
              className={`note-wrap note ${this.props.tape ? 'tape' : ''}`}
              style={noteStyle(note)}
            >
              <div className="note-header" style={noteHeaderStyle}>
                <div
                  className={`${addIcon ? '' : 'add'}`}
                  onClick={this.createBlankNote}
                  style={addStyle}
                >
                  {addIcon}
                </div>
                <div className="title" style={noteTitleStyle}>
                  <ContentEditable
                    html={note.title}
                    onChange={html => this.handleTitleChange(html, note)}
                  />
                </div>
                <div
                  className={`${closeIcon ? '' : 'close'}`}
                  style={closeStyle}
                  onClick={() => this.deleteNote(note)}
                >
                  {closeIcon}
                </div>
              </div>
              <div className="note-body" style={noteBodyStyle}>
                <Editor
                  editorState={note.editorState}
                  onChange={editorState => this.onChange(editorState, note)}
                  placeholder="Add your notes..."
                />
              </div>
              <div
                className="note-footer"
                style={noteFooterStyle}
              >
                {note.timeStamp}
              </div>
            </aside>
          </Draggable>
        ))}
      </div>
    );
  }

}
