let timer = null;

document.getElementById('generate-otp').addEventListener('click', () => {
    const secret = document.getElementById('secret').value;
    const digits = parseInt(document.getElementById('digits').value);
    const period = parseInt(document.getElementById('period').value);
    generateOtp(secret, digits, period);
});

function generateOtp(secret, digits, period) {
    fetch('/generate-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secret, digits, period }),
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('otp').textContent = `Your OTP is: ${data.token}`;
            startTimer(data.remaining, period);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function startTimer(duration, period) {
    if (timer) clearInterval(timer);

    timer = setInterval(() => {
        let progressWidth = ((duration / period) * 100).toFixed(2);
        document.getElementById('progress').style.width = `${progressWidth}%`;
        document.getElementById('timer').textContent = `Time remaining: ${duration--} seconds`;
        if (duration < 0) {
            clearInterval(timer);
            const secret = document.getElementById('secret').value;
            const digits = parseInt(document.getElementById('digits').value);
            const period = parseInt(document.getElementById('period').value);
            generateOtp(secret, digits, period);
        }
    }, 1000);
}
