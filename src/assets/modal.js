document.addEventListener('DOMContentLoaded', function () {
    var firstModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('questModal'));
    var secondModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('wheelModal'));

    document.getElementById('openWheelModal').addEventListener('click', function () {
      firstModal.hide();
      secondModal.show();
    });

    document.getElementById('goBackToFirstModal').addEventListener('click', function (event) {
      event.preventDefault();
      secondModal.hide();
      firstModal.show();
    });
  });