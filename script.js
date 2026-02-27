let username = '';

function login(){
    const nameInput = document.getElementById('username').value;
    if(!nameInput) return alert("Isi nama dulu!");
    username = nameInput;
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('chatContainer').style.display = 'block';
    document.getElementById('greeting').innerText = `Halo ${username}, chat dengan AI!`;
}

async function sendMessage(){
    const input = document.getElementById('userInput');
    const text = input.value;
    if(!text) return;
    addMessage(text, 'user');
    input.value = '';

    try {
        const res = await fetch('/chat', {  // request ke backend
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ text })
        });
        const data = await res.json();
        addMessage(data.reply, 'ai');
    } catch(err){
        console.error(err);
        addMessage("Error: Tidak bisa terhubung ke AI.", 'ai');
    }
}

function addMessage(text, sender){
    const chatBox = document.getElementById('chatBox');
    const div = document.createElement('div');
    div.classList.add('message', sender);
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}