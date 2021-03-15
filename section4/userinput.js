
import chalk from 'chalk'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'


console.log(yargs(hideBin(process.argv)).argv)

yargs(hideBin(process.argv))
.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        body: {
            describe: 'body as option',
            demandCommand: true,
            default: '',
            type: 'string'
        }
    },
    handler: function (argv) {
        console.log('--Running: Adding a new note: ' + argv.body)
    }
})

// Create remove command
.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function () {
        console.log('--Removing the note')
    }
})

// Create list command
.command({
    command: 'list',
    describe: 'List your notes',
    handler: function () {
        console.log('--Listing out all notes')
    }
})

// Create read command
.command( 'read','Read a note', () => {
        return yargs.option('title', {
            describe: 'Note title',
            demand: true,
            type: 'string'
        })
    }
    ,
    (argv) => {
        console.log('Reading a note using title: ', argv.title)
    }
)
.strictCommands()
.demandCommand(1)
.help()
.argv

