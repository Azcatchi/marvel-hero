#!/usr/bin/env node

// Constantes
const program = require('commander')
const inquirer = require('inquirer')
const db = require('sqlite')
const fs = require('fs')

// Variables
var chalk = require('chalk');
var api = require('marvel-api');
var marvel = api.createClient({
  publicKey: '1a2e5ce88695e3ad18aa8482a106f763',
  privateKey: 'a427aca74331a443a27ceba83f03e527a4f0fa4f'
});


// Visage d'iron man
var ironman = function() {
      console.log('\n')
      console.log('░░░░░░░██████████████████░░░░░░░')
      console.log('░░░░████▓▓▓█▓▓▓▓▓▓▓▓█▓▓▓███░░░░░')
      console.log('░░░██▓▓█▓▓▓█▓▓▓▓▓▓▓▓█▓▓▓█▓▓█░░░░')
      console.log('░░██████████▓▓▓▓▓▓▓▓██████████░░')
      console.log('░░██──────███████████───────██░░')
      console.log('░███───────██▓▓▓▓▓▓█────────███░')
      console.log('░████───────█▓▓▓▓▓▓█───────████░')
      console.log('░█▓██───────█▓▓▓▓▓▓█───────██▓█░')
      console.log('░██▓█───────█▓▓▓▓▓▓█───────█▓██░')
      console.log('████▓█──────█▓▓▓▓▓▓█──────█▓████')
      console.log('█▓██▓█──────▀██████▀──────█▓██▓█')
      console.log('█▓██▓█────────────────────█▓██▓█')
      console.log('█▓████────────────────────████▓█')
      console.log('█▓██▀──────────────────────▀██▓█')
      console.log('█▓██──█▀▀▀▀▄▄──────▄▄▀▀▀▀█──██▓█')
      console.log('███───█─────▀██▄▄██▀─────█───███')
      console.log('░██───▀█▄▄▄▄█▀────▀█▄▄▄▄█▀───██░')
      console.log('░███────────────────────────███░')
      console.log('░░█▓█──────────────────────█▓█░░')
      console.log('░░█▓▓█────────────────────█▓▓█░░')
      console.log('░░█▓▓▓█──────────────────█▓▓▓█░░')
      console.log('░░█▓▓▓█──────────────────█▓▓▓█░░')
      console.log('░░█▓▓▓▓█▄──────────────▄█▓▓▓▓█░░')
      console.log('░░░█▓▓█▀█──▄▀▀▀▀▀▀▀▀▄──█▀█▓▓█░░░')
      console.log('░░░░█▓█─▀▄▄▀────────▀▄▄▀─█▓█░░░░')
      console.log('░░░░░█▓█─────▄▄▄▄▄▄─────█▓█░░░░░')
      console.log('░░░░░░█▓█▄▄▄██▓▓▓▓██▄▄▄█▓█░░░░░░')
      console.log('░░░░░░░█▓▓▓█▓▓▓▓▓▓▓▓█▓▓▓█░░░░░░░')
      console.log('░░░░░░░░████████████████░░░░░░░░')
      console.log('░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')
      console.log('\n')
}


// Fonction principale
var Principal = function() {
  ironman()
  // Questionnaire
  inquirer.prompt([
    {
      type: 'input',
      message: chalk.white.bgCyan('Entrez le nom d\'un personnage marvel'),
      name: 'personnage'
    }, {
      type: 'checkbox',
      message: chalk.white.bgCyan('Que voulez-vous connaitre ?'),
      name: 'chose',
      choices: [
        'histoire',
        'comics',
        'series'
      ]
    }
  ]).then((answers) => {
    // On affiche l'histoire des personnage
    marvel.characters.findByName(answers.personnage)
    .then(function(res) {
      console.log('\n');
      console.log('Personnage : ', res.data[0].name);
      if (answers.chose[0] == 'histoire') {
        console.log('\n');
        console.log('Histoire : ', res.data[0].description);
      }
      return marvel.characters.findByName(answers.personnage);
    })
    .then(function(res) {
      // On affiche les comics où le personnage apparait
      if (answers.chose[0] == 'comics' || answers.chose[1] == 'comics') {
        console.log('\n');
        console.log('Comics ou ' + answers.personnage + ' apparait : \n');
        for (i = 0; i < res.data[0].comics.items.length; i++) {
          console.log(res.data[0].comics.items[i].name);
        }
      }
      return marvel.characters.findByName(answers.personnage);
    })
    .then(function(res) {
      // On affiche les series où le personnage apparait
      if (answers.chose[0] == 'series' || answers.chose[1] == 'series' || answers.chose[2] == 'series'){
        console.log('\n');
        console.log('Series ou ' + answers.personnage + ' apparait : \n');
        for (i = 0; i < res.data[0].series.items.length; i++) {
          console.log(res.data[0].series.items[i].name);
        }
      }
      return marvel.characters.findByName(answers.personnage);
    })
    .fail(console.error)
    .done();
  })
}

// Fonction pour enregistrer dans un txt l'histoire d'un personnage
var getHistory = function () {
  ironman();
  inquirer.prompt([
    {
      type: 'input',
      message: chalk.white.bgGreen('Entrez le nom d\'un personnage marvel'),
      name: 'personnage'
    }
  ]).then((answers) => {
    marvel.characters.findByName(answers.personnage)
    .then(function(res) {
      console.log(chalk.green('Personnage : '), chalk.green(res.data[0].name));
      console.log(chalk.green('Histoire : '), chalk.green(res.data[0].description));
      return marvel.characters.findByName(answers.personnage);
    }).then(function(res) {
      inquirer.prompt([
        {
          type: 'confirm',
          message: chalk.white.bgGreen('Voulez-vous sauvegarder l\'histoire de cet heros ?'),
          name: 'saveornot'
        }
      ]).then((answers) => {
        if (answers.saveornot == true) {
          try {
            var nom = res.data[0].name;
            var fichiertitle = './heros/' + nom.toLowerCase() + '-history.txt';
            fs.writeFile(fichiertitle, res.data[0].description), (err) => {
              if (err) throw err
              console.log('Fichier écrit');
            }
            console.log(chalk.white.bgGreen('Fichier Sauvegarder'));
          } catch (err) {
            console.error('ERR > ', err)
          }
        } else {
          console.log('Finish !');
        }
      })
    })
    .fail(console.error)
    .done();
  })
}

// Fonction pour enregistrer dans une db les comics d'un personnage
var getComics = function () {
  ironman();
  inquirer.prompt([
    {
      type: 'input',
      message: chalk.white.bgMagenta('Entrez le nom d\'un personnage marvel'),
      name: 'personnage'
    }
  ]).then((answers) => {
    var fichiertitle = './heros/' + answers.personnage + '-comics.db';
    db.open(fichiertitle).then((res) => {
      db.run("CREATE TABLE IF NOT EXISTS characters (comics)")
      return answers.personnage;
    }).then(() => {
      marvel.characters.findByName(answers.personnage)
      .then(function(res) {
        console.log('\n');
        console.log(chalk.magenta('Personnage : '), chalk.magenta(res.data[0].name));
        for (i = 0; i < res.data[0].comics.items.length; i++) {
          //  console.log(res.data[0].comics.items[i].name);
          var test = res.data[0].comics.items[i].name;
          db.run("INSERT INTO characters VALUES (?)", [test]);
        }
        db.all("SELECT * FROM characters").then(function(rows) {
          console.log('\n');
          console.log(chalk.magenta('Comics ou ' + answers.personnage + ' apparait : \n'));
          for (i in rows) {
            var row = rows[i]
            console.log(chalk.magenta(row.comics));
          }
        })
      })
      .fail(console.error)
      .done();
    })
  })
}

// Fonction pour enregistrer dans une db les series d'un personnage
var getSeries = function () {
  ironman();
  inquirer.prompt([
    {
      type: 'input',
      message: chalk.white.bgYellow('Entrez le nom d\'un personnage marvel'),
      name: 'personnage'
    }
  ]).then((answers) => {
    var fichiertitle = './heros/' + answers.personnage + '-series.db';
    db.open(fichiertitle).then((res) => {
      db.run("CREATE TABLE IF NOT EXISTS characters (series)")
      return answers.personnage;
    }).then(() => {
      marvel.characters.findByName(answers.personnage)
      .then(function(res) {
        console.log('\n');
        console.log(chalk.yellow('Personnage : '), chalk.yellow(res.data[0].name));
        console.log('\n');
        for (i = 0; i < res.data[0].series.items.length; i++) {
          //  console.log(res.data[0].comics.items[i].name);
          var test = res.data[0].series.items[i].name;
          db.run("INSERT INTO characters VALUES (?)", [test]);
        }
        db.all("SELECT * FROM characters").then(function(rows) {
          console.log(chalk.yellow('Series ou ' + answers.personnage + ' apparait : \n'));
          for (i in rows) {
            var row = rows[i]
            console.log(chalk.yellow(row.series));
          }
        })
      })
      .fail(console.error)
      .done();
    })
  })
}


// Création des options
program
 .version('1.0.0')
 .option('-i, --history', 'Voir et sauvegarder en txt, l\'histoire d\'un personnage')
 .option('-c, --comics', 'Voir et sauvegarder en bd, les comics ou un personnage apparait')
 .option('-s, --series', 'Voir et sauvegarder en bd, les series ou un personnage apparait')
// On parse (convertit en format utilisable) les options
// fonction synchrone
program.parse(process.argv)
// Maintenant on peut les utiliser
if (program.history) {
  getHistory()
} else if (program.comics) {
  getComics()
} else if (program.series) {
  getSeries()
} else {
  Principal()
}
