const nn = ml5.neuralNetwork({ task: "regression" });
nn.load("./model/model.json", modelLoaded);

async function modelLoaded() {
  console.log("the model was loaded!");
}

let button = document.getElementById("predict");
button.addEventListener("click", predict);

async function predict() {
  let buildYear = document.getElementById("year").value;
  let presentPrice = document.getElementById("price").value;
  let kmsDriven = document.getElementById("km").value;
  let fuelType = document.getElementById("fuel").value;
  let sellerType = document.getElementById("seller").value;
  let transmissionType = document.getElementById("transmission").value;

  // console.log(year, price, km, fuel, seller, transmission);

  const result = await nn.predict({
    year: parseInt(buildYear),
    presentPrice: parseInt(presentPrice),
    kms: parseInt(kmsDriven),
    fuel: fuelType,
    seller: sellerType,
    transmission: transmissionType,
  });

  let endResult = document.getElementById("result");

  let priceResult = result[0].price * 1000;
  endResult.innerHTML = `De prijs is: €${priceResult.toFixed(2)},-`;
}
