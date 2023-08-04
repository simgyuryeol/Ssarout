import EventEmitter from './EventEmitter';


const autobind = require('autobind-decorator');
// const { EventEmitter } = require('./EventEmitter');
const { FileModel, Model } = require('./Model');
const { SongList } = require('./SongList');


class Sharer extends EventEmitter {
    
    constructor() {
        super();

        this._searchInput = document.createElement('input');
        this._searchInput.type = 'search';
        this._searchInput.placeholder = '검색어를 입력하세요';

        this._wrapper = document.createElement('div');
        this._wrapper.classList.add('sharer');

        this._list = new SongList();
        this.model = new FileModel();

        this._wrapper.appendChild(this._list.render());

        this._list.on('click', this._listClick);

        this._list.list = this.model.getLatest();
        this._listClick = this._listClick.bind(this);
    }

    render() {
        return this._wrapper;
    }

    _listClick = (target) => {
        this.emit('song-select', target);
    }
}

module.exports = { Sharer };

