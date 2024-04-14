#! /usr/bin/node env
import { error } from "console";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";

//PIN Code
const pinCode = 1122;
const totalAttempts = 3;
let pinCodeTried = 1;
const currentAccBal = 13000;
const savingAccBal = 19000;

const incrementPINCodeTriedHandler = () => {
  pinCodeTried += 1;
};

const tryAgainHandler = () => {
  transactionHandler();
};

const gradientConsole = (message: string) => {
  return gradient.pastel.multiline(message);
};

const figletGradientConsole = (message: string) => {
  // const message = `Your Current Balance is PKR ${currentAccBal}`;
  return figlet(message, (err, result) => {
    console.log(gradient.pastel.multiline(result));
  });
};

const balanceInquiryHandler = (accountType: string) => {
  //show user his selected account balance
  if (accountType === "Current Account") {
    figletGradientConsole(`Your Current Balance is PKR ${currentAccBal}`);
  } else if (accountType === "Saving Account") {
    figletGradientConsole(`Your Current Balance is PKR ${savingAccBal}`);
  }
};

const cashWithdrawHandler = (accountType: string) => {
  //show user multiples options to withdraw balance...also check current balance and decrement it
  inquirer
    .prompt([
      {
        name: "withdrawBalance",
        type: "list",
        message: gradientConsole("Please select amount:"),
        choices: [
          gradientConsole("1000"),
          gradientConsole("2000"),
          gradientConsole("3000"),
          gradientConsole("5000"),
          gradientConsole("10000"),
          gradientConsole("15000"),
          gradientConsole("20000"),
          gradientConsole("Other amount"),
        ],
      },
    ])
    .then((value) => {
      const amount = value.withdrawBalance;
      const accountBal =
        accountType === "Current Account" ? currentAccBal : savingAccBal;

      if (amount < accountBal) {
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

const cashTransferHandler = (accountType: string) => {
  //transfer cash to another account and decrement account balance
};

const selectAccountTypeHandler = () => {
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
        message: gradientConsole("Please select an action to perform:"),
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
        } else if (action === gradient.pastel.multiline("Cash Withdraw")) {
          cashWithdrawHandler("Cash Withdraw");
        } else if (action === gradient.pastel.multiline("Cash Transfer")) {
          cashTransferHandler("Cash Transfer");
        }
      } else if (
        selectedAccount === gradient.pastel.multiline("Saving Account")
      ) {
        if (action === gradient.pastel.multiline("Balance Inquiry")) {
          balanceInquiryHandler("Saving Account");
        } else if (action === gradient.pastel.multiline("Cash Withdraw")) {
          cashWithdrawHandler("Cash Withdraw");
        } else if (action === gradient.pastel.multiline("Cash Transfer")) {
          cashTransferHandler("Cash Transfer");
        }
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

const transactionHandler = () => {
  inquirer
    .prompt([
      {
        name: "pinCode",
        type: "input",
        message:
          pinCodeTried === 1
            ? gradientConsole("Enter 4 Digit PIN")
            : gradientConsole("Please enter valid PIN Code"),
        validate: (value) => {
          if (isNaN(value)) {
            console.log(
              gradientConsole("\nHint:Please enter a 4 digit PIN Code")
            );
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
      } else if (pin !== pinCode && pinCodeTried !== totalAttempts) {
        incrementPINCodeTriedHandler();
        tryAgainHandler();
      } else if (pinCodeTried === totalAttempts) {
        console.log(
          gradientConsole(
            "Your ATM Card is blocked, please contact at helpline"
          )
        );
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};
// console.log();

transactionHandler();
