// script.js

const form = document.getElementById("transactionForm");
const title = document.getElementById("title");
const amount = document.getElementById("amount");
const type = document.getElementById("type");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("transactionList");

let transactions = [];

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const titleValue = title.value.trim();
    const amountValue = parseFloat(amount.value);
    const typeValue = type.value;

    if (titleValue === "" || isNaN(amountValue) || amountValue <= 0) {
        alert("Please enter valid details");
        return;
    }

    const transaction = {
        id: Date.now(),
        title: titleValue,
        amount: amountValue,
        type: typeValue
    };

    transactions.push(transaction);

    updateUI();
    form.reset();
});

function updateUI() {
    list.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(function (item) {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${item.title} - ₹${item.amount}</span>
            <button onclick="deleteTransaction(${item.id})">X</button>
        `;

        list.appendChild(li);

        if (item.type === "income") {
            totalIncome += item.amount;
        } else {
            totalExpense += item.amount;
        }
    });

    // Remaining Balance = Income - Expense
    let remaining = totalIncome - totalExpense;

    income.textContent = "₹" + totalIncome;
    expense.textContent = "₹" + totalExpense;
    balance.textContent = "₹" + remaining;
}

function deleteTransaction(id) {
    transactions = transactions.filter(function (item) {
        return item.id !== id;
    });

    updateUI();
}