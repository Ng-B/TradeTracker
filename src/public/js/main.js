// 
function updateTrade(tradeId) {
    const tradeRow = document.querySelector(`tr[data-trade-id="${tradeId}"]`);
    const resultInput = tradeRow.querySelector(`input[data-field="result"]`);
    const closeTimeInput = tradeRow.querySelector(`input[data-field="closeTime"]`);
    const commentInput = tradeRow.querySelector(`input[data-field="comment"]`);
  
    const result = resultInput.value;
    const closeTime = closeTimeInput.value;
    const comment = commentInput.value;
  
    // Send an AJAX request to update the trade
    fetch(`/trades/${tradeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ result, closeTime, comment }),
    })
      .then(response => response.json())
      .then(data => {
        // Update the trade in the table with the updated data
        resultInput.value = data.result;
        closeTimeInput.value = data.closeTime;
        commentInput.value = data.comment;
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  

  
// Helper function to format date and time in 24-hour format
window.formatDate = function(date) {
    const formattedDate = new Date(date);
  
    // Get the parts of the date and time
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const day = String(formattedDate.getDate()).padStart(2, '0');
    const hours = String(formattedDate.getHours()).padStart(2, '0');
    const minutes = String(formattedDate.getMinutes()).padStart(2, '0');
  
    // Create the formatted date string in the 24-hour format
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };