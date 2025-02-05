// main.js
const prompts = require("prompts");

const flatten = require("./flatten");
const test = require("./test");

const functions = {
  flatten,
  test,
};

async function main() {
  const functionNames = Object.keys(functions);

  const { functionChoice } = await prompts({
    type: "select",
    name: "functionChoice",
    message: "Which function would you like to run?",
    choices: functionNames.map((name) => ({
      title: name.charAt(0).toUpperCase() + name.slice(1),
      value: name,
    })),
  });

  if (functions[functionChoice]) {
    const result = functions[functionChoice]();
    console.log(`${functionChoice} result:`, result);
  }
}

main();
