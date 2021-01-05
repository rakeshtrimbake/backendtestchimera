const randomstring = require('randomstring');

const generateStorageId = async() => {
    return `stor-${randomstring.generate({
        capitalization : 'lowercase',
        charset        : 'alphabetic',
        length         : 10,
        readable       : true,
    })}`;
}

module.exports = {
    generateStorageId
}