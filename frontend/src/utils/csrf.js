export async function getCsrfToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    if (meta) {
        return meta.getAttribute('content');
    }
    const match = document.cookie.match(/(^|;)\s*_csrf=([^;]+)/);
    if (match) {
        return decodeURIComponent(match[2]);
    }
    const res = await fetch('https://tasks.fineko.space/api/auth/csrf', {
        credentials: 'include'
    });
    if (res.ok) {
        const data = await res.json();
        return data.csrfToken;
    }
    return null;
}
