const positionToHello = {};

function register(hello) {
    positionToHello[hello.position] = hello;
}

function get(position) {
    return positionToHello[position];
}

module.exports = { register, get };
