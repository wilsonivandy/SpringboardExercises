console.log("Let's get this party started!");

const $gifArea = $("#gifArea");
let gifs = $(".picture");

function addGif(res){
    let numRes = res.data.length;
    if (numRes) {
        let pickGif = Math.floor(Math.random() * numRes);
        let newColumn = $("<div>", {class: "column"});
        console.log(res.data[pickGif].images.original.url);
        let newGif = $("<img>", {
            src: res.data[pickGif].images.original.url,
            class: "picture"
        });
        newColumn.append(newGif);
        $gifArea.append(newColumn);
        console.log(gifs);
    }
}

$("form").on("submit", async function(e){
    e.preventDefault();
    let searchTerm = $("#search").val();
    $("#search").val("");
    const res = await axios.get("http://api.giphy.com/v1/gifs/search", {
        params: {
            q: searchTerm, 
            api_key: "9BR6ujMjJjGig8T5kuLeEJgzlEg9WFlx"}});
    addGif(res.data);
})
