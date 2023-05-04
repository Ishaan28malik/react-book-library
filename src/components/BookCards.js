import React from 'react';
import { download_icon } from '../assets/data';
import './style.css';

export default function BookCard({ book }) {
  const { id, title, authors, formats, media_type, download_count } = book;
  const textLink = formats?.['text/plain; charset=us-ascii'];
  const posterLink = formats?.['image/jpeg'];
  const audioFileLink = formats?.audio;

  //   const [text, setText] = useState(null);

  // **  Not gonna work because of CORS error from the API end

  //   const downloadPlainText = async () => {
  //     const bookId = book?.id;
  //     const url = `https://gutenberg.org/files/${bookId}/${bookId}-0.txt`;
  //     try {
  //       const response = await fetch(url);
  //       const fileData = await response.text();
  //       // Do something with the file data
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <div className='column' key={id}>
      <div className='card-div'>
        <div className='card-image-container'>
          <img
            className='card-image'
            src={posterLink}
            alt={`${title} poster`}
          />
        </div>
        <div className='tooltip'>
          <p className='card-title'>{title}</p>
          <span className='tooltiptext'>{title}</span>
        </div>
        <div className='tooltip'>
          <p className='card-title'>
            {authors.map(({ name }) => name)}
            <span className='tooltiptext'>
              {authors.map(({ name }) => name)}
            </span>
          </p>
        </div>
        {/* <button onClick={downloadPlainText}>Download</button> */}
        {/* Normal Text link to view as download not happening due to API restrictions and CORS errors */}
        {media_type === 'Text' && (
          <div>
            <a className='button' href={textLink} download={`${title}`}>
              Download Text File
            </a>
          </div>
        )}
        {/* in-case of audio file , couldn't test as no audio file is included here */}
        {media_type === 'Audio' && (
          <a href={audioFileLink} download={`${title}`}>
            Download Audio File
          </a>
        )}
        <div className='downloads-div'>
          <img src={download_icon} className='download-image' alt='Download' />
          <p>{download_count}</p>
        </div>
      </div>
    </div>
  );
}
