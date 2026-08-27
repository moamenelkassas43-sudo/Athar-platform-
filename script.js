document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('atharForm');
  const submitBtn = document.getElementById('submitBtn');
  const statusBox = document.getElementById('status-box');

  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'جاري الإرسال...';
    if (statusBox) statusBox.style.display = 'none';

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        if (statusBox) {
          statusBox.className = 'success';
          statusBox.innerText = 'تم إرسال فكرتك بنجاح! شكرًا لمشاركتك. ✨';
          statusBox.style.display = 'block';
        }
        form.reset();
      } else {
        throw new Error('حدث خطأ أثناء الإرسال');
      }
    } catch (error) {
      if (statusBox) {
        statusBox.className = 'error';
        statusBox.innerText = 'تعذر إرسال الرسالة، يرجى المحاولة لاحقاً.';
        statusBox.style.display = 'block';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = originalText;
    }
  });
});
