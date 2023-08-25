const figlet = require('figlet');
const { PREFIX } = require('../../config.json');
const chalk = require('chalk');

module.exports = async (client) => {
    client.manager.init(client.user.id);
    figlet(client.user.tag, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.red.bold(data));
    });

    const activities = [
        `${PREFIX}help | ANOTHER WORLD`
    ]

    setInterval(() => {
        client.user.setActivity(`${activities[Math.floor(Math.random() * activities.length)]}`, { type: 'LISTENING' });
    }, 15000)  

};
