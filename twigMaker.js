const readline = require('readline');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const completed = (msg) => {
    console.log(msg);
    rl.question('The process seems to have completed successfully - press Enter to close', () => {
        rl.close();
    });
};

rl.question("Enter the project name: ", function(projName) {
    try {
        // Create all directories under the project name
        fs.mkdirSync(`${projName}`);
        fs.mkdirSync(`${projName}/controller`);
        fs.mkdirSync(`${projName}/data`);
        fs.mkdirSync(`${projName}/model`);
        fs.mkdirSync(`${projName}/public`);
        fs.mkdirSync(`${projName}/view`);
        fs.mkdirSync(`${projName}/public/images`);
        fs.mkdirSync(`${projName}/public/scripts`);
        fs.mkdirSync(`${projName}/public/styles`);
        fs.mkdirSync(`${projName}/view/private`);
        fs.mkdirSync(`${projName}/view/public`);

        function createReadmeInFolders(folders) {
            folders.forEach(folder => {
                try {
                    if (fs.existsSync(folder) && fs.readdirSync(folder).length === 0) {
                        const folderName = path.basename(folder);
                        const readmeContent = `# Placeholder for ${folderName}`;

                        fs.writeFileSync(path.join(folder, 'README.md'), readmeContent);
                        console.log(`Created README.md in ${folder}`);
                    }
                } catch (error) {
                    console.error(`Error processing folder ${folder}: ${error.message}`);
                }
            });
        }

        createReadmeInFolders([
            `${projName}/controller`,
            `${projName}/data`,
            `${projName}/model`,
            `${projName}/public`,
            `${projName}/public/images`,
            `${projName}/public/scripts`,
            `${projName}/public/styles`,
            `${projName}/view`,
            `${projName}/view/private`,
            `${projName}/view/public`
        ]);

        const extIndex = `
            <?php
            header("Location: public");
            die();
            `;
        fs.writeFileSync(`${projName}/index.php`, extIndex);

        const gitIgnore = `
.idea/
.vscode/
*.suo
*.ntvs*
*.njsproj
*.sln
config.php
logs
*.log
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*
/var/log/*.log
/node_modules/
/vendor/
/.pnp/
/.pnp.js
.env
.env.*
.env.local
.env.development.local
.env.production.local
.env.test.local
/build/
/dist/
/public/build/
/public/uploads/
/.next/
/out/
/cache/
/var/cache/*
/tmp/
/temp/
/coverage/
/nyc_output/
/.jest/
/.jest-test-results.json
/tests/bootstrap.php.cache
.phpunit.result.cache
.php_cs.cache
/node_repl_history
*.tsbuildinfo
.npm/
.yarn/
/bin/
/public/bundles/
`;
        fs.writeFileSync(`${projName}/.gitignore`, gitIgnore);
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
    }

    // create the config
    const cfgFile = `
<?php
/*
// prod version
const PROJECT_DIRECTORY = __DIR__;
const PUB_DIR = __DIR__ . '/public/';
*/

// dev version
const PROJECT_DIRECTORY = __DIR__;
const PUB_DIR = '../public/';
            `;
    fs.writeFileSync(`${projName}/config.php`, cfgFile);

    // and routeCont
    const rteCont = `
<?php
require_once PROJECT_DIRECTORY."/controller/publicController.php";
            `;
    fs.writeFileSync(`${projName}/controller/routerController.php`, rteCont);


    // and pubCount....
    const pubCont = `
<?php
$route = $_GET['route'] ?? 'home';
switch ($route) {
  case 'home':
    echo $twig->render("public/public.index.html.twig");
    break;

  default:
    echo $twig->render("err404.html.twig");
}
            `;
    fs.writeFileSync(`${projName}/controller/publicController.php`, pubCont);

    // ...base.twig
    const baseTwig = `
<\!DOCTYPE html>
<html lang="{% block lang %}fr{% endblock %}">
<head>
    {% block head %}
        {% block meta %}{% endblock %}
        <title>{% block title %}Title{% endblock %}</title>
        {% block stylesheet %}{% endblock %}
    {% endblock %}
</head>
<body class={% block bodyClass %}{% endblock %}>{% block body %}

{% block navBar %}
    {% block connectBtn %} {% endblock %}
{% endblock %}

{% block content %}
    {% block hero %}
        {% block heroText %}{% endblock %}
        {% block heroImg  %}{% endblock %}
    {% endblock %}

    {% block sectionOne %}{% endblock %} {# Change these names as needed #}
    {% block sectionTwo %}{% endblock %}
    {% block sectionThree %}{% endblock %}


{% endblock %}

{% block footer %}{% endblock %}

{% block javascript %}{% endblock %}

</body> {% endblock %}
</html>`;
    fs.writeFileSync(`${projName}/view/base.html.twig`, baseTwig);

    // template.twig
    const tempTwig = `
{% extends 'base.html.twig' %}   
        `;
    fs.writeFileSync(`${projName}/view/template.html.twig`, tempTwig);

    // homepage.twig
    const homeTwig = `
{% extends 'template.html.twig' %}   
{% block hero %}If you can see this, all is good{% endblock %}
        `;
    fs.writeFileSync(`${projName}/view/public/public.index.html.twig`, homeTwig);

    // and the big index
    const pubIndex = `
<?php
use Twig\\Loader\\FilesystemLoader;
use Twig\\Environment;

require_once "../config.php";

spl_autoload_register(function ($class) {
  $class = str_replace('\\\\', '/', $class);
  require PROJECT_DIRECTORY.'/' .$class . '.php';
});

require_once PROJECT_DIRECTORY.'/vendor/autoload.php';

$loader = new FilesystemLoader(PROJECT_DIRECTORY.'/view/');

// Dev version
$twig = new Environment($loader, [
  'debug' => true,
]);
$twig->addExtension(new \\Twig\\Extension\\DebugExtension());

$twig->addGlobal('PUB_DIR', PUB_DIR);

/*
// Prod version
$twig = new Environment($loader, [
   'cache' => '../cache/Twig',
   'debug' => false,
]);
// no DebugExtension online
*/


/* NO DB FOR THIS PROJECT (AT THE CURRENT TIME)
try {
   $db = MyPDO::getInstance(DB_DRIVER . ":host=" . DB_HOST . ";dbname=" . DB_NAME . ";port=" . DB_PORT . ";charset=" . DB_CHARSET,
       DB_LOGIN,
       DB_PWD);
   $db->setAttribute(MyPDO::ATTR_ERRMODE, MyPDO::ERRMODE_EXCEPTION);
   $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
}catch (Exception $e){
   die($e->getMessage());
}

*/
require_once PROJECT_DIRECTORY.'/controller/routerController.php';

// $db = null;   
        `;
    fs.writeFileSync(`${projName}/public/index.php`, pubIndex);

    // run composer (make sure I'm in the folder)
    process.chdir(`${projName}`);
    execSync(`composer require "twig/twig:^3.0"`, {stdio: 'inherit'});
    // add git and create the glory commit
    execSync(`git init`, {stdio: 'inherit'});
    execSync(`git branch -m main`, {stdio: 'inherit'});
    execSync(`git add .`, {stdio: 'inherit'});
    execSync(`git commit -m "Setup completed by Leerlandais"`, {stdio: 'inherit'});

    completed("Setup completed successfully!");


});


// pkg twigMaker.js --targets node18-win-x64 --output twigMaker.exe