# LoanPro-Calculator Automation

LoanPro has built a new, state of the art calculator that’s set to revolutionize the world of basic arithmetic operations. 
On this project, you will be able to run and execute the Automation testing to find and replicate bugs/issues reported.

### Requeriments:
- **NodeJS**: You must have installed NodeJS, preferred with the version 20.X
- **Docker**
- **LoandPro-Calculator-CLI**
- **Java Runtime Environment** (Optional)
- **Allure CLI** (Optional)

# Setup Environtment
Firstable, make your of have running Docker. Later you need to download the docker image:
***Installing:***
```sh
docker pull public.ecr.aws/l4q9w4c5/loanpro-calculator-cli:latest
```
Now you are able to test the Calculator its working okay first:
***Running the calculator:***
```sh
docker run --rm public.ecr.aws/l4q9w4c5/loanpro-calculator-cli add 8 4
Result: 12      //output
```
If your got the right output, you are okay to install the automation project.

# Install

```sh
git clone https://github.com/JoseAlejandroRR/loanpro-calculator.git
cd loanpro-calculator
npm install 
```

**Installing Allure** (Optional)
Be sure of having the JRE (Java Runtime Environment) installed at your computer. If you need it, you can try this easy guide to install using [jenv](https://www.jenv.be/).
```sh
npm  install  -g  allure-commandline // Install globaly the tool
```

## How it Works

### Developer Execution Mode

As a developer, you are able to execute the automation suite tests doing focus only in the tests regarded to the LoanPro app only, having access mainly to the tests over features with issues and bugs. 
 
 ```sh
npm run server
```

Once you have ran the previous command, the reports will be generated and will see the output at the terminal and before finishing, in your browser should be open:

- http://localhost:5001/_reporting/jest-stare/index.html for Jest-stare Reports
- http://localhost:13000/index.html for Allure Reports

If any never its opened, try it yourself.

## Automation Developer Mode

Running on this mode, you will execute the whole tests in the project, where are included elements and componente what makes works the Automation project self and having a verbose output in the console and more details in general.

 ```sh
npm run test:automation 
```

# Reports

The project is setup with Jest as framework to build the tests, integrated with two different options to generate reports. The first and more basic its **[Jest-stare](https://www.npmjs.com/package/jest-stare)**, and the second and more powerful its [Allure](https://allurereport.org/).

```sh
npm run test
npm run serve
```

### Jest-stare

After executing ***npm run test***, a folder will be created at **[projectRoot]/_reporting/jest-stare/**, just open the local file **index.html** in the browser.

### Allure

Allure it's an advanced tool to manage and report pipeline Automations, so its represent a higher effort.
If you are interested only in the bugs/issues reported, go through the "Categories" link at the left nav and you will find sorted the ***Failed*** and ***Broken*** tests, or just go to: http://localhost:61901/index.html#categories.

# Docker

Just in case, you are needing to run this project inside a container for docker, in a virtual machine with AWS/GCP/Azure, or just in your localhost without have to install anything else, you can try this:

```sh
cd loadpro-calculator 
docker build -t loanpro-calculator . 
docker run -it --privileged -v /var/run/docker.sock:/var/run/docker.sock -p 5001:5000 -p 13000:61901 loanpro-calculator
```

## Node Scripts
- **test**: Execute the pipeline with Jest to generate the reports
- **static-server**: Starts a webserver to serve the reports generated
- **server**: Combine the all scripts the run the tests, generate reports and serve the reports
- **test:automation**: Execute the pipeline with additionals tasks for Automation purpose
