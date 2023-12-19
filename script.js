
document.getElementById("thalaChecker").addEventListener("submit", function(event) {
    event.preventDefault();
    const inputData = document.getElementById("inputData").value;

    // Use fetch to send data to your Node.js server
    fetch('/', {
method: 'POST',
headers: {
    'Content-Type': 'application/json',
},
body: JSON.stringify({ data: inputData }),
})
            .then(response => response.json())
            .then(data => {
                // Update the response message
                document.getElementById("responseMessage").innerHTML = `${data.message}`;
            });
            const video = document.getElementById("thala_vid");
            const audio = document.getElementById("thala_audio");//audio daalni thi but phir vid hi audio waali le li
            const image = document.getElementById("thala_img");
            const image2 = document.getElementById("thala_img2");
            image.classList.toggle('visible');
            image2.classList.toggle('visible')
            video.classList.toggle('visible');
            video.play();
            //audio.play();
    });
