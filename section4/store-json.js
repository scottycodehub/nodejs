const yargs = require('yargs')
const tools = require('./utils.js')

yargs.version('1.2.0')
console.log(process.argv)


//
yargs.command({
    command: 'add',
    describe: 'Add a new note command',
    builder: {
        title: {
            describe: 'title to add',
            demandOption: true,
            demand:true,
            type: 'string'
        },
        body: {
            describe: 'body as option',
            demandOption: true,
            demand:true,
            type: 'string'
        }
    },
    handler:  (argv) => {
        console.log('--Running: Adding with a title: ' + argv.title)
        console.log('--New note: ' + argv.body)
        tools.addNote(argv.title,argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'title to remove',
            demandOption: true,
            demand:true,
            type: 'string'
        } 

    },
    handler:  (argv) => {
       tools.removeNote(argv.title)
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler:  () => {
        tools.listNotes()
    }
})

// Create read command
yargs.command( {
    command: 'read',
    describe:'Read a note',
    builder: {
        title: {
            describe: 'title to read',
            demandOption: true,
            demand:true,
            type: 'string'
        } 

    },
    handler: (argv) => {
        tools.readNote(argv.title)
    }
}
)
.strictCommands(true)
.strictOptions(true)
yargs.parse()
