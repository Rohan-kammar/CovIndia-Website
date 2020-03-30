var sliderData = {};

$.when(
  $.ajax("https://v1.api.covindia.com/district-date-total-data").then(
    response => {
      var slider = document.getElementById("myRange");
      var output = document.getElementById("demo");
      sliderData = response;
      sliderData = Object.keys(sliderData).map(key => {
        return { data: sliderData[key], date: key };
      });
      slider.min = 0;
      slider.max = sliderData.length - 1;
      output.innerHTML = sliderData[slider.max].date;

      slider.oninput = function() {
        clearData(districtData);
        renderData(sliderData[this.value].data);
        setMaxLegend(sliderData[this.value].data["max-legend-value"]);
        output.innerHTML = sliderData[this.value].date;
      };
    }
  )
);

function setMaxLegend(val) {
  $("#max-infected")[0].innerText = val;
}

function clearData(data) {
  for (var key in data) {
    var modKey = String(key);
    modKey = modKey.split(" ").join("_");
    keyShow = key;
    if (modKey == "Aurangabad_Maharastra" || modKey == "Aurangabad_Bihar") {
      keyShow = "Aurangabad";
    }
    if (modKey == "DIST_NA") {
      continue;
    }
    // Cleaning ToolTips
    var flag = 0;
    try {
      $("#" + modKey).tooltip.mouseout();
      flag = 1;
    } catch (err) {
      var a = 1 + 1;
    }
    if (flag == 0) {
      try {
        var allClasses = document.getElementsByClassName(modKey);
        $(allClasses).tooltip.mouseout();
      } catch (err) {
        var a = 1 + 1;
      }
    }
    // Clearing Colors
    var flag = 0;
    try {
      document.getElementById(modKey).style.fill = "#FFF";
      flag = 1;
    } catch (err) {
      var a = 1 + 1;
    }
    if (flag == 0) {
      try {
        var allClasses = document.getElementsByClassName(modKey);
        for (var i = 0; i < allClasses.length; ++i) {
          allClasses[i].style.fill = "#FFF";
          allClasses[i].childNodes[0].textContent = key;
          allClasses[i].title = key;
          $(allClasses[i]).attr("data-original-title", key);
        }
      } catch (err) {
        var a = 1;
      }
    }
  }
}
