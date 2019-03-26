//ui vars
const amount = document.querySelector("#amount");
const interest = document.querySelector("#interest");
const years = document.querySelector("#years");

const monthlyPayment = document.querySelector("#monthly-payment");
const totalPayment = document.querySelector("#total-payment");
const totalInterest = document.querySelector("#total-interest");

//listen for submit
document.querySelector("#loan-form").addEventListener("submit", e => {
  document.querySelector("#loading").style.display = "block";

  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

function calculateResults() {
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1); //monthly payment

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    document.querySelector("#results").style.display = " block";
    document.querySelector("#loading").style.display = "none";
  } else {
    showError("Please check your numbers");
  }
}

function showError(errorString) {
  const errorDiv = document.createElement("div");

  //get elemetns
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // add class
  errorDiv.className = "alert alert-danger";

  errorDiv.appendChild(document.createTextNode(errorString));

  //insert erorr above heading
  card.insertBefore(errorDiv, heading);

  //clear error after 5 seconds
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}
