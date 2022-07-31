const inputs = $(".inputs");
const submitBtn = $("#submitBtn");

$("body").hover(function () {
  if (filled()) {
    if (valid_length()) {
      $("#submitBtn").removeClass("hide");
    } else {
      alert("Atleast 3 letters for each answer!");
      $("#submitBtn").addClass("hide");
    }
  } else {
    $("#submitBtn").addClass("hide");
  }
});

function filled() {
  return inputs.get().every(function (val, index, array) {
    return val.value.length > 0;
  });
}

function valid_length() {
  return inputs.get().every(function (val, index, array) {
    return val.value.length >= 3;
  });
}