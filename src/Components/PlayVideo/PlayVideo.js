import React, { useEffect, useState } from 'react'; 
import './PlayVideo.css' ;  
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png' 
import user_profile from '../../assets/user_profile.jpg' 
import { API_KEY, value_converter } from '../../data';
import moment from 'moment/moment'; 
import jack from '../../assets/jack.png' ; 
  


const PlayVideo = ({videoId , categoryId})=> { 
 
    const [apiData , setApiData] = useState(null)  
    const [channelData , setChannelData] = useState(null) ;  
    const [commentData, setCommentData] = useState([]);

    const fetchVideoData =async()=> {
       //fetching videos data 
       const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`  

       await fetch(videoDetailsUrl).then((response)=>response.json()).then((data)=>setApiData(data.items[0])) 
    }  

    const fetchOtherData = async()=> {
       //fetching channel data 
       const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}` 

       await fetch(channelDataUrl).then((response)=>response.json()).then((data)=>setChannelData(data.items[0]))   


       //fetching comment data 
       const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}` 
       await fetch(commentUrl).then((res)=>res.json()).then((data)=>setCommentData(data.items)) 
    }

    useEffect(()=>{
        fetchVideoData() 
    } , []) 


    useEffect(()=>{
        fetchOtherData() 
    } , [apiData])

  return (
    <div className='play-video'>
      {/*  <video src= {video1} controls autoPlay muted></video> */}  
      <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}   frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
       <h3>{apiData?apiData.snippet.title:"Title Here"}</h3> 
       <div className='play-video-info'>
        <p>{apiData?value_converter(apiData.statistics.viewCount):"16k"} Views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow() : ""}</p>  
        <div>
            <span><img src= {like}/>{apiData ? value_converter(apiData.statistics.likeCount):155}</span> 
            <span><img src= {dislike}/></span> 
            <span><img src= {share}/>Share</span> 
            <span><img src= {save}/>Save</span>
        </div>
       </div> 
       <hr/>  
       <div className='publisher'>
          <img src={channelData?value_converter(channelData.snippet.thumbnails.default.url):""} alt=''/> 
          <div>
            <p>{apiData?apiData.snippet.channelTitle:""}</p>
            <span> {channelData?value_converter(channelData.statistics.subscriberCount):"1M"} Subscribers</span>
          </div> 
          <button>Subscribe</button>
       </div> 
       <div className='vid-description'>
          <p>{apiData ? apiData.snippet.description.slice(0,250) :"Description Here"}</p>
        <hr/> 
        <h4> {apiData?value_converter(apiData.statistics.commentCount):130} Comments</h4>   
        {commentData.map((item,index)=>{
            return (
                <div key={index} className='comment'>
            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt=''/> 
            <div>
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3> 
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p> 
                <div className='comment-action'>
                    <img src= {like}/>
                    <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                    <img src={dislike} alt=''/> 
                
                </div>
            </div>
        </div> 
            )
        })}
        

        



        
       </div>
    </div>
  )
}

export default PlayVideo