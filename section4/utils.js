const fs = require('fs')
const chalk = require('chalk')

const getNotes = (title) => {
    const notes = loadNotes()
    const foundnote = notes.find((note) => note.title === title)
    console.log('')
}

const readNote = (title) => {
    debugger
    const notes = loadNotes()
    const foundnote = notes.find((note) => note.title === title)
    if(foundnote)
        console.log(chalk.bgGreen('Note of ' + title ) + "\n" + foundnote.body)
    else
     console.log(chalk.bgRed('Note of ' + title  + " not found!"))
}

const addNote =  (title, body) => {
    const notes = loadNotes()
    const foundnote = notes.find((note) => note.title === title)
    if (foundnote === undefined){
        notes.push({
            title: title,
            body: body
        }
        )
        saveNotes(notes)
        console.log(notes)
        console.log(chalk.bgGreen('Note ' + title + ' was added!'))
    }else{
        console.log()
        console.log(chalk.bgRed('Note with title ' + title + ' is a duplicate'))
    }
 

}
const removeNote = (title) => {
    const notes = loadNotes()
    const foundnotes = notes.filter( (note) => note.title !== title )
    if(notes.length === foundnotes.length){
        console.log(chalk.bgRed('No note found!'))
    }
    else if (foundnotes.length != 0){
        console.log(chalk.bgGreen('Note ' + title + ' removed!'))
        saveNotes(foundnotes)
        console.log(foundnotes)
    }
}

const saveNotes =  (notes) => {
    fs.writeFileSync('note.json',JSON.stringify(notes))
}
const loadNotes =  () => {
    try{
        const buff = fs.readFileSync('note.json')
        return JSON.parse(buff.toString())
    }catch(e) {
        return []
    }
    
}
const listNotes = () =>  {
    const notes = loadNotes()
    console.log(chalk.red('Your notes'))
    notes.forEach((note) => {
        console.log('Title of note: ' + note.title)
    });
}

module.exports =  {
    getNotes:getNotes,
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}
