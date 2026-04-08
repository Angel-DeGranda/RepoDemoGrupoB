document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
        document.getElementById(btn.dataset.tab).classList.remove('hidden');
        btn.classList.add('active');
    });
});

async function enviarFormulario(form, errorId) {
    const params = new URLSearchParams(new FormData(form));
    const errorEl = document.getElementById(errorId);
    errorEl.style.display = 'none';

    try {
        const res = await fetch(form.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString(),
            credentials: 'same-origin',
            redirect: 'follow'
        });

        const finalUrl = res.url;

        if (finalUrl.includes('/error') || finalUrl.includes('error.html')) {
            const msg = new URL(finalUrl).searchParams.get('msg');
            errorEl.textContent = msg || 'Ocurrió un error.';
            errorEl.style.display = 'block';
        } else {
            window.location.href = finalUrl;
        }
    } catch (e) {
        errorEl.textContent = 'Error de conexión.';
        errorEl.style.display = 'block';
    }
}

document.getElementById('login').addEventListener('submit', e => {
    e.preventDefault();
    enviarFormulario(e.target, 'login-error');
    //window.location.href("singup_success.js");
});

document.getElementById('singup').addEventListener('submit', e => {
    e.preventDefault();
    enviarFormulario(e.target, 'signup-error');
    window.location.href("singup_success.js");
});
