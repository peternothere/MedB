// MESSAGE INPUT
const textarea = document.querySelector('.chatbox-message-input');
const chatboxForm = document.querySelector('.chatbox-message-form');

textarea.addEventListener('input', function () {
  let line = textarea.value.split('\n').length;

  if (textarea.rows < 6 || line < 6) {
    textarea.rows = line;
  }

  if (textarea.rows > 1) {
    chatboxForm.style.alignItems = 'flex-end';
  } else {
    chatboxForm.style.alignItems = 'center';
  }
});



// TOGGLE CHATBOX
const chatboxToggle = document.querySelector('.chatbox-toggle');
const chatboxMessage = document.querySelector('.chatbox-message-wrapper');

chatboxToggle.addEventListener('click', function () {
  chatboxMessage.classList.toggle('show');
});



// DROPDOWN TOGGLE
const dropdownToggle = document.querySelector('.chatbox-message-dropdown-toggle');
const dropdownMenu = document.querySelector('.chatbox-message-dropdown-menu');

dropdownToggle.addEventListener('click', function () {
  dropdownMenu.classList.toggle('show');
});

document.addEventListener('click', function (e) {
  if (!e.target.matches('.chatbox-message-dropdown, .chatbox-message-dropdown *')) {
    dropdownMenu.classList.remove('show');
  }
});





// CHATBOX MESSAGE
const chatboxMessageWrapper = document.querySelector('.chatbox-message-content');
const chatboxNoMessage = document.querySelector('.chatbox-message-no-message');

chatboxForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (isValid(textarea.value)) {
    writeMessage();
    setTimeout(autoReply, 1000);
  }
});



function addZero(num) {
  return num < 10 ? '0' + num : num;
}

function writeMessage() {
  const today = new Date();
  const userInput = textarea.value.trim().replace(/\n/g, '\n');
  const message = `
    <div class="chatbox-message-item sent">
      <span class="chatbox-message-item-text">
        ${userInput}
      </span>
      <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
    </div>
  `;

  // Write user input to the query.txt file
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/save_user_input/', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(`userInput=${encodeURIComponent(userInput)}&filePath=static/authsystem/query.txt`);

  chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
  chatboxForm.style.alignItems = 'center';
  textarea.rows = 1;
  textarea.focus();
  textarea.value = '';
  chatboxNoMessage.style.display = 'none';
  scrollBottom();
}


function autoReply() {
  const today = new Date();
  let message = '';

  // Add a 1-second delay before making the AJAX request
  setTimeout(function() {
    // Make an AJAX request to read the response from the 'responses.txt' file
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/static/authsystem/response.txt', true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const response = xhr.responseText.trim();
        message = `
          <div class="chatbox-message-item received">
            <span class="chatbox-message-item-text">
              ${response}
            </span>
            <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
          </div>
        `;
        chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
        scrollBottom();
      }
    };

    xhr.send();
  }, 1000); // Delay of 1000 milliseconds (1 second)
}









function scrollBottom() {
	chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight)
}

function isValid(value) {
	let text = value.replace(/\n/g, '')
	text = text.replace(/\s/g, '')

	return text.length > 0
}
