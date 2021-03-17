const tools = require('./utils.js')
const yargs = require('yargs')

yargs.command( {
    command: 'report',
    describe: 'Report a weather',
    builder: {
        city: {
            describe: 'City to report the current weather',
            demandOption: true,
            demand:true,
            type: 'string'
        }
    },
    handler:  (argv) => {
        tools.geocode(argv.city,(error,{location,latitude,longitude} = {}) => {
            console.log("Error",error)
            tools.reportweather(latitude,longitude, (error,response) => {
                if(error)
                    console.log(error)
                else
                    console.log(location + '\n' +
                        response.current.weather_descriptions[0] + ". It is currently " + response.current.temperature 
                        + "F degree. It feels like " + response.current.feelslike + "F degree.") 
            })
        })
    }
})
.strictCommands(true)
.strictOptions(true)
yargs.parse()