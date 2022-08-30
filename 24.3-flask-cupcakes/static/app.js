$('#submit-btn').click(async function(e){
    e.preventDefault();
    let response = await axios({
        method: "POST",
        url: "http://127.0.0.1:5000/api/cupcakes",
        data: {"flavor" : $('#flavor').val(), "size" : $('#size').val(), "rating" : $('#rating').val(), "image" : $('#image').val()}
    });
    let flavor = response.data.cupcake['flavor']
    $('#cupcake-list').append(`<li>${flavor}</li>`);
    alert("ADDED!");
});