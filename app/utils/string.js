const s = {
    capFirstLetter: (s) => {
        return s.split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
    }
}

module.exports = s;
