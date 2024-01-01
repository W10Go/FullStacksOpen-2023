const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')


// Blog List
// Step1    Turn the application into a function npm project✔
// Step2    Refactor the application into separate modules with a structure✔


app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})