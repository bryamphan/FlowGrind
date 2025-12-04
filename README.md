# FlowGrind — Personalized Study App

FlowGrind is a simple, customizable study web application designed to help students stay focused, motivated, and consistent when studying for exams or assignments. It creates a personalized solo study room with adjustable themes, timers, sounds, and motivational tools to help users reach a flow state. The app is designed to be lightweight, browser-based, and beginner-friendly, using no external APIs.

---

## Project Information
**Project Name:** FlowGrind  
**Developer:** Bryan Pham  

---

## Design Overview

### Main Concept
FlowGrind provides a tailored study environment where users can adjust their study room aesthetic, set timers, track goals, listen to relaxing sounds, and receive motivational reminders. As a student who struggles with procrastination, the goal of the app is to create an encouraging, pressure-free space to maintain focus. Everything is kept simple and functional, avoiding unnecessary complexity.

---

## Core Features

### 1. Flow Timer
**Functionality:**  
A customizable study timer (Pomodoro-style) that lets users set their preferred study and break durations.

**User Interaction:**  
- Users press + or – to adjust timer lengths  
- Start/stop/reset functionality  

**Technical Considerations:**  
- Implemented with React state  
- Uses `setInterval()` for timing logic  

---

### 2. Break Generator
**Functionality:**  
Provides mini break suggestions to reduce burnout.

**User Interaction:**  
- During a break, user clicks **“Break Suggestion”** to receive a random idea  

**Technical Considerations:**  
- Suggestions stored in a static string array  
- Randomized output  

---

### 3. Theme Selection
**Functionality:**  
Lets users choose from pre-selected themes, colors, and backgrounds.

**User Interaction:**  
- User selects theme from a UI list or buttons  

**Technical Considerations:**  
- Uses CSS variables for easy theme switching  

---

### 4. Sound / Music Selection
**Functionality:**  
Allows users to play relaxing background sounds or playlist-style music.

**User Interaction:**  
- Toggle sound on/off  
- Choose between sound options  

**Technical Considerations:**  
- `.mp3` or `.wav` format  
- Basic HTML `<audio>` tag or React audio handling  

---

### 5. Affirmation Cards
**Functionality:**  
Random affirmation cards appear occasionally to motivate users.

**User Interaction:**  
- Cards pop up automatically or based on timer intervals  

**Technical Considerations:**  
- Stored as objects in an array  
- Randomized display  

---

### 6. To-Do List
**Functionality:**  
Simple task list to help users track what needs to be completed.

**User Interaction:**  
- Add, check off, or remove tasks  

**Technical Considerations:**  
- Array of task objects  
- Local state or localStorage for persistence  

---

## Tech Stack (Planned)
- **React** (frontend)
- **HTML/CSS/JS**
- **No external APIs**
- **Local state or localStorage for data persistence**

---

## Project Goal
To create a clean, aesthetic, beginner-friendly study tool that encourages consistency and helps students stay focused — without stress, distractions, or clutter.

---

##
