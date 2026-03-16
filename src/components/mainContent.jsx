import memesData from "./memesData";
import React from "react";
import html2canvas from "html2canvas";
export default function MainContent() { 

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });

    const [allMemes,setAllMemes] = React.useState([])
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => {
            setAllMemes(data.data.memes)
        })
    },[])

    const memeRef = React.useRef(null);

    function downloadMeme() {
    const memeElement = memeRef.current;

    if (!memeElement) return;

    html2canvas(memeElement, {
        useCORS: true,
        backgroundColor: null,
        scale: 2
    }).then(canvas => {

        const link = document.createElement("a");
        link.download = "meme.png";
        link.href = canvas.toDataURL("image/png");

        link.click();
    });
}

    function handleChange(event){
        const {name,value} = event.target
        setMeme(prev =>({
            ...prev,
            [name]: value
        })
        )
    }

    function getMemeImage() {
        if(allMemes.length === 0) return

        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url

        setMeme(prev => ({
        ...prev,
        randomImage: url
        }))
    }   
    return (
        <div className="form">
            <div className="input-div">
                <input
                    placeholder="Top Text..."
                    className="uiverse-pixel-input"
                    type="text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    placeholder="Bottom Text..."
                    className="uiverse-pixel-input"
                    type="text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
            </div>

            <div className="form-button-div">
                <button onClick={getMemeImage}>
                    Get a new meme image
                </button>
            </div>
            <div className="meme" ref={memeRef}>
                <img 
                    src={meme.randomImage} 
                    className="meme-img"
                    crossOrigin="anonymous"
                />
                <h2 className="meme--text-top">{meme.topText}</h2>
                <h2 className="meme--text-bottom">{meme.bottomText}</h2>
            </div>
            <div className="download-button-div">
                <button onClick={downloadMeme}>
                    Download Meme
                </button>
            </div>
        </div>
    );
}