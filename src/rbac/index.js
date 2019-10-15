// import readline-sync from 'readline-sync';
// import program from 'commander';
// import chalk from 'chalk';

// var debug = require('debug')('rbac');

// const CONFIG_FILE = 'config.js';


// program
//     .version(require('./package.json').version)
//     .option('-g, --gen-config', "Contacts NetSuite for config information and generates a config file so you don't " +
//         "have to populate the config file entirely by hand")
//     .on('--help', function () {
//         console.log('Help');
//         console.log();
//         console.log('Generate (unencrypted) config file interactively:')
//         console.log(chalk.inverse(' ns -g '))
//         console.log();
//         console.log('Upload a file to the folder set in the config file:')
//         console.log(chalk.inverse(' ns -u EC_UserEvent.js '))
//         console.log();
//         console.log('run in debug mode (linux/osx)')
//         console.log(chalk.inverse(' DEBUG=ns; ns -u EC_UserEvent.js '))
//     })
//     .parse(process.argv);

// if (program.genConfig) {
//     console.log("Generating " + CONFIG_FILE + "...")
//     console.log('Enter credentials to select account/role to use..')
//     var username = readlineSync.question('Account login email: ');
//     var password = readlineSync.question('Account login password: ');
//     console.log('Enter the internal id of the folder to which files will be saved. If you do not set this it will' +
//         ' default to zero and you must edit the config file manually to set the folder id value');
//     var folder = readlineSync.question('Destination Folder Id: ');
//     var isSandbox = readlineSync.keyInYN('Sandbox Account? ');
//     console.log('Configure Watcher');
//     var isWatcherEnabled = readlineSync.keyInYN('Enable Watcher');
//     console.log("isWatcherEnabled " + isWatcherEnabled)
//     if (isWatcherEnabled) {
//         var watchPath = readlineSync.question('Specify the specific path to watch. If not leave blank It wil watch all the root files: ');
//         var watchFiles = readlineSync.question('Provide files to be WatchedFiles in a comma separated. Please specify path of each file as if not in root folder: ');
//         var unWatchedFiles = readlineSync.question('Provide files to be unWatchedFiles in a comma separated. Please specify path of each file as if not in root folder: ');
//     }

//     fileCabinet.discoverConfigInfo(username, password, isSandbox)
//         .then(function (result) {
//             debug('Received body %s', result.body);
//             var accountInfo = promptUserForAccountSelection(JSON.parse(result.body));
//             if (!accountInfo) process.exit();
//             debug('user selected %s', JSON.stringify(accountInfo, null, "  "));
//             return createConfig({
//                 account: accountInfo.account.internalId,
//                 email: username,
//                 password: password,
//                 role: accountInfo.role.internalId,
//                 webserviceshost: accountInfo.dataCenterURLs.webservicesDomain,
//                 folderid: folder || 0,
//                 enableWatcher: isWatcherEnabled,
//                 watchPath: watchPath ? watchPath : '.',
//                 watchFiles: watchFiles,
//                 unWatchedFiles: unWatchedFiles,
//             })
//         })
//         .then(function (configData) {
//             fs.writeFileSync(CONFIG_FILE, configData);
//             console.log('wrote ' + configData)
//         })
//         .catch(console.error)
// }

export RBAC from './RBAC';
export Base from './Base';
export Role from './Role';
export Permission from './Permission';
export Storage from './Storage';
export Memory from './Memory';
