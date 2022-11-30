$(document).ready(function () {
    console.log("1");
    $("#search-form").on("submit", function (event) {
      event.preventDefault();
      console.log("clicked");
      let query = $("#search-input").val();
      $.ajax({
          url: "/",
          method: "GET",
          contentType: "application/json"
      })
    });
});