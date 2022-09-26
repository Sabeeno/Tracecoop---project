const { Gateway, Wallets} = require('fabric-network');
const path = require('path');
const fs = require('fs');

// capture network variables from config.json
const configPath = path.resolve(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);

let connection_file = config.connection_file;
let userName = config.userName;
let gatewayDiscovery = config.gatewayDiscovery;

const ccpPath = path.join(process.cwd(), connection_file);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON)




// queryAllCars transaction
exports.queryAllCars = async function () {
    try {
        
        var response = {};

        // Create a new file system based wallet for managing identities
        const walletPath = path.join(process.cwd(), './wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path ${walletPath}`);

        // Check to see if we have already enrolled the user
        const identity = await wallet.get(userName);
        if(!identity) {
          console.log(`An identity for the user ${userName} does not exists in the wallet`);
          console.log('Run the registerUser.js application before retrying');
          response.error = `An identity for the user ${userName} does not exist in the wallet. Register ${userName} first`;
          return response;
        }

        // Create a new gateway for connecting to our peer node
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

        // Get the network (channel) our contract is deployed to
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network
        const contract = network.getContract('fabcar');

        // Evaluate the specified transaction
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryAllCars');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        return result;

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        response.error = error.message;
        return response;
    }
}


exports.queryCar = async function(key) {
    try {

        var response = {};

        // Create a new file system based wallet for managing identities
        const walletPath = path.join(process.cwd(), './wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path ${walletPath}`);

        // Check to see if we have already enrolled the user
        const identity = await wallet.get(userName);
        if(!identity) {
            console.log(`An identity for the user ${userName} does not exists in the wallet`);
            console.log('Run the registerUser.js application before retrying');
            response.error = `An identity for the user ${userName} does not exist in the wallet. Register ${userName} first`;
            return response;
        }

        // Create a new gateway for connecting to our peer node
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

        // Get the network (channel) our contract is deployed to
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network
        const contract = network.getContract('fabcar');

        // Evaluate the specified transaction
        // queryCar transaction - requires one argument, ex: ('queryCar', 'CAR4')
        const result = await contract.evaluateTransaction('queryCar', key);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        return result

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        response.error = error.message;
        return response;
    }
}


exports.createCar = async function(key, make, model, color, owner) {
    try{

        var response = {};

        // Create a new file system based wallet for managing identities
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        //Check to see if we have already enrolled the user
        const identity = await wallet.get(userName);
        if(!identity) {
            console.log(`An identity for the user ${userName} does not exist in the wallet`);
            console.log('Run the registerUser.js application before retrying');
            response.error = `An identity for the user ${userName} does not exist in the wallet. Register ${userName} first`;
            return response;
        }

        // Create a new gateway for connecting to our peer node
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network
        const contract = network.getContract('fabcar');

        // Submit the specified transaction
        // createCar transaction  - require 5 argument, ex; ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        await contract.submitTransaction('createCar', key, make, model, color, owner);
        console.log('Transaction has been submitted');

        // Disconnect from the gateway
        await gateway.disconnect();

        response.msg = 'createCar Transaction has been submitted';
        return response;

    } catch (error) {
        console.error(`Failed to submit transaction ${error}`);
        response.error = error.message;
        return response;
    }
}


exports.changeCarOwner = async function(key, newOwner) {
    try{

        var response = {};

        // Create a new file system based wallet for managing identities
        const walletPath = path.join(process.cwd(), './wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path ${walletPath}`);

        // Check to see if we have already enrolled the user
        const identity = await wallet.get(userName);
        if(!identity) {
            console.log(`An identity for the user ${userName} does not exists in the wallet`);
            console.log('Run the registerUser.js application before retrying');
            response.error = `En identity for the user ${userName} does not exists in the wallet. Register ${userName} first`;
            return response;
        }

        // Create a new gateway for connecting to our peer node
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

        // Get the network (channel) our countract is deployed to
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network
        const contract = network.getContract('fabcar');

        // Submit the specified transaction
        // changeCarOwner transaction - requires 2 args, ex: ('changeCarOwner', 'CAR10', 'Dave')
        await contract.submitTransaction('changeCarOwner', key, newOwner);
        console.log('Transaction has been submitted');

        // Disconnect from the gateway
        await gateway.disconnect();

        response.msg = 'changeCarOwner Transaction has been submitted';
        return response;
    } catch (error) {
        console.error(`Failed to submit transaction ${error}`);
        response.error = error.message;
        return response;
    }
}







exports.queryCarsMake = async function (make) {
    try {
        var response = {};

        // Create a new file system based wallet for managing identities
        const walletPath = path.join(process.cwd(), './wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path ${walletPath}`);

        // Check to see if we have already enrolled the user
        const identity = await wallet.get(userName);
        if(!identity) {
          console.log(`An identity for the user ${userName} does not exists in the wallet`);
          console.log('Run the registerUser.js application before retrying');
          response.error = `An identity for the user ${userName} does not exist in the wallet. Register ${userName} first`;
          return response;
        }

        // Create a new gateway for connecting to our peer node
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

        // Get the network (channel) our contract is deployed to
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network
        const contract = network.getContract('fabcar');

        // Evaluate the specified transaction
        // queryCarsMake transaction - requires one arguments, ex: ('queryCarsMake', Toyota)
        const result = await contract.evaluateTransaction('queryCarsMake', make);
        const allResults = JSON.parse(Buffer.from(result).toString('utf8'))

        console.info(allResults);
        return JSON.stringify(allResults);
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        response.error = error.message;
        return response;
    }
}