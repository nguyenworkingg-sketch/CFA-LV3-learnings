const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tabs.forEach(t => t.classList.toggle('active', t === tab));
    panels.forEach(p => p.classList.toggle('active', p.id === target));
    history.replaceState(null, '', '#' + target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

const hash = location.hash.replace('#', '');
if (hash && document.getElementById(hash)) {
  document.querySelector(`.tab[data-tab="${hash}"]`)?.click();
}

const checks = [...document.querySelectorAll('#checklist input[type="checkbox"]')];
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');

checks.forEach(box => {
  const saved = localStorage.getItem('cfa-lv3-fi-' + box.dataset.key);
  box.checked = saved === '1';
  box.addEventListener('change', () => {
    localStorage.setItem('cfa-lv3-fi-' + box.dataset.key, box.checked ? '1' : '0');
    updateProgress();
  });
});

function updateProgress() {
  const done = checks.filter(x => x.checked).length;
  progressText.textContent = `${done} / ${checks.length}`;
  progressBar.style.width = `${(done / checks.length) * 100}%`;
}
updateProgress();
