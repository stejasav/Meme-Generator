import React, { useEffect, useState } from "react";

export default function Meme() {
  const [meme , setMeme] = useState({
    toptext: "",
    bottomtext: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  })

  const [allMemeImages , setAllMemeImages] = useState([])

  useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemeImages(data.data.memes))
  },[])

  function getMemeImage(e) {
    e.preventDefault();
    const randomNumber = Math.floor(Math.random() * allMemeImages.length);
    const url = allMemeImages[randomNumber].url
    setMeme(prevMeme =>({
      ...prevMeme,
      randomImage: url
    }))
  }

  function handleChange(event){
     const {name,value} = event.target
     setMeme(prevMeme => ({
      ...prevMeme,
      [name] : value
     }))
  }

  return (
    <main>
      <div className="form">

        <div className="top">
          <label htmlFor="top-text">Top Text</label>
          <input
            id="top-text" 
            type="text" 
            placeholder="Eg. Shut up"
            name="toptext"
            value={meme.toptext}
            onChange={handleChange}
          />
        </div>

        <div className="bottom">
          <label htmlFor="bottom-text">Bottom Text</label>
          <input
            id="bottom-text"
            type="text"
            placeholder="Eg. And take my money"
            name="bottomtext"
            value={meme.bottomtext}
            onChange={handleChange}
          />
        </div>

        <button onClick={getMemeImage}>Get a new meme image 🖼</button>
      </div>

      <div className="meme"> 
        <img src={meme.randomImage} alt="meme-images" className="meme-img"/>
        <h2 className="meme--text top-text">{meme.toptext}</h2>
        <h2 className="meme--text bottom-text">{meme.bottomtext}</h2>
      </div>
    </main>
  );
}
