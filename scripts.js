document.addEventListener("DOMContentLoaded", function() {
  const matrixContainer = document.getElementById("matrix");
  const symbolDataOutput = document.getElementById("symbolData");

  const clearBtn = document.getElementById("clearBtn");
  const invertBtn = document.getElementById("invertBtn");

  const rows = 8;
  const cols = 5;

  for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
          const button = document.createElement("button");
          button.dataset.row = i;
          button.dataset.col = j;
          button.addEventListener("click", toggleBit);
          matrixContainer.appendChild(button);
      }
  }

  clearBtn.addEventListener("click", clearMatrix);
  invertBtn.addEventListener("click", invertMatrix);

  updateSymbolData();


  function toggleBit(event) {
      const button = event.target;
      button.classList.toggle("active");
      updateSymbolData();
  }

  function updateSymbolData() {
      const symbolData = [];
      for (let i = 0; i < rows; i++) {
          let rowBits = 0;
          for (let j = 0; j < cols; j++) {
              const button = document.querySelector(`button[data-row="${i}"][data-col="${j}"]`);
              if (button.classList.contains("active")) {
                  rowBits |= (1 << (cols - 1 - j));
              }
          }

          symbolData.push(rowBits);
      }

      displaySymbolData(symbolData);
  }

  function displaySymbolData(data) {
      // symbolDataOutput.textContent = data.map(num => num.toString(2).padStart(cols, '0')).join('\n');
      symbolDataOutput.textContent = `byte custom[8] = {\n  ${data.map(byte => 'B' + byte.toString(2).padStart(cols, '0')).join(',\n  ')}\n};`;
  }

  function clearMatrix() {
      const buttons = matrixContainer.querySelectorAll("button");
      buttons.forEach(button => button.classList.remove("active"));
      updateSymbolData();
  }

  function invertMatrix() {
      const buttons = matrixContainer.querySelectorAll("button");
      buttons.forEach(button => button.classList.toggle("active"));
      updateSymbolData();
  }
});
