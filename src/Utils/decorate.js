import { repeat } from './tools';

let SIMPLE_DECORATOR = {
    bold: ['**', '**'],
    italic: ['*', '*'],
    strikethrough: ['~~', '~~'],
    quote: ['\n> ', '\n'],
    inlinecode: ['`', '`'],
    code: ['\n```\n', '\n```\n']
};

for (let i = 1; i <= 6; i++) {
    SIMPLE_DECORATOR[`h${i}`] = [`\n${repeat('#', i)} `, '\n'];
}

const decorateTableText = option => {
    const { row = 2, col = 2 } = option;
    const rowHeader = ['|'];
    const rowData = ['|'];
    const rowDivision = ['|'];
    let colStr = '';
    for (let i = 1; i <= col; i++) {
        rowHeader.push(' Head |');
        rowDivision.push(' --- |');
        rowData.push(' Data |');
    }
    for (let j = 1; j <= row; j++) {
        colStr += '\n' + rowData.join('');
    }
    return `\n${rowHeader.join('')}\n${rowDivision.join('')}${colStr}\n`;
};

const decorateList = (type, target) => {
    let text = target;
    if (text.indexOf('\n') !== 0) {
        text = '\n' + text;
    }
    if (type === 'unordered') {
        return text.replace(/\n/g, '\n* ') + '\n';
    } else {
        let count = 1;
        return (
            text.replace(/\n/g, () => {
                return `\n${count++}. `;
            }) + '\n'
        );
    }
};

const getDecorated = (target, type, option) => {
    if (typeof SIMPLE_DECORATOR[type] !== 'undefined') {
        return {
            text: `${SIMPLE_DECORATOR[type][0]}${target}${SIMPLE_DECORATOR[type][1]}`,
            selection: {
                start: SIMPLE_DECORATOR[type][0].length,
                end: SIMPLE_DECORATOR[type][0].length + target.length
            }
        };
    }
    switch (type) {
        case 'unordered':
            return {
                text: decorateList('unordered', target)
            };
        case 'order':
            return {
                text: decorateList('order', target)
            };
        case 'hr':
            return {
                text: '\n---\n'
            };
        case 'table':
            return {
                text: decorateTableText(option)
            };
        case 'image':
            return {
                text: `![${target}](${option.imageUrl || 'https://'})`,
                selection: {
                    start: 2,
                    end: target.length + 2
                }
            };
        case 'link':
            return {
                text: `[${target}](${option.linkUrl || 'https://'})`,
                selection: {
                    start: 1,
                    end: target.length + 1
                }
            };
    }
    return {
        text: target,
        selection: {
            start: 0,
            end: target.length
        }
    };
};

export default getDecorated;
