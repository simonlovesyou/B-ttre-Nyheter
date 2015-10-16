function save_options() {
  var inputs = document.getElementsByTagName('input')
  console.log(inputs);
  var filterBait = inputs[0].checked,
      filterPro = inputs[1].checked,
      silent = inputs[2].checked;

  var likesColor = true;
  chrome.storage.sync.set({
    filterBait: filterBait,
    filterPro: filterPro,
    silent: silent
  }, function() {
    // Update status to let user know options were saved.
    var button = document.getElementById('save');
    console.log("Ändrar")
    console.log(button);
    button.textContent = 'Sparat!';
    setTimeout(function() {
      button.textContent = 'Spara';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    filterBait: true,
    filterPro: true,
    silent: true
  }, function(items) {
    var inputs = document.getElementsByTagName('input')
    inputs[0].checked = items.filterBait;
    inputs[1].checked = items.filterPro;
    inputs[2].checked = items.silent;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);