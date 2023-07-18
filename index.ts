#!/usr/bin/env node

'use strict';

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const _open = require("open");
const download = require('download')
const path = require('path');
const ora = require('ora');
const cliSpinners = require('cli-spinners');

clear();

const _prompt = inquirer.createPromptModule();

const questions = [
    {
        type: "list",
        name: "action",
        message: "What you want to do?",
        choices: [
            {
                name: `Send me an ${chalk.green.bold("email")}?`,
                value: () => {
                    _open("mailto:abhikrishnaram88@gmail.com")
                        .then(() => {
                            console.log("\nDone, see you soon at inbox.\n");
                        })
                        .catch(() => {
                            console.log(
                                "\nSomething went wrong.\n Try again mailing me at abhikrishnaram88@gmail.com"
                            );
                        });
                },
            },
            {
                name: `Download my ${chalk.magentaBright.bold("Resume")}?`,
                value: () => {
                    const loader = ora({
                        text: ' Downloading Resume',
                        spinner: cliSpinners.material,
                    }).start();

                    const fileUrl = 'https://github.com/abhikrishnaram/abhikrishnaram/resume.pdf';
                    const fileName = path.basename('abhikrishnaram-resume.pdf');
                    const filePath = path.join(process.cwd(), fileName);

                    download(fileUrl, './', { filename: 'abhikrishnaram-resume.pdf' })
                        .then(() => {
                            console.log('done!');
                            loader.stop();
                            _open(filePath)
                                .then(() => console.log("\n See you soon \n"))
                                .catch(() => console.log("\n Something went wrong \n"));
                        })
                        .catch(() => {
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
                value: () => {
                    console.log("Namaste.\n");
                },
            },
        ],
    },
];

const data = {
    name: chalk.bold.green("                          Abhiram Krishna"),
    handle: chalk.white("@abhikrishnaram"),
    work: `${chalk.white("Student at")} ${chalk
        .hex("#2b82b2")
        .bold("Amrita Vishwa Vidyapeetham")}`,
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

const me = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelWork}  ${data.work}`,
        ``,
        `${data.labelTwitter}  ${data.twitter}`,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelLinkedIn}  ${data.linkedin}`,
        `${data.labelWeb}  ${data.web}`,
        ``,
        `${data.labelCard}  ${data.npx}`,
        ``,
        `${chalk.italic(
            "I am currently learning different aspects in software engineering,"
        )}`,
        `${chalk.italic("my inbox is always open. Whether you have a")}`,
        `${chalk.italic(
            "question or just want to say hi, I will try "
        )}`,
        `${chalk.italic(
            "my best to get back to you!"
        )}`
    ].join("\n"),
    {
        margin: 1,
        float: 'center',
        padding: 1,
        borderStyle: "single",
        borderColor: "green",
    }
);

console.log(me);
const tip = [
    `Tip: Try ${chalk.cyanBright.bold(
        "cmd/ctrl + click"
    )} on the links above`,
    '',
].join("\n");
console.log(tip);

_prompt(questions).then((answer) => answer.action());
