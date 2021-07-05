export class Stat {
    name;
    index;
    fullName;
    url;
    _raw = 0;
    _bonus = 0;
    total = 0;
    modifier = 0;

    get raw() {
        return this._raw;
    }
    set raw(value) {
        this._raw = value;
        this.updateStat();
    }
    get bonus() {
        return this._bonus;
    }
    set bonus(value) {
        this._bonus = value;
        this.updateStat();
    }

    updateStat() {
        this.total = this._raw + this._bonus;
        this.modifier = Math.floor((this.total - 10) / 2);
    }
    constructor(fullName) {
        this.fullName = fullName;
        this.name = fullName.substring(0,3).toUpperCase();
        this.index = fullName.substring(0,3).toLowerCase();
        this.url = '/api/ability-scores/' + this.index;
    }
}
