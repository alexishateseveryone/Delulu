let step = 0;
let formData = {};

function changeContent() {
  const box = document.getElementById('contentBox');
  box.innerHTML = ""; // clear the content

  // Add the new content here
  if (step === 0) {
    box.innerHTML = `
      <h5 class="mb-1">What's your crush's name?</h5>
      <input type="text" class="form-control" id="crushName" required>
      <button class="btn btn-primary" onclick="nextStep()">Next</button>
    `;
  } else if (step === 1) {
    box.innerHTML = `
      <h5 class="mb-4">Gender?</h5>
      <select class="form-select mb-4" id="crushGender" required>
        <option value="">Select Gender</option>
        <option>Female</option>
        <option>Male</option>
      </select>
      <button class="btn btn-primary" onclick="nextStep()">Next</button>
    `;
  } else if (step === 2) {
    box.innerHTML = `
      <h5 class="mb-4">Status?</h5>
      <select class="form-select mb-4" id="crushStatus" required>
        <option value="">Select Status</option>
        <option>High School</option>
        <option>Senior High School (SHS)</option>
        <option>College</option>
      </select>
      <button class="btn btn-primary" onclick="nextStep()">Next</button>
    `;
  } else if (step === 3) {
    box.innerHTML = `
      <h5 class="mb-4">Upload his/her photo</h5>
      <input class="form-control mb-4" type="file" id="crushPicture" accept="image/*" required onchange="previewImage()">
      <div id="imagePreview" class="mt-3 mb-3"></div>
      <button class="btn btn-primary" onclick="nextStep()">Next</button>
    `;
  } else if (step === 4) {
    box.innerHTML = `
      <h5 class="mb-4">Do you love her/him?</h5>
      <div class="mb-4">
        <button class="btn btn-outline-success" onclick="setLove('Yes')">Yes</button>
        <button class="btn btn-outline-danger" onclick="setLove('No')">No</button>
      </div>
    `;
  }else if (step === 5) {
        const imageSrc = formData.picture ? formData.picture : ''; // Use uploaded picture if available
      
        box.innerHTML = `
          <h5 class="mb-4">Ayan na ka-deluluhan mo!</h5>
          <div class="chat-container">
            <!-- User's message bubble -->
            <div class="user-message">
              <div class="message-bubble user-bubble">
                <p>I love you!</p>
              </div>
            </div>
            <!-- Crush's reply with profile pic and name -->
            <div class="crush-message">
              <div class="crush-profile-pic">
                <img src="${imageSrc}" alt="Crush's Profile" class="profile-pic">
              </div>
              <div class="crush-message-content">
                <span class="crush-name">${formData.name}</span>
                <div class="message-bubble crush-bubble" id="crushMessage">
                  <p>I love you too :))</p>
                </div>
              </div>
            </div>
          </div>
          <p class="mt-3">Anlala mo! Usad kana yah</p>
           <button id="randomizeButton" class="btn btn-primary">Get Random Message</button>
        `;
    }
    
      
  
  

  // Add fade-in effect
  box.classList.remove('fade-in'); // reset the animation
  void box.offsetWidth; // trigger reflow
  box.classList.add('fade-in'); // apply fade-in
}

function nextStep() {
  if (step === 0) {
    formData.name = document.getElementById('crushName').value;
    if (!formData.name) return alert("Please enter the name!");
  } else if (step === 1) {
    formData.gender = document.getElementById('crushGender').value;
    if (!formData.gender) return alert("Please select gender!");
  } else if (step === 2) {
    formData.status = document.getElementById('crushStatus').value;
    if (!formData.status) return alert("Please select status!");
  } else if (step === 3) {
    const fileInput = document.getElementById('crushPicture');
    if (fileInput.files.length === 0) return alert("Please upload a picture!");

    // Store the image as base64 data
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
      formData.picture = e.target.result; // Store base64 image data
      step++;  // Proceed to the next step after the image is loaded
      changeContent(); // Update content after processing
    };

    reader.readAsDataURL(file); // Convert image to base64
    return; // Prevent the next step from triggering until the image is processed
  } else if (step === 4) {
    if (!formData.love) return alert("Please select if you love him/her!"); // Ensure love choice is selected
  }

  step++;
  changeContent();
}

function setLove(choice) {
  formData.love = choice;
  step++;
  changeContent();
}

function previewImage() {
  const fileInput = document.getElementById('crushPicture');
  const previewContainer = document.getElementById('imagePreview');

  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.classList.add('album-cover'); // Add the CSS class here
      previewContainer.innerHTML = ""; // Clear previous preview
      previewContainer.appendChild(img);
    };

    reader.readAsDataURL(file); // Convert image to base64
  }
}

// Array of random chat messages
const crushMessages = [
  "I love you too :))",
  "Miss na kita, kita us",
  "Aww (sad emoji)"
];

// Function to get a random message
function getRandomMessage() {
  const randomIndex = Math.floor(Math.random() * crushMessages.length);
  return crushMessages[randomIndex];
}

// Function to update crush's message
function displayCrushMessage() {
  const crushMessageElement = document.getElementById("crushMessage");
  const randomMessage = getRandomMessage();
  crushMessageElement.textContent = randomMessage;
}

// Event listener for button click to trigger the random message
document.getElementById("randomizeButton").addEventListener("click", displayCrushMessage);

// Optional: Call the function to display a random message when the page loads
window.onload = function() {
  displayCrushMessage(); // This line is optional. Remove it if you don't want an initial message.
};


// Load first step when the page loads
changeContent();
