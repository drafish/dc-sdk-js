module.exports = Object.assign(require('./config.default'), require(`./config.${process.env.NODE_ENV}`))
