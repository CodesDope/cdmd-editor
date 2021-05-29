const MAX_LOG_SIZE = 100;

class Logger {
    record = [];

    recycle = [];

    initValue = '';

    push(val) {
        const result = this.record.push(val);
        while (this.record.length > MAX_LOG_SIZE) {
            this.record.shift();
        }
        return result;
    }

    get() {
        return this.record;
    }

    getLast() {
        const length = this.record.length;
        return this.record[length - 1];
    }

    undo(skipText) {
        const current = this.record.pop();
        if (typeof current === 'undefined') {
            return this.initValue;
        }
        if (current !== skipText) {
            this.recycle.push(current);
            return current;
        }
        const last = this.record.pop();
        if (typeof last === 'undefined') {
            this.recycle.push(current);
            return this.initValue;
        }
        this.recycle.push(current);
        return last;
    }

    redo() {
        const history = this.recycle.pop();
        if (typeof history !== 'undefined') {
            this.push(history);
            return history;
        }
        return undefined;
    }

    cleanRedo() {
        this.recycle = [];
    }

    getUndoCount() {
        return this.undo.length;
    }

    getRedoCount() {
        return this.recycle.length;
    }
}

export default Logger;
