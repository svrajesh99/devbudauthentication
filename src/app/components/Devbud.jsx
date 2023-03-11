import React, { useEffect } from 'react';
import { useState } from 'react';
import { logOut } from './Firebase';
import styles from '../ui.module.scss';

const Devbud = () => {

  const [imageURL, setImageURL] = useState("");
  const [selectedTag,setSelectedTag] = useState()

  const tags = ["Make Shorter","Longer", "Funnier", "Simpler", "Casual", "Formal", "Tagline", "Improve", "Fix Spelling", "Riskier", "To Bullet Points", "To Tagline", "To Emojis"]

    const clone = () => {
      parent.postMessage({ pluginMessage: { type: 'clone' } }, '*');
    };

    const chooseTag = (selectedTag) => {
      setSelectedTag(selectedTag);
    };

    const [tab,setTab] = useState(true); //true stands for editing tab

    const tabChange = () => {
      setTab(!tab);
    }

    // useEffect(() => {
    //   // This is how we read messages sent from the plugin controller
    //   window.onmessage = (event) => {
        
    //     let imgData=event.data.pluginMessage?.bytesData

    //     //Converting img bytes to url for displaying
    //     const uint8ToBase64 = (imgData) =>
    //   btoa(
    //       Array(imgData.length)
    //           .fill('')
    //           .map((_, i) => String.fromCharCode(imgData[i]))
    //           .join('')
    //   );
  
    //   let uint8data=uint8ToBase64(imgData)
    //   const finalEncodedData = `data:image/*;base64,${uint8data}`
    //   setImageURL(finalEncodedData)
    //   }
  
  
    // }, []);
    

  return (

    <div className={styles.devbudContainer}>

    {tab ? 
      <div className={styles.devbudContainer}>

      <h2 className={styles.devbudTitle}>Welcome to DevBud!</h2>

      <div className={styles.tabsAndLogout}>

        <div className={styles.tabs}>
        <p onClick={tabChange} className={`${tab ? styles.tabActive :  styles.tab}`}>Editing</p>
        <p onClick={tabChange} className={`${!tab ? styles.tabActive :  styles.tab}`}>Writing</p>
        </div>

        <p className={styles.logout}>Log Out</p>
      </div>


      <div className={styles.DevbudTags} >

        {tags.map((tag, key) => (
          <Tags tag={tag} key={key} chooseTag={chooseTag} />
        ))}

      </div>

      <div className={styles.custom}>
      <div className={styles.line}></div>
      <h1 className={styles.customText}>or type in a custom prompt</h1>
      <div className={styles.line}></div>
      </div>
      

      <div className={styles.textareaDiv}>
        <textarea placeholder='Write in Yoda style' value={selectedTag} className={styles.textarea}></textarea>
      </div>

      <div className={styles.devbudButton}>Let's Go!</div>

    </div> :  
    
            <div className={styles.devbudContainer}>

            <h2 className={styles.devbudTitle}>Welcome to DevBud!</h2>

            <div className={styles.tabsAndLogout}>

              <div className={styles.tabs}>
              <p onClick={tabChange} className={`${tab ? styles.tabActive :  styles.tab}`}>Editing</p>
              <p onClick={tabChange} className={`${!tab ? styles.tabActive :  styles.tab}`}>Writing</p>
              </div>

              <p className={styles.logout}>Log Out</p>
            </div>


            <div className={styles.textareaDivWriting}>
              <textarea placeholder='Create a tagline for a website' className={styles.textareaWriting}></textarea>
            </div>

            <div className={styles.devbudButton}>Let's Go!</div>

        </div>
        
        }

    </div>
  )
}


export default Devbud


const Tags = ({tag, chooseTag}) => {

  const [isTagged,setIsTagged] = useState(false)

  const tagged = () => {
    if(!isTagged){
      chooseTag(tag);}
      else {
        chooseTag('');
      }
    setIsTagged(!isTagged);
    
  }

  return (
    <div onClick={tagged} className={`${isTagged ? styles.tagActive :  styles.tags}`}>
        <h3>{tag}</h3>
    </div>
  )
}



{/* <Button onClick={clone}>Clone Component</Button> */}


        {/* {imageURL ? 
        <img className={styles.image} src={imageURL} alt="Component" /> 
        : <></> } */}