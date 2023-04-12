function loadData() {
  Papa.parse("./data/cardata.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: (results) => prepareData(results.data),
  });
}

function prepareData(data) {
  const nn = ml5.neuralNetwork({ task: "regression", debug: true });

  data.sort(() => Math.random() > 0.5);

  let trainData = data.slice(0, Math.floor(data.length * 0.8));
  let testData = data.slice(Math.floor(data.length * 0.8) + 1);

  for (let row of trainData) {
    nn.addData(
      {
        year: row.year,
        presentPrice: row.presentPrice,
        kms: row.kmsDriven,
        fuel: row.fuelType,
        seller: row.sellerType,
        transmission: row.transmission,
      },
      { price: row.sellingPrice }
    );
  }

  nn.normalizeData();
  nn.train({ epochs: 30 }, () => saveModel(nn));

  // let saveBtn = document.getElementById("saveBtn");
  // saveBtn.addEventListener("click", () => saveModel(nn));
}

function saveModel(nn) {
  nn.save();
}

function cleanData(data) {
  const columns = data.map((car) => ({
    x: car.sellingPrice,
    y: car.presentPrice,
  }));
  createChart(columns, "Selling Price", "Present Price");
}

loadData();
