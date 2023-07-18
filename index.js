#!/usr/bin/env node
'use strict';
var boxen = require("boxen");
var chalk = require("chalk");
var inquirer = require("inquirer");
var clear = require("clear");
var _open = require("open");
var download = require('download');
var path = require('path');
var ora = require('ora');
var cliSpinners = require('cli-spinners');
clear();
var _prompt = inquirer.createPromptModule();
var questions = [
    {
        type: "list",
        name: "action",
        message: "What you want to do?",
        choices: [
            {
                name: "Send me an ".concat(chalk.green.bold("email"), "?"),
                value: function () {
                    _open("mailto:abhikrishnaram88@gmail.com")
                        .then(function () {
                        console.log("\nDone, see you soon at inbox.\n");
                    })
                        .catch(function () {
                        console.log("\nSomething went wrong.\n Try again mailing me at abhikrishnaram88@gmail.com");
                    });
                },
            },
            {
                name: "Download my ".concat(chalk.magentaBright.bold("Resume"), "?"),
                value: function () {
                    var loader = ora({
                        text: ' Downloading Resume',
                        spinner: cliSpinners.material,
                    }).start();
                    var fileUrl = 'https://github.com/abhikrishnaram/abhikrishnaram/resume.pdf';
                    var fileName = path.basename('abhikrishnaram-resume.pdf');
                    var filePath = path.join(process.cwd(), fileName);
                    download(fileUrl, './', { filename: 'abhikrishnaram-resume.pdf' })
                        .then(function () {
                        console.log('done!');
                        loader.stop();
                        _open(filePath)
                            .then(function () { return console.log("\n See you soon \n"); })
                            .catch(function () { return console.log("\n Something went wrong \n"); });
                    })
                        .catch(function (err) {
                        console.error('\nError downloading the PDF.\nYou can view it at', fileUrl);
                        loader.stop();
                    });
                },
            },
            // {
            //     name: `Schedule a ${chalk.redBright.bold("Meeting")}?`,
            //     value: () => {
            //         _open('https://calendly.com/abhikrishnaram/30min')
            //             .then(() => console.log("\n See you at the meeting \n"))
            //             .catch(() => console.log("\n Something went wrong \n"));
            //     }
            // },
            {
                name: "Just quit.",
                value: function () {
                    console.log("Namaste.\n");
                },
            },
        ],
    },
];
var data = {
    name: chalk.bold.green("                          Abhiram Krishna"),
    handle: chalk.white("@abhikrishnaram"),
    work: "".concat(chalk.white("Student at"), " ").concat(chalk
        .hex("#2b82b2")
        .bold("Amrita Vishwa Vidyapeetham")),
    twitter: chalk.gray("https://twitter.com/") + chalk.cyan("abhikrishnaram"),
    github: chalk.gray("https://github.com/") + chalk.green("abhikrishnaram"),
    linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue("abhikrishnaram"),
    web: chalk.cyan("https://abhikrishnaram.vercel.app/"),
    npx: chalk.red("npx") + " " + chalk.white("abhikrishnaram"),
    labelWork: chalk.white.bold("       Work:"),
    labelTwitter: chalk.white.bold("    Twitter:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelLinkedIn: chalk.white.bold("   LinkedIn:"),
    labelWeb: chalk.white.bold("        Web:"),
    labelCard: chalk.white.bold("       Card:"),
};
var me = boxen([
    "".concat(data.name),
    "",
    "".concat(data.labelWork, "  ").concat(data.work),
    "",
    "".concat(data.labelTwitter, "  ").concat(data.twitter),
    "".concat(data.labelGitHub, "  ").concat(data.github),
    "".concat(data.labelLinkedIn, "  ").concat(data.linkedin),
    "".concat(data.labelWeb, "  ").concat(data.web),
    "",
    "".concat(data.labelCard, "  ").concat(data.npx),
    "",
    "".concat(chalk.italic("I am currently learning different aspects in software engineering,")),
    "".concat(chalk.italic("my inbox is always open. Whether you have a")),
    "".concat(chalk.italic("question or just want to say hi, I will try ")),
    "".concat(chalk.italic("my best to get back to you!"))
].join("\n"), {
    margin: 1,
    float: 'center',
    padding: 1,
    borderStyle: "single",
    borderColor: "green",
});
console.log(me);
var tip = [
    "Tip: Try ".concat(chalk.cyanBright.bold("cmd/ctrl + click"), " on the links above"),
    '',
].join("\n");
console.log(tip);
_prompt(questions).then(function (answer) { return answer.action(); });
