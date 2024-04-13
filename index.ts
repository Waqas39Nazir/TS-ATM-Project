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

const balanceInquiryHandler = () => {
  //show user his selected account balance
};

const cashWithdrawHandler = () => {
  //show user multiples options to withdraw balance...also check current balance and decrement it
};

const cashTransferHandler = () => {
  //transfer cash to another account and decrement account balance
};

const selectAccountTypeHandler = () => {
  inquirer
    .prompt([
      {
        name: "accountType",
        type: "list",
        message: gradient.pastel.multiline("Please select an account type:"),
        choices: [
          gradient.pastel.multiline("Current Account"),
          gradient.pastel.multiline("Saving Account"),
        ],
      },
      {
        name: "action",
        type: "list",
        message: gradient.pastel.multiline(
          "Please select an action to perform:"
        ),
        choices: [
          gradient.pastel.multiline("Balance Inquiry"),
          gradient.pastel.multiline("Cash Withdraw"),
          gradient.pastel.multiline("Cash Transfer"),
        ],
      },
    ])
    .then((value) => {
      const selectedAccount = value.accountType.toString();
      const action = value.action;

      if (selectedAccount === gradient.pastel.multiline("Current Account")) {
        console.log("CALLED 11");
      } else if (
        selectedAccount === gradient.pastel.multiline("Saving Account")
      ) {
        console.log("CALLED 22");
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
            ? gradient.pastel.multiline("Enter 4 Digit PIN")
            : gradient.pastel.multiline("Please enter valid PIN Code"),
        validate: (value) => {
          if (isNaN(value)) {
            console.log(
              gradient.pastel.multiline(
                "\nHint:Please enter a 4 digit PIN Code"
              )
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
          gradient.pastel.multiline(
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
