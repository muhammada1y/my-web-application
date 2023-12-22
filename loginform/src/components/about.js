import React from "react";
import profile from '../imag/profile.png' 
import notesImg from '../imag/notes.png'
import img from '../imag/imag.png'
import video from '../imag/video.png'
const About = () => {
  return (
    <div className='about-container'>
        <div className="fabout">
      <div className="left-section">
        Hey, I'm <span className="red">Muhammad Ali Khan</span>
        <div className="title">DevOps Engineer / Web Developer</div>
      </div>
      <div className="right-section">
        <img src={profile}/>
      </div>
      </div>
      <div id='about'> 
        <h2 className='heading'>About <span>application</span></h2>
        <div className='abouts' id="abouts2">
          <div className="img">
            <img src={notesImg} alt="notesImg" />
          </div>
          <div className='text'>
            <h3>Note Keeper</h3>
            <p>
            Note Keeper is a user-friendly application designed to simplify
            the process of taking and managing notes.Whether you're jotting
            down ideas, creating to-do lists,or recording important information,
            Note Keeper is here to streamline your note-taking experience
            </p>
          </div>
        </div>
        <div className='abouts' id="abouts0">
          <div className="img">
            <img src={img} alt="notesImg" />
          </div>
          <div className='text'>
            <h3>Image Memo</h3>
            <p>
            Image Memo is an innovative application that redefines the way you 
            capture and manage visual memories. Whether it's snapping photos of 
            important documents, creating mood boards, or simply organizing your
            favorite pictures, Image Memo is your go-to solution for seamless
            image management.
            </p>
          </div>
        </div>
        <div className='abouts' id="abouts1">
          <div className="img">
            <img src={video} alt="notesImg" />
          </div>
          <div className='text'>
            <h3>Video Vault</h3>
            <p>
            Video Vault is your all-in-one solution for capturing, managing, and 
            revisiting your most cherished video moments. Whether it's recording 
            life's milestones, documenting experiences, or organizing educational 
            content, Video Vault empowers you to curate a personalized video library 
            effortlessly.
            </p>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default About;
