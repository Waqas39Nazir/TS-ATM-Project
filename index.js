#!/usr/bin/env node
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
//PIN Code
const pinCode = 1122;
const totalAttempts = 3;
let pinCodeTried = 1;
let currentAccBal = 13000;
let savingAccBal = 19000;
const incrementPINCodeTriedHandler = () => {
    pinCodeTried += 1;
};
const tryAgainHandler = () => {
    transactionHandler();
};
const gradientConsole = (message) => {
    return gradient.pastel.multiline(message);
};
const figletGradientConsole = (message) => {
    // const message = `Your Current Balance is PKR ${currentAccBal}`;
    return figlet(message, (err, result) => {
        console.log(gradient.pastel.multiline(result));
    });
};
const balanceInquiryHandler = (accountType) => {
    console.clear();
    //show user his selected account balance
    if (accountType === "Current Account") {
        // figletGradientConsole(`Your Current Balance is PKR ${currentAccBal}`);
        console.log(gradientConsole(`Your Current Balance is PKR ${currentAccBal}\n`));
    }
    else if (accountType === "Saving Account") {
        // figletGradientConsole(`Your Current Balance is PKR ${savingAccBal}`);
        console.log(gradientConsole(`Your Current Balance is PKR ${savingAccBal}\n`));
    }
    performAnotherTransactionHandler();
};
const performAnotherTransactionHandler = () => {
    inquirer
        .prompt([
        {
            name: "transaction",
            type: "list",
            message: gradientConsole("You you like to make another transaction"),
            choices: [gradientConsole("Yes"), gradientConsole("No")],
        },
    ])
        .then((value) => {
        const choice = value.transaction;
        if (gradientConsole("Yes") === choice) {
            selectAccountTypeHandler();
        }
    })
        .catch((error) => {
        console.log("Error:", error);
    });
};
const cashChoices = [
    "1000",
    "2000",
    "3000",
    "5000",
    "10000",
    "15000",
    "20000",
    "Other amount",
];
const cashWithdrawHandler = (accountType) => {
    console.clear();
    console.log("Account Type:", accountType);
    //show user multiples options to withdraw balance...also check current balance and decrement it
    inquirer
        .prompt([
        {
            name: "withdrawBalance",
            type: "list",
            message: gradientConsole("Please select amount:"),
            choices: cashChoices,
            pageSize: cashChoices.length,
        },
    ])
        .then((value) => {
        console.clear();
        const amount = parseInt(value.withdrawBalance);
        const accountBal = accountType === "Current Account" ? currentAccBal : savingAccBal;
        if (amount <= accountBal) {
            console.log(gradientConsole(`${amount} withdrawn successfully`));
            console.log(gradientConsole(`Remaining Balance${accountType === "Current Account" ? "(C)" : "(S)"}:${accountBal - amount}`));
            if (accountType === "Current Account") {
                currentAccBal = accountBal - amount;
            }
            else {
                savingAccBal = accountBal - amount;
            }
            performAnotherTransactionHandler();
        }
        else {
            console.log(gradientConsole("Insufficient funds available"));
        }
    })
        .catch((error) => {
        console.log("Error:", error);
    });
};
const cashTransferHandler = (accountType) => {
    console.clear();
    //transfer cash to another account and decrement account balance
    inquirer
        .prompt([
        {
            name: "accountNumber",
            type: "input",
            message: gradientConsole("Please enter receipent account number"),
            validate: (value) => {
                if (isNaN(value) && value.length < 12) {
                    console.log(gradientConsole("\nHint:Please enter a 12 digit account number"));
                    return false;
                }
                return true;
            },
        },
        {
            name: "amount",
            type: "input",
            message: gradientConsole("Please enter amount to be send"),
            validate: (value) => {
                if (isNaN(value) && value.length < 12) {
                    console.log(gradientConsole("\nHint:Please enter a 12 digit account number"));
                    return false;
                }
                return true;
            },
        },
    ])
        .then((value) => {
        // console.log("Value:", value);
        const accountNumber = value.accountNumber;
        const amount = parseInt(value.amount);
        const accountBal = accountType === "Current Account" ? currentAccBal : savingAccBal;
        if (accountNumber.length < 12) {
            console.log(gradientConsole("Invalid account number"));
        }
        else if (amount <= accountBal) {
            console.log(gradientConsole(`PKR ${amount} successfully sent to Acc:${accountNumber}`));
            console.log(gradientConsole(`Remaining Balance${accountType === "Current Account" ? "(C)" : "(S)"}:${accountBal - amount}`));
            if (accountType === "Current Account") {
                currentAccBal = accountBal - amount;
            }
            else {
                savingAccBal = accountBal - amount;
            }
            performAnotherTransactionHandler();
        }
        else {
            console.log(gradientConsole("Insufficient funds available"));
        }
    })
        .catch((error) => {
        console.log("Error:", error);
    });
};
const selectAccountTypeHandler = () => {
    console.clear();
    inquirer
        .prompt([
        {
            name: "accountType",
            type: "list",
            message: gradientConsole("Please select an account type:"),
            choices: [
                gradientConsole("Current Account"),
                gradientConsole("Saving Account"),
            ],
        },
        {
            name: "action",
            type: "list",
            message: gradientConsole("Please select action to perform:"),
            choices: [
                gradientConsole("Balance Inquiry"),
                gradientConsole("Cash Withdraw"),
                gradientConsole("Cash Transfer"),
            ],
        },
    ])
        .then((value) => {
        const selectedAccount = value.accountType;
        const action = value.action;
        if (selectedAccount === gradient.pastel.multiline("Current Account")) {
            // console.log("CALLED 11");
            if (action === gradient.pastel.multiline("Balance Inquiry")) {
                balanceInquiryHandler("Current Account");
            }
            else if (action === gradient.pastel.multiline("Cash Withdraw")) {
                cashWithdrawHandler("Current Account");
            }
            else if (action === gradient.pastel.multiline("Cash Transfer")) {
                cashTransferHandler("Current Account");
            }
        }
        else if (selectedAccount === gradient.pastel.multiline("Saving Account")) {
            if (action === gradient.pastel.multiline("Balance Inquiry")) {
                balanceInquiryHandler("Saving Account");
            }
            else if (action === gradient.pastel.multiline("Cash Withdraw")) {
                cashWithdrawHandler("Saving Account");
            }
            else if (action === gradient.pastel.multiline("Cash Transfer")) {
                cashTransferHandler("Saving Account");
            }
        }
    })
        .catch((error) => {
        console.log("Error:", error);
    });
};
const transactionHandler = () => {
    console.clear();
    inquirer
        .prompt([
        {
            name: "pinCode",
            type: "input",
            message: pinCodeTried === 1
                ? gradientConsole("Enter 4 Digit PIN")
                : gradientConsole("Please enter valid PIN Code"),
            validate: (value) => {
                if (isNaN(value)) {
                    console.log(gradientConsole("\nHint:Please enter a 4 digit PIN Code"));
                    return false;
                }
                return true;
            },
        },
    ])
        .then((value) => {
        const pin = parseInt(value.pinCode);
        if (pin === pinCode) {
            selectAccountTypeHandler();
        }
        else if (pin !== pinCode && pinCodeTried !== totalAttempts) {
            incrementPINCodeTriedHandler();
            tryAgainHandler();
        }
        else if (pinCodeTried === totalAttempts) {
            console.log(gradientConsole("Your ATM Card is blocked, please contact at helpline:0340-1122123"));
        }
    })
        .catch((error) => {
        console.log("Error:", error);
    });
};
transactionHandler();
